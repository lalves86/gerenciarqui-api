import { Request, Response } from 'express';

function helloWorld(request: Request, response: Response) {
  return response.json({ message: 'Hello world' });
}

export default helloWorld;
