import { uuid } from 'uuidv4';

class Project {
  id: string;

  name: string;

  client: string;

  constructor(name: string, client: string) {
    this.id = uuid();
    this.name = name;
    this.client = client;
  }
}

export default Project;
