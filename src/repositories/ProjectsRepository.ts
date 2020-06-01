import Project from '../models/Project';

class ProjectsRepository {
  private projects: Project[];

  constructor() {
    this.projects = [];
  }

  public findAllProjects(): Project[] {
    const { projects } = this;

    return projects;
  }

  public findByName(name: string): Project | null {
    const findProject = this.projects.find((project) => project.name === name);

    return findProject || null;
  }

  public create(name: string, client: string): Project {
    const project = new Project(name, client);

    this.projects.push(project);

    return project;
  }
}

export default ProjectsRepository;
