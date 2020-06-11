import { Router } from 'express';
import AuthenticateClientService from '../services/AuthenticateClientService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateClient = new AuthenticateClientService();

    const { client, token } = await authenticateClient.execute({
      email,
      password,
    });

    return response.json({ client, token });
  } catch (error) {
    return response.status(400).json({ error: error.message });
  }
});

export default sessionsRouter;
