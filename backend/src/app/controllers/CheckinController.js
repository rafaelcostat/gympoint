import { subDays, isAfter } from 'date-fns';
import { Op } from 'sequelize';

import Checkin from '../models/Checkin';
import Student from '../models/Student';
import Enrollment from '../models/Enrollment';

class CheckinController {
  async store(req, res) {
    const { id } = req.params;

    const isEnrolled = await Enrollment.findOne({
      where: { student_id: id },
    });

    if (!isEnrolled) {
      return res
        .status(400)
        .json({ error: 'Student is not enrolled in the gym' });
    }

    if (!isAfter(isEnrolled.end_date, new Date())) {
      return res.status(400).json({ error: 'Expired enrollment' });
    }

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: { [Op.between]: [subDays(new Date(), 7), new Date()] },
      },
    });

    if (checkins.length >= 5) {
      return res
        .status(400)
        .json({ error: 'You can only check-in five times in a week' });
    }

    const checkin = await Checkin.create({ student_id: id });

    return res.json(checkin);
  }

  async index(req, res) {
    const { id } = req.params;
    const { page = 1 } = req.query;

    const checkins = await Checkin.findAll({
      where: { student_id: id },
      order: [['created_at', 'desc']],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    return res.json(checkins);
  }
}

export default new CheckinController();
