import Client from '@modules/clients/infra/typeorm/entities/Client';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import { uuid } from 'uuidv4';

class FakeClientsRepository implements IClientsRepository {
  private clients: Client[] = [];

  private projects: Project[] = [];

  public async findByClientId(clientId: string): Promise<Client | undefined> {
    const findClient = await this.clients.find(
      (client) => client.id === clientId,
    );

    return findClient;
  }

  public async findByClientEmail(email: string): Promise<Client | undefined> {
    const findClient = await this.clients.find(
      (client) => client.email === email,
    );

    return findClient;
  }

  public async create({
    name,
    email,
    phone,
    address,
    cpf,
    password,
  }: ICreateClientDTO): Promise<Client> {
    const client = new Client();

    Object.assign(client, {
      id: uuid(),
      name,
      email,
      phone,
      address,
      cpf,
      password,
      project: [],
    });

    this.clients.push(client);

    return client;
  }

  public async save(client: Client): Promise<Client> {
    const findIndex = this.clients.findIndex(
      (findClient) => findClient.id === client.id,
    );

    this.clients[findIndex] = client;

    return client;
  }
}

export default FakeClientsRepository;
