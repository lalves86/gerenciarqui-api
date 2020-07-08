import ClientToken from '../infra/typeorm/entities/ClientToken';

export default interface IClientTokensRepository {
  generate(clientId: string): Promise<ClientToken>;
}
