import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/clients/infra/middlewares/ensureAuthenticated';

import CreateClientService from '@modules/clients/services/CreateClientService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';
import UpdateClientAvatarService from '@modules/clients/services/UpdateClientAvatarService';

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

  const createClient = container.resolve(CreateClientService);

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

    const updateClient = container.resolve(UpdateClientService);

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
    const updateClientAvatar = container.resolve(UpdateClientAvatarService);

    const client = await updateClientAvatar.execute({
      clientId: request.client.id,
      avatarFilename: request.file.filename,
    });

    return response.json(client);
  },
);

export default clientsRouter;
