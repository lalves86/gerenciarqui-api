import { Router } from 'express';

import ProjectsRepository from '../repositories/ProjectsRepository';
import CreateProjectService from '../services/CreateProjectService';

const routes = Router();

const projectsRepository = new ProjectsRepository();

routes.get('/', (request, response) => {
  const projects = projectsRepository.findAllProjects();

  return response.json(projects);
});

routes.post('/', (request, response) => {
  try {
    const { name, client } = request.body;

    const createProject = new CreateProjectService(projectsRepository);

    const project = createProject.execute({ name, client });

    return response.json(project);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default routes;
