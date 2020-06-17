import { EntityRepository, Repository } from 'typeorm';
import Project from '@modules/projects/infra/typeorm/entities/Project';

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
