const createDOM = require('./createDOM');

// eslint-disable-next-line no-underscore-dangle
global.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;
createDOM();
require('./init');
