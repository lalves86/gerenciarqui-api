import { uuid } from 'uuidv4';

class Project {
  id: string;

  name: string;

  client: string;

  constructor({ name, client }: Omit<Project, 'id'>) {
    this.id = uuid();
    this.name = name;
    this.client = client;
  }
}

export default Project;
