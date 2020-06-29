import { sign } from 'jsonwebtoken';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IClientsRepository from '../repositories/IClientsRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  client: Client;
  token: string;
}

@injectable()
class AuthenticateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const client = await this.clientsRepository.findByClientEmail(email);

    if (!client)
      throw new AppError('Incorrect e-mail/password combination', 401);

    const passwordCheck = await this.hashProvider.compareHash(
      password,
      client.password,
    );

    if (!passwordCheck)
      throw new AppError('Incorrect e-mail/password combination', 401);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: client.id,
      expiresIn,
    });

    return { client, token };
  }
}

export default AuthenticateClientService;
