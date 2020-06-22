import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateClientService from '@modules/clients/services/CreateClientService';
import UpdateClientService from '@modules/clients/services/UpdateClientService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
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
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { projectId } = request.params;
    const { email } = request.body;

    const updateClient = container.resolve(UpdateClientService);

    const client = await updateClient.execute({
      projectId,
      email,
    });

    return response.json(client);
  }
}
