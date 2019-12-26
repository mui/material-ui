const relPnpApiPath = '../../../../.pnp.js';
const absPnpApiPath = require(`path`).resolve(__dirname, relPnpApiPath);

// Setup the environment to be able to require typescript/lib/tsserver
require(absPnpApiPath).setup();

// Prepare the environment (to be ready in case of child_process.spawn etc)
process.env.NODE_OPTIONS = process.env.NODE_OPTIONS || ``;
process.env.NODE_OPTIONS += ` -r ${absPnpApiPath}`;
process.env.NODE_OPTIONS += ` -r ${require.resolve(`@yarnpkg/pnpify`)}`;

// Apply PnPify to the current process
require(`@yarnpkg/pnpify`).patchFs();

// Defer to the real typescript/lib/tsserver your application uses
module.exports = require(`typescript/lib/tsserver`);
