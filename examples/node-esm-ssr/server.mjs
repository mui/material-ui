import { createServer } from 'node:http';
import { renderPage } from './src/renderPage.mjs';

const port = Number(process.env.PORT || 3000);
const renderOnce = process.argv.includes('--once');

if (renderOnce) {
  console.log(renderPage());
} else {
  createServer((request, response) => {
    if (request.url !== '/') {
      response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }

    response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
    response.end(renderPage());
  }).listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}
