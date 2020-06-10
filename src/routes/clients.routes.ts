import { Router } from 'express';

import CreateClientService from '../services/CreateClientService';

const clientsRouter = Router();

// clientsRouter.get('/', async (request, response) => {
//   const projectsRepository = getCustomRepository(ProjectsRepository);

//   const projects = await projectsRepository.find();

//   return response.json(projects);
// });

clientsRouter.post('/', async (request, response) => {
  try {
    const { name, email, phone, address, password, cpf } = request.body;

    const createClient = new CreateClientService();

    const client = await createClient.execute({
      name,
      email,
      phone,
      address,
      password,
      cpf,
    });

    return response.json(client);
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default clientsRouter;
