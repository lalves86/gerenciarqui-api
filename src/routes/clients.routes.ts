import { Router } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import CreateClientService from '../services/CreateClientService';
import UpdateClientService from '../services/UpdateClientService';
import Client from '../models/Client';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

const clientsRouter = Router();
const upload = multer(uploadConfig);

clientsRouter.get('/', ensureAuthenticated, async (request, response) => {
  const clientsRepository = getRepository(Client);

  const clients = await clientsRepository.find({
    relations: ['project'],
  });

  return response.json(clients);
});

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

clientsRouter.put(
  '/:projectId',
  ensureAuthenticated,
  async (request, response) => {
    try {
      const { projectId } = request.params;
      const { email } = request.body;

      const updateClient = new UpdateClientService();

      const client = await updateClient.execute({
        projectId,
        email,
      });

      return response.json(client);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  },
);

clientsRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    return response.json({ ok: true });
  },
);

export default clientsRouter;
