import ClientToken from '@modules/clients/infra/typeorm/entities/ClientToken';
import { uuid } from 'uuidv4';
import IClientTokensRepository from '../IClientTokensRepository';

class FakeClientTokensRepository implements IClientTokensRepository {
  private clientTokens: ClientToken[] = [];

  public async generate(clientId: string): Promise<ClientToken> {
    const clientToken = new ClientToken();

    Object.assign(clientToken, {
      id: uuid(),
      token: uuid(),
      clientId,
    });

    this.clientTokens.push(clientToken);

    return clientToken;
  }
}

export default FakeClientTokensRepository;
