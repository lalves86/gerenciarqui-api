import AppError from '@shared/errors/AppError';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import CreateClientService from './CreateClientService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CreateClient', () => {
  it('should be able to create a new client', async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeHashProvider = new FakeHashProvider();
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

    expect(client).toHaveProperty('id');
  });

  it('should not be able to create two clients with the same e-mail', async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeHashProvider = new FakeHashProvider();
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
      createClient.execute({
        name: 'Fulano de tala',
        email: 'fulano@test.com',
        address: 'rua teste 2',
        phone: '(88) 88888-8888',
        cpf: '987.654,321-99',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
