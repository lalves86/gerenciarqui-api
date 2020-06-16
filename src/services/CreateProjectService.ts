import { getCustomRepository } from 'typeorm';

import Project from '../models/Project';
import ProjectsRepository from '../repositories/ProjectsRepository';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  client: string;
}

class CreateProjectService {
  public async execute({ name }: Request): Promise<Project> {
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const projectExists = await projectsRepository.findByName(name);

    if (projectExists) throw new AppError(`Project ${name} already exists`);

    const project = projectsRepository.create({ name });

    await projectsRepository.save(project);

    return project;
  }
}

export default CreateProjectService;
