import AppError from '@shared/errors/AppError';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import ShowClientProfileService from './ShowClientProfileService';

let fakeClientsRepository: FakeClientsRepository;
let showClientProfile: ShowClientProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeClientsRepository = new FakeClientsRepository();

    showClientProfile = new ShowClientProfileService(fakeClientsRepository);
  });

  it('should be able to show the client profile', async () => {
    const client = await fakeClientsRepository.create({
      name: 'Fulano de tal',
      email: 'fulano@test.com',
      address: 'rua teste',
      phone: '(99) 99999-9999',
      cpf: '123.456.789-00',
      password: '123456',
    });

    const profile = await showClientProfile.execute(client.id);

    expect(profile.name).toBe('Fulano de tal');
    expect(profile.email).toBe('fulano@test.com');
  });

  it('should not be able to show profile of a non-existing client', async () => {
    expect(
      showClientProfile.execute('non-existing-client-id'),
    ).rejects.toBeInstanceOf(AppError);
  });
});
