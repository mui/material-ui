#!/usr/bin/env node

const { createRequire, createRequireFromPath } = require(`module`);
const { resolve } = require(`path`);

const relPnpApiPath = '../../../.pnp.js';

const absPnpApiPath = resolve(__dirname, relPnpApiPath);
const absRequire = (createRequire || createRequireFromPath)(absPnpApiPath);

// Setup the environment to be able to require prettier/index.js
require(absPnpApiPath).setup();

// Defer to the real prettier/index.js your application uses
module.exports = absRequire(`prettier/index.js`);
