import express from 'express';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data');

export default function setupStaticServer(app) {
  app.use('/data', express.static(dataPath));
}
