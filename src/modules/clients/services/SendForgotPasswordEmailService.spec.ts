import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import AppError from '@shared/errors/AppError';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';
import FakeClientTokensRepository from '../repositories/fakes/FakeClientTokensRepository';

let fakeClientsRepository: FakeClientsRepository;
let fakeMailProvider: FakeMailProvider;
let fakeClientTokensRepository: FakeClientTokensRepository;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeClientTokensRepository = new FakeClientTokensRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeClientsRepository,
      fakeMailProvider,
      fakeClientTokensRepository,
    );
  });

  it('should be able recover password using e-mail', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeClientsRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
      address: 'Test st.',
      cpf: '123.456.789-00',
      phone: '(99) 99999-9999',
    });

    await sendForgotPasswordEmail.execute('johndoe@test.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing client password', async () => {
    await expect(
      sendForgotPasswordEmail.execute('johndoe@test.com'),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeClientTokensRepository, 'generate');

    const client = await fakeClientsRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
      address: 'Test st.',
      cpf: '123.456.789-00',
      phone: '(99) 99999-9999',
    });

    await sendForgotPasswordEmail.execute('johndoe@test.com');

    expect(generateToken).toHaveBeenCalledWith(client.id);
  });
});
