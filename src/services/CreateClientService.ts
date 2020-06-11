import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import Client from '../models/Client';

interface Request {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  cpf: string;
}

class CreateClientService {
  public async execute({
    name,
    email,
    phone,
    address,
    password,
    cpf,
  }: Request): Promise<Client> {
    const clientsRepository = getRepository(Client);

    const checkClientExists = await clientsRepository.findOne({
      where: { email },
    });

    if (checkClientExists) throw new Error('E-mail address already used.');

    const hashedPassword = await hash(password, 8);

    const client = clientsRepository.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      cpf,
    });

    await clientsRepository.save(client);

    return client;
  }
}

export default CreateClientService;
