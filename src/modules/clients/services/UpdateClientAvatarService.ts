import path from 'path';
import fs from 'fs';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IClientsRepository from '../repositories/IClientsRepository';

interface IRequest {
  clientId: string;
  avatarFilename: string;
}

class UpdateClientAvatarService {
  constructor(private clientsRepository: IClientsRepository) {}

  public async execute({
    clientId,
    avatarFilename,
  }: IRequest): Promise<Client> {
    const client = await this.clientsRepository.findByClientId(clientId);

    if (!client)
      throw new AppError(
        'You have to be authenticated to change the avatar',
        401,
      );

    if (client.avatar) {
      const clientAvatarFilePath = path.join(
        uploadConfig.directory,
        client.avatar,
      );

      const clientAvatarFileExists = await fs.promises.stat(
        clientAvatarFilePath,
      );

      if (clientAvatarFileExists)
        await fs.promises.unlink(clientAvatarFilePath);
    }

    client.avatar = avatarFilename;

    await this.clientsRepository.save(client);

    return client;
  }
}

export default UpdateClientAvatarService;
