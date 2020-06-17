import Client from '../infra/typeorm/entities/Client';
import ICreateClientDTO from '../dtos/ICreateClientDTO';

export default interface IClientsRepository {
  findByClientId(ClientId: string): Promise<Client | undefined>;
  findByClientEmail(email: string): Promise<Client | undefined>;
  create(data: ICreateClientDTO): Promise<Client>;
  save(client: Client): Promise<Client>;
}
