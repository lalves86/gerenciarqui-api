import AppError from '@shared/errors/AppError';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import FakeClientTokensRepository from '../repositories/fakes/FakeClientTokensRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let resetPassword: ResetPasswordService;
let fakeClientsRepository: FakeClientsRepository;
let fakeClientTokensRepository: FakeClientTokensRepository;
let fakeHashProvider: FakeHashProvider;

describe('ResetPassword', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    fakeClientTokensRepository = new FakeClientTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeClientsRepository,
      fakeClientTokensRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset client password', async () => {
    const client = await fakeClientsRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
      address: 'Test st.',
      cpf: '123.456.789-00',
      phone: '(99) 99999-9999',
    });

    const { token } = await fakeClientTokensRepository.generate(client.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      password: '123123',
      token,
    });

    const updatedClient = await fakeClientsRepository.findByClientId(client.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedClient?.password).toBe('123123');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password of a non-existing client', async () => {
    const { token } = await fakeClientTokensRepository.generate(
      'non-existing-client',
    );

    await expect(
      resetPassword.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password after two hours', async () => {
    const client = await fakeClientsRepository.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '123456',
      address: 'Test st.',
      cpf: '123.456.789-00',
      phone: '(99) 99999-9999',
    });

    const { token } = await fakeClientTokensRepository.generate(client.id);

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
