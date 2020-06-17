import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import IClientsRepository from '../repositories/IClientsRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  client: Client;
  token: string;
}

class AuthenticateClientService {
  constructor(private clientsRepository: IClientsRepository) {}

  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const client = await this.clientsRepository.findByClientEmail(email);

    if (!client)
      throw new AppError('Incorrect e-mail/password combination', 401);

    const passwordCheck = await compare(password, client.password);

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
