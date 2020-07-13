import { getRepository, Repository } from 'typeorm';
import ClientToken from '@modules/clients/infra/typeorm/entities/ClientToken';
import IClientTokensRepository from '@modules/clients/repositories/IClientTokensRepository';

class ClientTokensRepository implements IClientTokensRepository {
  private ormRepository: Repository<ClientToken>;

  constructor() {
    this.ormRepository = getRepository(ClientToken);
  }

  public async findByToken(token: string): Promise<ClientToken | undefined> {
    const clientToken = await this.ormRepository.findOne({
      where: { token },
    });

    return clientToken;
  }

  public async generate(clientId: string): Promise<ClientToken> {
    const clientToken = this.ormRepository.create({
      client_id: clientId,
    });

    await this.ormRepository.save(clientToken);

    return clientToken;
  }
}

export default ClientTokensRepository;
