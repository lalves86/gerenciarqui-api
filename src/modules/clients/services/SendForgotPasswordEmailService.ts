import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IClientsRepository from '../repositories/IClientsRepository';
import IClientTokensRepository from '../repositories/IClientTokensRepository';

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('ClientTokensRepository')
    private clientTokensRepository: IClientTokensRepository,
  ) {}

  public async execute(email: string): Promise<void> {
    const client = await this.clientsRepository.findByClientEmail(email);

    if (!client) throw new AppError('Client does not exists');

    await this.clientTokensRepository.generate(client.id);

    this.mailProvider.sendMail(
      email,
      'Pedido de recuperação de senha recebido',
    );
  }
}

export default SendForgotPasswordEmailService;
