import { getCustomRepository } from 'typeorm';

import Project from '../models/Project';
import ProjectsRepository from '../repositories/ProjectsRepository';

interface Request {
  name: string;
  client: string;
}

class CreateProjectService {
  public async execute({ name, client }: Request): Promise<Project> {
    const projectsRepository = getCustomRepository(ProjectsRepository);

    const projectExists = await projectsRepository.findByName(name);

    if (projectExists) throw new Error(`Project ${name} already exists`);

    const project = projectsRepository.create({ name, client });

    await projectsRepository.save(project);

    return project;
  }
}

export default CreateProjectService;
