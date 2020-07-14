import AppError from '@shared/errors/AppError';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import UpdateClientAvatarService from './UpdateClientAvatarService';

let fakeClientsRepository: FakeClientsRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateClientAvatar: UpdateClientAvatarService;

describe('UpdateClientAvatar', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateClientAvatar = new UpdateClientAvatarService(
      fakeClientsRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update the client avatar', async () => {
    const client = await fakeClientsRepository.create({
      name: 'Fulano de tal',
      email: 'fulano@test.com',
      address: 'rua teste',
      phone: '(99) 99999-9999',
      cpf: '123.456.789-00',
      password: '123456',
    });

    await updateClientAvatar.execute({
      clientId: client.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(client.avatar).toEqual('avatar.jpg');
  });

  it('should not be able to update from non existing client', async () => {
    expect(
      updateClientAvatar.execute({
        clientId: 'non-existing-client',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating a new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const client = await fakeClientsRepository.create({
      name: 'Fulano de tal',
      email: 'fulano@test.com',
      address: 'rua teste',
      phone: '(99) 99999-9999',
      cpf: '123.456.789-00',
      password: '123456',
    });

    await updateClientAvatar.execute({
      clientId: client.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateClientAvatar.execute({
      clientId: client.id,
      avatarFilename: 'avatar2.jpg',
    });

    await expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    await expect(client.avatar).toEqual('avatar2.jpg');
  });
});
