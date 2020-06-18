import { injectable, inject } from 'tsyringe';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import AppError from '@shared/errors/AppError';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import IClientsRepository from '../repositories/IClientsRepository';

interface IRequest {
  projectId: string;
  email: string;
}

@injectable()
class UpdateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('ProjectsRepository')
    private projectsRepository: IProjectsRepository,
  ) {}

  public async execute({ projectId, email }: IRequest): Promise<Client> {
    const project = await this.projectsRepository.findById(projectId);

    if (!project) throw new AppError('Project not found');

    const client = await this.clientsRepository.findByClientEmail(email);

    if (!client) throw new AppError('E-mail not found');

    const checkClientProjects = client.project?.find(
      (projectItem) => projectItem.id === projectId,
    );

    if (checkClientProjects)
      throw new AppError('Project already assigned to this client', 403);

    client.project = [...client.project, project];

    await this.clientsRepository.save(client);

    return client;
  }
}

export default UpdateClientService;
