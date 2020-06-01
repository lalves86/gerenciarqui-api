import { Router } from 'express';

import Project from '../models/Project';

const routes = Router();

const projects: Project[] = [];

routes.get('/', (request, response) => {
  return response.json(projects);
});

routes.post('/', (request, response) => {
  const { name, client } = request.body;

  const projectExists = projects.find((project) => project.name === name);

  if (projectExists)
    return response
      .status(400)
      .json({ message: `Project ${name} already exists` });

  const project = new Project(name, client);

  projects.push(project);

  return response.json(project);
});

export default routes;
