import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/clients/infra/middlewares/ensureAuthenticated';

import ClientsController from '../controllers/ClientsController';
import ClientAvatarController from '../controllers/ClientAvatarController';

const clientsRouter = Router();
const upload = multer(uploadConfig);
const clientsController = new ClientsController();
const clientAvatarController = new ClientAvatarController();

// clientsRouter.get('/', ensureAuthenticated, async (request, response) => {
//   const clientsRepository = getRepository(Client);

//   const clients = await clientsRepository.find({
//     relations: ['project'],
//   });

//   return response.json(clients);
// });

clientsRouter.post('/', clientsController.create);

clientsRouter.put('/:projectId', ensureAuthenticated, clientsController.update);

clientsRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  clientAvatarController.update,
);

export default clientsRouter;
