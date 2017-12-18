import * as AppModulePath from 'app-module-path';
AppModulePath.addPath(`${__dirname}'./../../`);

const createDOM = require('./createDOM');

createDOM();

require('./init');
