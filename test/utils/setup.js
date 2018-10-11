const createDOM = require('./createDOM');

// eslint-disable-next-line no-underscore-dangle
global.__MUI_USE_NEW_TYPOGRAPHY_VARIANTS__ = true;
createDOM();
require('./init');
