const cache = {};
const req = require.context('./', false, /\.js$/);

req.keys().forEach(filename => {
  cache[filename.replace(/\.\/|\.js/g, '')] = req(filename).default;
});

export default cache;
