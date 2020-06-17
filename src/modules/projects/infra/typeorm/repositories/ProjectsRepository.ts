import { getRepository, Repository } from 'typeorm';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ICreateProjectDTO from '@modules/projects/dtos/ICreateProjectDTO';

class ProjectsRepository implements IProjectsRepository {
  private ormRepository: Repository<Project>;

  constructor() {
    this.ormRepository = getRepository(Project);
  }

  public async findByName(name: string): Promise<Project | undefined> {
    const findProject = await this.ormRepository.findOne({
      where: { name },
    });

    return findProject;
  }

  public async findById(projectId: string): Promise<Project | undefined> {
    const findProject = await this.ormRepository.findOne(projectId);

    return findProject;
  }

  public async create({ name }: ICreateProjectDTO): Promise<Project> {
    const project = this.ormRepository.create({ name });

    await this.ormRepository.save(project);

    return project;
  }
}

export default ProjectsRepository;
