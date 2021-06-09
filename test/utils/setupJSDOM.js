const testingLibrary = require('@testing-library/dom');
const Mocha = require('mocha');
const Module = require('module');
const createDOM = require('./createDOM');
const { createMochaHooks } = require('./mochaHooks');

const requireActual = Module.prototype.require;

Module.prototype.require = function mockRequire(moduleId) {
  if (moduleId === 'scheduler') {
    return requireActual.call(this, 'scheduler/unstable_mock');
  }
  return requireActual.call(this, moduleId);
};

// Enable missing act warnings: https://github.com/facebook/react/blob/v16.13.1/packages/react-reconciler/src/ReactFiberHooks.js#L965
// TODO: Revisit once https://github.com/facebook/react/issues/15439 is resolved.
global.jest = null;

createDOM();
require('./init');

testingLibrary.configure({
  // JSDOM logs errors otherwise on `getComputedStyles(element, pseudoElement)` calls.
  computedStyleSupportsPseudoElements: false,
});

const mochaHooks = createMochaHooks(Mocha);

module.exports = { mochaHooks };
