import Project from '@modules/projects/infra/typeorm/entities/Project';
import AppError from '@shared/errors/AppError';
import IProjectsRepository from '../repositories/IProjectsRepository';

interface IRequest {
  name: string;
}

class CreateProjectService {
  constructor(private projectsRepository: IProjectsRepository) {}

  public async execute({ name }: IRequest): Promise<Project> {
    const projectExists = await this.projectsRepository.findByName(name);

    if (projectExists) throw new AppError(`Project ${name} already exists`);

    const project = await this.projectsRepository.create({ name });

    return project;
  }
}

export default CreateProjectService;
