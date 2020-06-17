import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/clients/infra/middlewares/ensureAuthenticated';

import CreateClientService from '@modules/clients/services/CreateClientService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';
import UpdateClientAvatarService from '@modules/clients/services/UpdateClientAvatarService';
import ProjectsRepository from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';
import ClientsRepository from '../../typeorm/repositories/ClientsRepository';

const clientsRouter = Router();
const upload = multer(uploadConfig);

// clientsRouter.get('/', ensureAuthenticated, async (request, response) => {
//   const clientsRepository = getRepository(Client);

//   const clients = await clientsRepository.find({
//     relations: ['project'],
//   });

//   return response.json(clients);
// });

clientsRouter.post('/', async (request, response) => {
  const { name, email, phone, address, password, cpf } = request.body;

  const clientsRepository = new ClientsRepository();

  const createClient = new CreateClientService(clientsRepository);

  const client = await createClient.execute({
    name,
    email,
    phone,
    address,
    password,
    cpf,
  });

  return response.json(client);
});

clientsRouter.put(
  '/:projectId',
  ensureAuthenticated,
  async (request, response) => {
    const { projectId } = request.params;
    const { email } = request.body;

    const clientsRepository = new ClientsRepository();
    const projectsRepository = new ProjectsRepository();

    const updateClient = new UpdateClientService(
      clientsRepository,
      projectsRepository,
    );

    const client = await updateClient.execute({
      projectId,
      email,
    });

    return response.json(client);
  },
);

clientsRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    const clientsRepository = new ClientsRepository();

    const updateClientAvatar = new UpdateClientAvatarService(clientsRepository);

    const client = await updateClientAvatar.execute({
      clientId: request.client.id,
      avatarFilename: request.file.filename,
    });

    return response.json(client);
  },
);

export default clientsRouter;
