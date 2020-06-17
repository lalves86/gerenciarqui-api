import { Router } from 'express';
import AuthenticateClientService from '@modules/clients/services/AuthenticateClientService';
import ClientsRepository from '../../typeorm/repositories/ClientsRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const clientsRepository = new ClientsRepository();
  const authenticateClient = new AuthenticateClientService(clientsRepository);

  const { client, token } = await authenticateClient.execute({
    email,
    password,
  });

  return response.json({ client, token });
});

export default sessionsRouter;
