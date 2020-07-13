import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IClientsRepository from '../repositories/IClientsRepository';
import IClientTokensRepository from '../repositories/IClientTokensRepository';
import Client from '../infra/typeorm/entities/Client';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('ClientTokensRepository')
    private clientTokensRepository: IClientTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    password,
    token,
  }: IRequest): Promise<Client | undefined> {
    const clientToken = await this.clientTokensRepository.findByToken(token);

    if (!clientToken) throw new AppError('Client token does not exists');

    const client = await this.clientsRepository.findByClientId(
      clientToken.client_id,
    );

    if (!client) throw new AppError('Client does not exists');

    const tokenCreatedAt = clientToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) throw new AppError('Token expired');

    client.password = await this.hashProvider.generateHash(password);

    await this.clientsRepository.save(client);

    return client;
  }
}

export default ResetPasswordService;
