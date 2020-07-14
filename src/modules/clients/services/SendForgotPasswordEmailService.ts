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

    const { token } = await this.clientTokensRepository.generate(client.id);

    await this.mailProvider.sendMail({
      to: {
        name: client.name,
        email: client.email,
      },
      subject: 'Recuperação da sua senha do GerenciArqui',
      templateData: {
        template: 'Olá, {{name}}: {{token}}',
        variables: {
          name: client.name,
          token,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
