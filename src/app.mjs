import express from 'express';
import routes from './routes/index.mjs';
import open from 'open';

const app = express();
const port = process.env.PORT ?? 3000;
const isDocker = process.env.RUNNING_IN_DOCKER === 'true';

routes(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);

  if (!isDocker) {
    console.log(
      `Opening the file list index (http://localhost:${port}/list-data) in the default browser...`
    );
    open(`http://localhost:${port}/list-data`);
  } else {
    console.log('Running in Docker container - browser auto-open disabled');
  }
});
