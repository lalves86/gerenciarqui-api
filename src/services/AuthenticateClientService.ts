import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import Client from '../models/Client';

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

    if (!client) throw new Error('Incorrect e-mail/password combination');

    const passwordCheck = await compare(password, client.password);

    if (!passwordCheck)
      throw new Error('Incorrect e-mail/password combination');

    const token = sign({}, 'c244084532101b0e4d73e7beeaba3aeb', {
      subject: client.id,
      expiresIn: '1d',
    });

    return { client, token };
  }
}

export default AuthenticateClientService;
