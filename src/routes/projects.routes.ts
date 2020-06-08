import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ProjectsRepository from '../repositories/ProjectsRepository';
import CreateProjectService from '../services/CreateProjectService';

const routes = Router();

routes.get('/', async (request, response) => {
  const projectsRepository = getCustomRepository(ProjectsRepository);

  const projects = await projectsRepository.find();

  return response.json(projects);
});

routes.post('/', async (request, response) => {
  try {
    const { name, client } = request.body;

    const createProject = new CreateProjectService();

    const project = await createProject.execute({ name, client });

    return response.json(project);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default routes;
