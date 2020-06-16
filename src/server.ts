import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import routes from './routes';
import './database';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'Error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'Error',
    message: 'Internal server error',
  });
});

app.listen(3001, () => {
  console.log(
    `
      🍀️ Server is running on port 3001! Rock on! 🎸️
      💻️ This code is developed by lalves86
      if you want to know more, find me at:
      https://github.com/lalves86
    `,
  );
});
