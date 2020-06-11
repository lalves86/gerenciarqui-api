import { Router } from 'express';

import projectsRouter from './projects.routes';
import clientsRouter from './clients.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/projects', projectsRouter);
routes.use('/clients', clientsRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
