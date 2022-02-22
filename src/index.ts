import express from 'express';
import path from 'path';
import fs from 'fs';
import routers from './routers/index';
import listImages from './routers/api/listOfImages';

const app = express();
const port = 5000;

app.use('/api', routers);

app.use('/', listImages);

app.listen(port, (): void => {
  // make sure thumb folder exists
  const thumbPath = path.resolve(__dirname, '../assets/thumb');

  if (!fs.existsSync(thumbPath)) {
    fs.mkdirSync(thumbPath);
  }

  console.log(`Running on port ${port}`);
});

export default app;
