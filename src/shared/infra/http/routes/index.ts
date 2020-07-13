import { Router } from 'express';

import projectsRouter from '@modules/projects/infra/http/routes/projects.routes';
import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';
import sessionsRouter from '@modules/clients/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/clients/infra/http/routes/password.routes';

const routes = Router();

routes.use('/projects', projectsRouter);
routes.use('/clients', clientsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;
