import * as Yup from 'yup';
import { Op } from 'sequelize';
import Plan from '../models/Plan';

class PlanController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .min(1)
        .required(),
      price: Yup.number()
        .min(0)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id, title, duration, price } = await Plan.create(req.body);

    return res.json({
      id,
      title,
      duration,
      price,
    });
  }

  async index(req, res) {
    const { page = 1, limit = 10, q: query = '' } = req.query;

    const { rows: plans, count } = await Plan.findAndCountAll({
      order: ['id'],
      where: {
        [Op.or]: [{ title: { [Op.iLike]: `%${query}%` } }],
      },
      limit,
      offset: (page - 1) * limit,
    });

    return res.set({ total: count }).json(plans);
  }

  async show(req, res) {
    const { id } = req.params;

    const plan = await Plan.findByPk(id);

    return res.json(plan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      duration: Yup.number()
        .min(1)
        .required(),
      price: Yup.number()
        .min(0)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;
    const { title, duration, price } = req.body;

    const plan = await Plan.findByPk(id);

    if (plan.title !== title) {
      const planExists = await Plan.findOne({ where: { title } });

      if (planExists) {
        return res
          .status(401)
          .json({ error: 'There is already a plan with that name' });
      }
    }

    await plan.update({ title, duration, price });
    await plan.save();

    return res.json(plan);
  }

  async delete(req, res) {
    const { id } = req.params;

    await Plan.destroy({ where: { id } });

    return res.send();
  }
}

export default new PlanController();
