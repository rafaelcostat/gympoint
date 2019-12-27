import { format, parseISO } from 'date-fns';
import Mail from '../../lib/Mail';

class EnrollmentMail {
  get key() {
    return 'EnrollmentMail';
  }

  async handle({ data }) {
    const { student, plan, enrollment } = data;

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Gympoint - Matrícula realizada com sucesso!',
      template: 'enrollment',
      context: {
        student,
        plan,
        start: format(parseISO(enrollment.start_date), 'dd/MM/yyyy'),
        end: format(parseISO(enrollment.end_date), 'dd/MM/yyyy'),
      },
    });
  }
}

export default new EnrollmentMail();
