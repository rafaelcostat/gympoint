import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const students = await Student.findAll({
      order: ['name'],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(students);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      birth: Yup.date().required(),
      weight: Yup.number()
        .min(0)
        .required(),
      height: Yup.number()
        .min(0)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      birth: Yup.date().required(),
      weight: Yup.number()
        .min(0)
        .required(),
      height: Yup.number()
        .min(0)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;
    const { name, email, birth, weight, height } = req.body;

    const student = await Student.findByPk(id);

    if (student.email !== email) {
      const studentExists = await Student.findOne({ where: { email } });

      if (studentExists) {
        return res.status(401).json({ error: 'Student already exists' });
      }
    }

    await student.update({ name, email, birth, weight, height });
    await student.save();

    return res.json(student);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Student.destroy({ where: { id } });

    return res.send();
  }
}

export default new StudentController();
