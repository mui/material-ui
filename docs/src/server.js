// @flow weak

const { createServer } = require('http');
const { parse } = require('url');
const moduleAlias = require('module-alias');
const dev = process.env.NODE_ENV !== 'production';

// For the development version, we'll use React.
// Because, it support react hot loading and so on.
if (!dev || dev) {
  moduleAlias.addAlias('react', 'preact-compat');
  moduleAlias.addAlias('react-dom', 'preact-compat');
}
const next = require('next');

const app = next({ dev });
const handle = app.getRequestHandler();
const port = parseInt(process.env.PORT, 10) || 3000;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
