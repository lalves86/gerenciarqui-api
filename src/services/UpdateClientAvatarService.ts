import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import Client from '../models/Client';
import uploadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  clientId: string;
  avatarFilename: string;
}

class UpdateClientAvatarService {
  public async execute({ clientId, avatarFilename }: Request): Promise<Client> {
    const clientsRepository = getRepository(Client);

    const client = await clientsRepository.findOne(clientId);

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

    await clientsRepository.save(client);

    return client;
  }
}

export default UpdateClientAvatarService;
