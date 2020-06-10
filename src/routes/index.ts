import { Router } from 'express';

import projectsRouter from './projects.routes';
import clientsRouter from './clients.routes';

const routes = Router();

routes.use('/projects', projectsRouter);
routes.use('/clients', clientsRouter);

export default routes;
