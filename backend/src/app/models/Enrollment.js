import Sequelize, { Model } from 'sequelize';
import { addMonths, parseISO, isBefore, isAfter } from 'date-fns';

import Plan from './Plan';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        student_id: Sequelize.INTEGER,
        plan_id: Sequelize.INTEGER,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.DECIMAL,
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
            'start_date',
            'end_date',
          ]),
          get() {
            return (
              isBefore(this.get('start_date'), new Date()) &&
              isAfter(this.get('end_date'), new Date())
            );
          },
        },
      },
      { sequelize }
    );

    this.addHook('beforeSave', async enrollment => {
      const plan = await Plan.findByPk(enrollment.plan_id);
      const end_date = addMonths(enrollment.start_date, plan.duration);
      enrollment.price = plan.duration * plan.price;
      enrollment.end_date = end_date;
    });

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
  }
}

export default Enrollment;
