import { uuid } from 'uuidv4';

import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

class FakeProjectsRepository implements IProjectsRepository {
  private projects: Project[] = [];

  public async findByName(name: string): Promise<Project | undefined> {
    const findProject = this.projects.find((project) => project.name === name);

    return findProject;
  }

  public async findById(projectId: string): Promise<Project | undefined> {
    const findProject = this.projects.find(
      (project) => project.id === projectId,
    );

    return findProject;
  }

  public async create({ name }: ICreateProjectDTO): Promise<Project> {
    const project = new Project();

    Object.assign(project, { id: uuid(), name });

    this.projects.push(project);

    return project;
  }
}

export default FakeProjectsRepository;
