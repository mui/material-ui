const createDOM = require('./createDOM');

process.browser = true;

createDOM();
require('./init');
