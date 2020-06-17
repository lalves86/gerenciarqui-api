import { Router } from 'express';

import ProjectsRepository from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';
import CreateProjectService from '@modules/projects/services/CreateProjectService';
import ensureAuthenticated from '@modules/clients/infra/middlewares/ensureAuthenticated';

const projectsRouter = Router();

projectsRouter.use(ensureAuthenticated);

// projectsRouter.get('/', async (request, response) => {
//   const projects = await projectsRepository.find();

//   return response.json(projects);
// });

projectsRouter.post('/', async (request, response) => {
  const { name } = request.body;

  const projectsRepository = new ProjectsRepository();

  const createProject = new CreateProjectService(projectsRepository);

  const project = await createProject.execute({ name });

  return response.json(project);
});

export default projectsRouter;
