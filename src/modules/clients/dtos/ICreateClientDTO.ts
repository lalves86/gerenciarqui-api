import Project from '@modules/projects/infra/typeorm/entities/Project';

export default interface ICreateClientDTO {
  name: string;
  email: string;
  phone: string;
  address: string;
  password: string;
  cpf: string;
  project: Project[];
}
