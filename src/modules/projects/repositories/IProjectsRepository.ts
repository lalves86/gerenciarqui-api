import Project from '@modules/projects/infra/typeorm/entities/Project';
import ICreateProjectDTO from '../dtos/ICreateProjectDTO';

export default interface IProjectsRepository {
  create(data: ICreateProjectDTO): Promise<Project>;
  findByName(name: string): Promise<Project | undefined>;
  findById(projectId: string): Promise<Project | undefined>;
}
