import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateClientService from '@modules/clients/services/AuthenticateClientService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateClient = container.resolve(AuthenticateClientService);

    const { client, token } = await authenticateClient.execute({
      email,
      password,
    });

    return response.json({ client, token });
  }
}
