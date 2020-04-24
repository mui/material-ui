require('@babel/register')({ extensions: ['.js', '.jsx', '.ts', '.tsx'] });
const createDOM = require('./createDOM');

process.browser = true;

createDOM();
require('./init');
