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
      client_id: clientId,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.clientTokens.push(clientToken);

    return clientToken;
  }

  public async findByToken(token: string): Promise<ClientToken | undefined> {
    const clientToken = this.clientTokens.find(
      (findToken) => findToken.token === token,
    );

    return clientToken;
  }
}

export default FakeClientTokensRepository;
