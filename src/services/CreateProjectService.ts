import Project from '../models/Project';
import ProjectsRepository from '../repositories/ProjectsRepository';

interface Request {
  name: string;
  client: string;
}

class CreateProjectService {
  private projectsRepository: ProjectsRepository;

  constructor(projectsRepository: ProjectsRepository) {
    this.projectsRepository = projectsRepository;
  }

  public execute({ name, client }: Request): Project {
    const projectExists = this.projectsRepository.findByName(name);

    if (projectExists) throw new Error(`Project ${name} already exists`);

    const project = this.projectsRepository.create({ name, client });

    return project;
  }
}

export default CreateProjectService;
