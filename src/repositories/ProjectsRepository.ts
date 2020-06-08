import { EntityRepository, Repository } from 'typeorm';
import Project from '../models/Project';

@EntityRepository(Project)
class ProjectsRepository extends Repository<Project> {
  public async findByName(name: string): Promise<Project | null> {
    const findProject = await this.findOne({
      where: { name },
    });

    return findProject || null;
  }
}

export default ProjectsRepository;
