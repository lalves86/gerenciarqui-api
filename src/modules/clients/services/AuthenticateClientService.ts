import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  client: Client;
  token: string;
}

class AuthenticateClientService {
  public async execute({ email, password }: Request): Promise<Response> {
    const clientsRepository = getRepository(Client);

    const client = await clientsRepository.findOne({
      where: { email },
    });

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
