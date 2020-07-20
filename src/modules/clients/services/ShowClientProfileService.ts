import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IClientsRepository from '../repositories/IClientsRepository';
import Client from '../infra/typeorm/entities/Client';

@injectable()
class ShowClientProfileService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,
  ) {}

  public async execute(clientId: string): Promise<Client> {
    const client = await this.clientsRepository.findByClientId(clientId);

    if (!client) throw new AppError('Client not found');

    return client;
  }
}

export default ShowClientProfileService;
