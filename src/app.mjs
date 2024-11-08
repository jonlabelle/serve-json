import express from 'express';
import routes from './routes/index.mjs';
import open from 'open';

const app = express();
const port = process.env.PORT ?? 3000;
const isDocker = process.env.RUNNING_IN_DOCKER === 'true';

const baseUrl = `http://localhost:${port}`;

routes(app);

app.listen(port, () => {
  console.log('-'.repeat(40));
  console.log(' '.repeat((40 - 'Serve JSON'.length) / 2) + 'Serve JSON');
  console.log(`${'-'.repeat(40)}`);
  console.log('');
  console.log('A simple JSON server for your local development.');
  console.log('');
  console.log(`- Server is running on....: ${baseUrl}`);
  console.log(`- JSON files URI..........: ${baseUrl}/data/<your-data>.json`);
  console.log(`- Sample JSON file........: ${baseUrl}/data/sample.json`);
  console.log(`- Browse JSON files.......: ${baseUrl}/list-data`);
  console.log('');

  if (!isDocker) {
    console.log(
      `Opening the file list index (http://localhost:${port}/list-data) in the default browser...`
    );
    open(`http://localhost:${port}/list-data`);
  } else {
    console.log('Running in a container... browser auto-open disabled.');
  }
});
