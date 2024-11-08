import express from 'express';
import path from 'path';
import fs from 'fs';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.join(__dirname, '../data');

// TODO: Implement recursive folder listing
const FOLDER_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; vertical-align: middle;"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>`;
const FILE_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; vertical-align: middle;"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>`;

function encodeHTML(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export default function setupStaticServer(app) {
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

      let html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Serve JSON</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              background: #f5f5f5;
            }
            h1 {
              color: #333;
              border-bottom: 2px solid #ddd;
              padding-bottom: 10px;
            }
            ul {
              list-style: none;
              padding: 0;
            }
            li {
              background: white;
              margin: 10px 0;
              padding: 15px;
              border-radius: 5px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
              transition: transform 0.2s;
            }
            li:hover {
              transform: translateX(5px);
            }
            a {
              color: #2563eb;
              text-decoration: none;
              font-weight: 500;
            }
            a:hover {
              text-decoration: underline;
            }
            .file-info {
              color: #666;
              font-size: 0.9em;
              margin-top: 5px;
            }
          </style>
        </head>
        <body>
          <h1>JSON Files</h1>
          <ul>`;

      fileDetails.forEach((file) => {
        const icon = file.isFolder ? FOLDER_ICON : FILE_ICON;
        html += `
          <li>
            ${icon}<a href="${encodeHTML(file.url)}">${encodeHTML(file.name)}</a>
            <div class="file-info">
              ${(file.size / 1024).toFixed(2)} KB · Last Modified: ${file.lastModified.toLocaleDateString()}
            </div>
          </li>`;
      });

      html += `
          </ul>
        </body>
        </html>`;

      res.send(html);
    });
  });
}
