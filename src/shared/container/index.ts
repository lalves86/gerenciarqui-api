import { container } from 'tsyringe';
import ProjectsRepository from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);
