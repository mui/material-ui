const { execSync } = require('child_process');
const { version } = require('../../lib/package.json');

// dev.material-ui-pickers.dev is the automatically deployed for the `next` branch

execSync('now alias dev.material-ui-pickers.dev next.material-ui-pickers.dev');
execSync(
  `now alias dev.material-ui-pickers.dev v${version.replace(/\./g, '-')}.material-ui-pickers.dev`
);
