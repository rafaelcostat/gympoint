import * as Yup from 'yup';

import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';

import HelpOrderMail from '../jobs/HelpOrderMail';
import Queue from '../../lib/Queue';

class HelpOrderController {
  async update(req, res) {
    const schema = Yup.object().shape({
      answer: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { answer } = req.body;

    const helpOrder = await HelpOrder.findByPk(id, {
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    await helpOrder.update({ answer, answer_at: new Date() });
    await helpOrder.save();

    await Queue.add(HelpOrderMail.key, {
      helpOrder,
    });

    return res.json(helpOrder);
  }

  async index(req, res) {
    const { page = 1, limit = 10 } = req.query;

    const { rows: helpOrders, count } = await HelpOrder.findAndCountAll({
      where: { answer: null },
      limit,
      offset: (page - 1) * limit,
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['id', 'name', 'email'],
        },
      ],
      order: [['created_at']],
    });

    return res.set({ total: count }).json(helpOrders);
  }
}

export default new HelpOrderController();
