import { inject, injectable } from 'tsyringe';
import path from 'path';

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

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: client.name,
        email: client.email,
      },
      subject: 'Recuperação da sua senha do GerenciArqui',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: client.name,
          link: `http://localhost:3000/reset-password?token=${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
