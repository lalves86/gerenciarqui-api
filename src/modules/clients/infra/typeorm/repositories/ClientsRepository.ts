import { getRepository, Repository } from 'typeorm';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async findByClientId(clientId: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne(clientId);

    return client;
  }

  public async findByClientEmail(email: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({
      relations: ['project'],
      where: { email },
    });

    return client;
  }

  public async create({
    name,
    email,
    phone,
    address,
    cpf,
    password,
  }: ICreateClientDTO): Promise<Client> {
    const project = this.ormRepository.create({
      name,
      email,
      phone,
      address,
      cpf,
      password,
    });

    await this.ormRepository.save(project);

    return project;
  }

  public async save(client: Client): Promise<Client> {
    return this.ormRepository.save(client);
  }
}

export default ClientsRepository;
