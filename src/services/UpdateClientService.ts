import { getRepository } from 'typeorm';

import Client from '../models/Client';
import Project from '../models/Project';

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

    if (!project) throw new Error('Project not found');

    const client = await clientsRepository.findOne({
      where: { email },
      relations: ['project'],
    });

    if (!client) throw new Error('E-mail not found');

    const checkClientProjects = client.project.find(
      (projectItem) => projectItem.id === projectId,
    );

    if (checkClientProjects)
      throw new Error('Project already assigned to this client');

    client.project = [...client.project, project];

    await clientsRepository.save(client);

    return client;
  }
}

export default UpdateClientService;
