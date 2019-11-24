import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ReviewController from './app/controllers/ReviewController';
import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.get('/', (req, res) => res.json({ message: 'Feedback API running' }));

routes.post('/users', UserController.store);
routes.post('/session', SessionController.store);

routes.use(authMiddleware);

routes.post('/reviews', ReviewController.store);
routes.get('/reviews', ReviewController.index);

export default routes;
