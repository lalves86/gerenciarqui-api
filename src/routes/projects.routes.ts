import { Router } from 'express';
import { uuid } from 'uuidv4';

const routes = Router();

interface IProject {
  id: string;
  name: string;
  client: string;
}

const projects: IProject[] = [];

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

  const project = {
    id: uuid(),
    name,
    client,
  };

  projects.push(project);

  return response.json(project);
});

export default routes;
