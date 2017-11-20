// @flow

require('app-module-path').addPath(`${__dirname}'./../../`);

const createDOM = require('./createDOM');

createDOM();

require('./init');
