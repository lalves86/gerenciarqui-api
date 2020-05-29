import express from 'express';

import helloworld from './routes';

const app = express();

app.get('/', helloworld);

app.listen(3333, () => {
  console.log(
    `
      🍀️ Server is running on port 3333! Rock on! 🎸️
      💻️ This code is developed by lalves86
      if you want to know more, find me at:
      https://github.com/lalves86
    `,
  );
});
