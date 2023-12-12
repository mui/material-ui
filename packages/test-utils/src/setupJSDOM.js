const testingLibrary = require('@testing-library/dom');
const Mocha = require('mocha');
const createDOM = require('./createDOM');
const { createMochaHooks } = require('./mochaHooks');

// Enable missing act warnings: https://github.com/reactwg/react-18/discussions/102
global.jest = null;
global.IS_REACT_ACT_ENVIRONMENT = true;

createDOM();
require('./init');

testingLibrary.configure({
  // JSDOM logs errors otherwise on `getComputedStyle(element, pseudoElement)` calls.
  computedStyleSupportsPseudoElements: false,
});

const mochaHooks = createMochaHooks(Mocha);

module.exports = { mochaHooks };
