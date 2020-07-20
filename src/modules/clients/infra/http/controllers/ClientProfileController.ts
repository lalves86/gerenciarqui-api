import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateClientProfileService from '@modules/clients/services/UpdateClientProfileService';
import ShowClientProfileService from '@modules/clients/services/ShowClientProfileService';

export default class ClientProfileContoller {
  public async show(request: Request, response: Response): Promise<Response> {
    const clientId = request.client.id;

    const showClientProfile = container.resolve(ShowClientProfileService);

    const client = await showClientProfile.execute(clientId);

    return response.json(client);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const clientId = request.client.id;
    const {
      name,
      email,
      phone,
      address,
      oldPassword,
      password,
      cpf,
    } = request.body;

    const updateClient = container.resolve(UpdateClientProfileService);

    const client = await updateClient.execute({
      clientId,
      name,
      email,
      phone,
      address,
      oldPassword,
      password,
      cpf,
    });

    return response.json(client);
  }
}
