import AppError from '@shared/errors/AppError';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateClientProfileService from './UpdateClientProfileService';

let fakeClientsRepository: FakeClientsRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateClientProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateClientProfileService(
      fakeClientsRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update the client profile', async () => {
    const client = await fakeClientsRepository.create({
      name: 'Fulano de tal',
      email: 'fulano@test.com',
      address: 'rua teste',
      phone: '(99) 99999-9999',
      cpf: '123.456.789-00',
      password: '123456',
    });

    const updatedClient = await updateProfile.execute({
      clientId: client.id,
      name: 'Cicrano de tal',
      email: 'cicrano@test.com',
      address: 'rua teste',
      phone: '(99) 99999-9999',
      cpf: '123.456.789-00',
    });

    expect(updatedClient.name).toBe('Cicrano de tal');
    expect(updatedClient.email).toBe('cicrano@test.com');
  });

  it('should not be able to update the e-mail to another client e-mail', async () => {
    await fakeClientsRepository.create({
      name: 'Fulano de tal',
      email: 'fulano@test.com',
      address: 'rua teste',
      phone: '(99) 99999-9999',
      cpf: '123.456.789-00',
      password: '123456',
    });

    const client = await fakeClientsRepository.create({
      name: 'cicrano de tal',
      email: 'cicrano@test.com',
      address: 'rua de cima',
      phone: '(99) 88888-8888',
      cpf: '987.654.321-00',
      password: 'teste',
    });

    await expect(
      updateProfile.execute({
        clientId: client.id,
        name: 'cicrano de tal',
        email: 'fulano@test.com',
        address: 'rua de cima',
        phone: '(99) 88888-8888',
        cpf: '987.654.321-00',
        password: 'teste',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const client = await fakeClientsRepository.create({
      name: 'cicrano de tal',
      email: 'cicrano@test.com',
      address: 'rua de cima',
      phone: '(99) 88888-8888',
      cpf: '987.654.321-00',
      password: '123456',
    });

    const updatedClient = await updateProfile.execute({
      clientId: client.id,
      name: 'Cicrano de tal',
      email: 'cicrano@test.com',
      address: 'rua teste',
      phone: '(99) 99999-9999',
      cpf: '123.456.789-00',
      oldPassword: '123456',
      password: '123123',
    });

    expect(updatedClient.password).toBe('123123');
  });

  it('should not be able to change to a new password without the old password', async () => {
    const client = await fakeClientsRepository.create({
      name: 'cicrano de tal',
      email: 'cicrano@test.com',
      address: 'rua de cima',
      phone: '(99) 88888-8888',
      cpf: '987.654.321-00',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        clientId: client.id,
        name: 'Cicrano de tal',
        email: 'cicrano@test.com',
        address: 'rua teste',
        phone: '(99) 99999-9999',
        cpf: '123.456.789-00',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to a new password with wrong current password', async () => {
    const client = await fakeClientsRepository.create({
      name: 'cicrano de tal',
      email: 'cicrano@test.com',
      address: 'rua de cima',
      phone: '(99) 88888-8888',
      cpf: '987.654.321-00',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        clientId: client.id,
        name: 'Cicrano de tal',
        email: 'cicrano@test.com',
        address: 'rua teste',
        phone: '(99) 99999-9999',
        cpf: '123.456.789-00',
        oldPassword: 'wrong-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
