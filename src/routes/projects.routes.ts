import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ProjectsRepository from '../repositories/ProjectsRepository';
import CreateProjectService from '../services/CreateProjectService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const projectsRouter = Router();

projectsRouter.use(ensureAuthenticated);

projectsRouter.get('/', async (request, response) => {
  const projectsRepository = getCustomRepository(ProjectsRepository);

  const projects = await projectsRepository.find();

  return response.json(projects);
});

projectsRouter.post('/', async (request, response) => {
  const { name, client } = request.body;

  const createProject = new CreateProjectService();

  const project = await createProject.execute({ name, client });

  return response.json(project);
});

export default projectsRouter;
