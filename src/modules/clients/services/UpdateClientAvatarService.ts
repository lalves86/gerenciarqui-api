import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IClientsRepository from '../repositories/IClientsRepository';

interface IRequest {
  clientId: string;
  avatarFilename: string;
}

@injectable()
class UpdateClientAvatarService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

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
      await this.storageProvider.deleteFile(client.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    client.avatar = filename;

    await this.clientsRepository.save(client);

    return client;
  }
}

export default UpdateClientAvatarService;
