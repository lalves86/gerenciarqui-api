import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateClientAvatarService from '@modules/clients/services/UpdateClientAvatarService';

export default class ClientAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateClientAvatar = container.resolve(UpdateClientAvatarService);

    const client = await updateClientAvatar.execute({
      clientId: request.client.id,
      avatarFilename: request.file.filename,
    });

    return response.json(client);
  }
}
