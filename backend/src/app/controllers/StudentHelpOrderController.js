import * as Yup from 'yup';
import { isAfter } from 'date-fns';

import HelpOrder from '../models/HelpOrder';
import Enrollment from '../models/Enrollment';

class StudentHelpOrderController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const { id } = req.params;

    const helpOrders = await HelpOrder.findAll({
      where: { student_id: id },
      order: [['created_at', 'desc']],
      limit: 20,
      offset: (page - 1) * 20,
    });

    return res.json(helpOrders);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      question: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;
    const { question } = req.body;

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

    const helpOrder = await HelpOrder.create({ student_id: id, question });

    return res.json(helpOrder);
  }
}

export default new StudentHelpOrderController();
