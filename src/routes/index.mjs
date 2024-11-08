import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data');

// TODO: Implement recursive folder listing

export default function setupStaticServer(app) {
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));

  app.use('/data', express.static(dataPath));

  app.get('/list-data', (req, res) => {
    fs.readdir(dataPath, (err, files) => {
      if (err) {
        return res.status(500).send('<p>Unable to scan directory</p>');
      }

      const fileDetails = files.map((file) => {
        const filePath = path.join(dataPath, file);
        const stats = fs.statSync(filePath);

        return {
          name: file,
          size: stats.size,
          lastModified: stats.mtime,
          url: `/data/${file}`,
          isFolder: stats.isDirectory(),
        };
      });

      res.render('index', { fileDetails });
    });
  });
}
