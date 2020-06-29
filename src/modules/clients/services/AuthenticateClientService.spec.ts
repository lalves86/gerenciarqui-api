import AppError from '@shared/errors/AppError';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import AuthenticateClientService from './AuthenticateClientService';
import CreateClientService from './CreateClientService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('AuthenticateClient', () => {
  it('should be able to authenticate a client', async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateClient = new AuthenticateClientService(
      fakeClientsRepository,
      fakeHashProvider,
    );

    const createClient = new CreateClientService(
      fakeClientsRepository,
      fakeHashProvider,
    );

    const client = await createClient.execute({
      name: 'Fulano de tal',
      email: 'fulano@test.com',
      address: 'rua teste',
      phone: '(99) 99999-9999',
      cpf: '123.456.789-00',
      password: '123456',
    });

    const response = await authenticateClient.execute({
      email: 'fulano@test.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.client).toEqual(client);
  });

  it('should not be able to authenticate with non existing client', async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateClient = new AuthenticateClientService(
      fakeClientsRepository,
      fakeHashProvider,
    );

    expect(
      authenticateClient.execute({
        email: 'fulano@test.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeHashProvider = new FakeHashProvider();
    const authenticateClient = new AuthenticateClientService(
      fakeClientsRepository,
      fakeHashProvider,
    );

    const createClient = new CreateClientService(
      fakeClientsRepository,
      fakeHashProvider,
    );

    await createClient.execute({
      name: 'Fulano de tal',
      email: 'fulano@test.com',
      address: 'rua teste',
      phone: '(99) 99999-9999',
      cpf: '123.456.789-00',
      password: '123456',
    });

    expect(
      authenticateClient.execute({
        email: 'fulano@test.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
