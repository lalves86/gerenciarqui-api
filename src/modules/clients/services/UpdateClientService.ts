import { getRepository } from 'typeorm';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import Project from '@modules/projects/infra/typeorm/entities/Project';
import AppError from '@shared/errors/AppError';

interface Request {
  projectId: string;
  email: string;
}

class UpdateClientService {
  public async execute({ projectId, email }: Request): Promise<Client> {
    const projectsRepository = getRepository(Project);
    const clientsRepository = getRepository(Client);

    const project = await projectsRepository.findOne({
      where: { id: projectId },
    });

    if (!project) throw new AppError('Project not found');

    const client = await clientsRepository.findOne({
      where: { email },
      relations: ['project'],
    });

    if (!client) throw new AppError('E-mail not found');

    const checkClientProjects = client.project.find(
      (projectItem) => projectItem.id === projectId,
    );

    if (checkClientProjects)
      throw new AppError('Project already assigned to this client', 403);

    client.project = [...client.project, project];

    await clientsRepository.save(client);

    return client;
  }
}

export default UpdateClientService;
