import AppError from '@shared/errors/AppError';
import FakeProjectsRepository from '../repositories/fakes/FakeProjectsRepository';
import CreateProjectService from './CreateProjectService';

let createProject: CreateProjectService;
let fakeProjectRepository: FakeProjectsRepository;

describe('CreateProject', () => {
  beforeEach(() => {
    fakeProjectRepository = new FakeProjectsRepository();
    createProject = new CreateProjectService(fakeProjectRepository);
  });

  it('should be able to create a new project', async () => {
    const project = await createProject.execute({
      name: 'Test project',
    });

    expect(project).toHaveProperty('id');
    expect(project.name).toBe('Test project');
  });

  it('should not be able to create two projects with the same name', async () => {
    await createProject.execute({
      name: 'Test project',
    });

    await expect(
      createProject.execute({
        name: 'Test project',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
