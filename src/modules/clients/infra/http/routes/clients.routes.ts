import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/clients/infra/http/middlewares/ensureAuthenticated';

import ClientProfileController from '@modules/clients/infra/http/controllers/ClientProfileController';
import ClientsController from '../controllers/ClientsController';
import ClientAvatarController from '../controllers/ClientAvatarController';

const clientsRouter = Router();
const upload = multer(uploadConfig);
const clientsController = new ClientsController();
const clientAvatarController = new ClientAvatarController();
const clientProfileController = new ClientProfileController();

// clientsRouter.get('/', ensureAuthenticated, async (request, response) => {
//   const clientsRepository = getRepository(Client);

//   const clients = await clientsRepository.find({
//     relations: ['project'],
//   });

//   return response.json(clients);
// });

clientsRouter.post('/', clientsController.create);

clientsRouter.get(
  '/profile',
  ensureAuthenticated,
  clientProfileController.show,
);

clientsRouter.put(
  '/profile',
  ensureAuthenticated,
  clientProfileController.update,
);

clientsRouter.put('/:projectId', ensureAuthenticated, clientsController.update);

clientsRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  clientAvatarController.update,
);

export default clientsRouter;
