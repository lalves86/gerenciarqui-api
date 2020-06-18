import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import IClientsRepository from '../repositories/IClientsRepository';

interface IRequest {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  cpf: string;
}

@injectable()
class CreateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute({
    name,
    email,
    phone,
    address,
    password,
    cpf,
  }: IRequest): Promise<Client> {
    const checkClientExists = await this.clientsRepository.findByClientEmail(
      email,
    );

    if (checkClientExists) throw new AppError('E-mail address already used.');

    const hashedPassword = await hash(password, 8);

    const client = await this.clientsRepository.create({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      cpf,
    });

    return client;
  }
}

export default CreateClientService;
