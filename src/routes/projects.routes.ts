import { Router } from 'express';

import ProjectsRepository from '../repositories/ProjectsRepository';

const routes = Router();

const projectsRepository = new ProjectsRepository();

routes.get('/', (request, response) => {
  const projects = projectsRepository.findAllProjects();

  return response.json(projects);
});

routes.post('/', (request, response) => {
  const { name, client } = request.body;

  const projectExists = projectsRepository.findByName(name);

  if (projectExists)
    return response
      .status(400)
      .json({ message: `Project ${name} already exists` });

  const project = projectsRepository.create(name, client);

  return response.json(project);
});

export default routes;
