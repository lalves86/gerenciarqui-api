import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateClientService from '@modules/clients/services/AuthenticateClientService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateClient = container.resolve(AuthenticateClientService);

  const { client, token } = await authenticateClient.execute({
    email,
    password,
  });

  return response.json({ client, token });
});

export default sessionsRouter;
