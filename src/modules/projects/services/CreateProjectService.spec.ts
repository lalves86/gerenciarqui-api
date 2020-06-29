import AppError from '@shared/errors/AppError';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from './CreateProjectService';

describe('CreateProject', () => {
  it('should be able to create a new project', async () => {
    const fakeProjectRepository = new FakeProjectsRepository();
    const createProject = new CreateProjectService(fakeProjectRepository);

    const project = await createProject.execute({
      name: 'Test project',
    });

    expect(project).toHaveProperty('id');
    expect(project.name).toBe('Test project');
  });

  it('should not be able to create two projects with the same name', async () => {
    const fakeProjectRepository = new FakeProjectsRepository();
    const createProject = new CreateProjectService(fakeProjectRepository);

    await createProject.execute({
      name: 'Test project',
    });

    expect(
      createProject.execute({
        name: 'Test project',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
