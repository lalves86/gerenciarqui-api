import AppError from '@shared/errors/AppError';
import FakeProjectsRepository from '@modules/projects/repositories/fakes/FakeProjectsRepository';
import FakeClientsRepository from '../repositories/fakes/FakeClientsRepository';
import UpdateClientService from './UpdateClientService';

describe('UpdateClient', () => {
  it('should be able to atribute a client to a project', async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeProjectsRepository = new FakeProjectsRepository();

    const updateClient = new UpdateClientService(
      fakeClientsRepository,
      fakeProjectsRepository,
    );

    const client = await fakeClientsRepository.create({
      name: 'Fulano de tal',
      email: 'fulano@test.com',
      address: 'Test Street',
      phone: '(99) 99999-9999',
      cpf: '123.456.789-00',
      password: '123456',
    });

    const project = await fakeProjectsRepository.create({
      name: 'Test Project',
    });

    await updateClient.execute({
      projectId: project.id,
      email: client.email,
    });

    expect(client.project).toEqual([project]);
  });

  it('should not be able to atribute a client to a non-existing project', async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeProjectsRepository = new FakeProjectsRepository();

    const updateClient = new UpdateClientService(
      fakeClientsRepository,
      fakeProjectsRepository,
    );

    const client = await fakeClientsRepository.create({
      name: 'Fulano de tal',
      email: 'fulano@test.com',
      address: 'Test Street',
      phone: '(99) 99999-9999',
      cpf: '123.456.789-00',
      password: '123456',
    });

    expect(
      updateClient.execute({
        projectId: 'non-existing-project',
        email: client.email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to atribute a project to a non-existing client', async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeProjectsRepository = new FakeProjectsRepository();

    const updateClient = new UpdateClientService(
      fakeClientsRepository,
      fakeProjectsRepository,
    );

    const project = await fakeProjectsRepository.create({
      name: 'Test Project',
    });

    expect(
      updateClient.execute({
        projectId: project.id,
        email: 'wrong@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to atribute the same project to a client more than once', async () => {
    const fakeClientsRepository = new FakeClientsRepository();
    const fakeProjectsRepository = new FakeProjectsRepository();

    const updateClient = new UpdateClientService(
      fakeClientsRepository,
      fakeProjectsRepository,
    );

    const client = await fakeClientsRepository.create({
      name: 'Fulano de tal',
      email: 'fulano@test.com',
      address: 'Test Street',
      phone: '(99) 99999-9999',
      cpf: '123.456.789-00',
      password: '123456',
    });

    const project = await fakeProjectsRepository.create({
      name: 'Test project',
    });

    await updateClient.execute({
      projectId: project.id,
      email: client.email,
    });

    expect(
      updateClient.execute({
        projectId: project.id,
        email: client.email,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
