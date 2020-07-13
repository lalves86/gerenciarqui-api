import { container } from 'tsyringe';
import '@modules/clients/providers';
import './providers';
import ProjectsRepository from '@modules/projects/infra/typeorm/repositories/ProjectsRepository';
import IProjectsRepository from '@modules/projects/repositories/IProjectsRepository';
import ClientsRepository from '@modules/clients/infra/typeorm/repositories/ClientsRepository';
import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ClientTokensRepository from '@modules/clients/infra/typeorm/repositories/ClientTokensRepository';
import IClientTokensRepository from '@modules/clients/repositories/IClientTokensRepository';

container.registerSingleton<IProjectsRepository>(
  'ProjectsRepository',
  ProjectsRepository,
);

container.registerSingleton<IClientsRepository>(
  'ClientsRepository',
  ClientsRepository,
);

container.registerSingleton<IClientTokensRepository>(
  'ClientTokensRepository',
  ClientTokensRepository,
);
