import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IClientsRepository from '../repositories/IClientsRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import Client from '../infra/typeorm/entities/Client';

interface IRequest {
  clientId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  cpf: string;
  oldPassword?: string;
  password?: string;
}

@injectable()
class UpdateClientProfileService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    clientId,
    name,
    email,
    phone,
    address,
    cpf,
    password,
    oldPassword,
  }: IRequest): Promise<Client> {
    const client = await this.clientsRepository.findByClientId(clientId);

    if (!client) throw new AppError('Client not found');

    const checkExistingEmail = await this.clientsRepository.findByClientEmail(
      email,
    );

    if (checkExistingEmail && checkExistingEmail.id !== clientId)
      throw new AppError('This e-mail is already used by another client');

    client.name = name;
    client.email = email;
    client.phone = phone;
    client.address = address;
    client.cpf = cpf;

    if (password && !oldPassword)
      throw new AppError(
        'Current password is required to change to a new pasword',
      );

    if (password && oldPassword) {
      const checkOldPassword = await this.hashProvider.compareHash(
        oldPassword,
        client.password,
      );

      if (!checkOldPassword)
        throw new AppError('The password informed is wrong');

      client.password = await this.hashProvider.generateHash(password);
    }

    return this.clientsRepository.save(client);
  }
}

export default UpdateClientProfileService;
