import 'reflect-metadata';
import express from 'express';

import routes from './routes';
import './database';

const app = express();

app.use(express.json());
app.use(routes);

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
