import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import StudentController from './app/controllers/StudentController';
import PlanController from './app/controllers/PlanController';
import EnrollmentController from './app/controllers/EnrollmentController';
import CheckinController from './app/controllers/CheckinController';
import HelpOrderController from './app/controllers/HelpOrderController';
import StudentHelpOrderController from './app/controllers/StudentHelpOrderController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', async (req, res) => {
  return res.json({ message: 'It Works!' });
});

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.get('/students/:id/checkins', CheckinController.index);
routes.post('/students/:id/checkins', CheckinController.store);

routes.get('/students/:id/help-orders', StudentHelpOrderController.index);
routes.post('/students/:id/help-orders', StudentHelpOrderController.store);

routes.use(authMiddleware);
routes.put('/users', UserController.update);

routes.post('/students', StudentController.store);
routes.put('/students/:id', StudentController.update);
routes.get('/students', StudentController.index);
routes.get('/students/:id', StudentController.show);
routes.delete('/students/:id', StudentController.delete);

routes.post('/plans', PlanController.store);
routes.get('/plans', PlanController.index);
routes.put('/plans/:id', PlanController.update);
routes.delete('/plans/:id', PlanController.delete);

routes.post('/enrollments', EnrollmentController.store);
routes.get('/enrollments', EnrollmentController.index);
routes.get('/enrollments/:id', EnrollmentController.show);
routes.put('/enrollments/:id', EnrollmentController.update);
routes.delete('/enrollments/:id', EnrollmentController.delete);

routes.get('/help-orders', HelpOrderController.index);
routes.put('/help-orders/:id/answer', HelpOrderController.update);

export default routes;
