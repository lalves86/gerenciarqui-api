import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProjectService from '@modules/projects/services/CreateProjectService';

class ProjectsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const createProject = container.resolve(CreateProjectService);

    const project = await createProject.execute({ name });

    return response.json(project);
  }
}

export default ProjectsController;
