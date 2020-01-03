import * as Yup from 'yup';
import Enrollment from '../models/Enrollment';
import Student from '../models/Student';
import Plan from '../models/Plan';

import EnrollmentMail from '../jobs/EnrollmentMail';
import Queue from '../../lib/Queue';

class EnrollmentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { student_id, plan_id, start_date } = req.body;

    const enrollmentExists = await Enrollment.findOne({
      where: { student_id },
    });

    if (enrollmentExists) {
      return res
        .status(400)
        .json({ error: 'There is already an enrollment for this student' });
    }

    const enrollment = await Enrollment.create({
      student_id,
      plan_id,
      start_date,
    });

    const student = await Student.findByPk(student_id);
    const plan = await Plan.findByPk(plan_id);

    await Queue.add(EnrollmentMail.key, {
      student,
      plan,
      enrollment,
    });

    return res.json(enrollment);
  }

  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const { rows: enrollments, count } = await Enrollment.findAndCountAll({
      order: [['updated_at', 'desc']],
      limit,
      offset: (page - 1) * limit,
      attributes: ['id', 'start_date', 'end_date', 'price', 'active'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    return res.set({ total: count }).json(enrollments);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      student_id: Yup.number().required(),
      plan_id: Yup.number().required(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { student_id, plan_id, start_date } = req.body;
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id);

    await enrollment.update({
      student_id,
      plan_id,
      start_date,
    });
    await enrollment.save();

    return res.json(enrollment);
  }

  async show(req, res) {
    const { id } = req.params;

    const enrollment = await Enrollment.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Plan,
          as: 'plan',
          attributes: ['id', 'title', 'duration', 'price'],
        },
      ],
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Enrollment.destroy({ where: { id } });

    return res.send();
  }
}

export default new EnrollmentController();
