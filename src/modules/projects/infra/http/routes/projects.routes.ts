import { Router } from 'express';

import ensureAuthenticated from '@modules/clients/infra/http/middlewares/ensureAuthenticated';
import ProjectsController from '../controllers/ProjectsController';

const projectsRouter = Router();
const projectsController = new ProjectsController();

projectsRouter.use(ensureAuthenticated);

// projectsRouter.get('/', async (request, response) => {
//   const projects = await projectsRepository.find();

//   return response.json(projects);
// });

projectsRouter.post('/', projectsController.create);

export default projectsRouter;
