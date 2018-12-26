const cache = {};

const req = require.context('./', true, /(?!index\.js$).js$/);

req.keys().forEach(filename => {
  const module = req(filename).default;
  if (module) {
    cache[filename.replace('./', '').replace('.js', '')] = module;
  }
});

export default cache;
