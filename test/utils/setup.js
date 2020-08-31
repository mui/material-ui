const testingLibrary = require('@testing-library/dom');
const createDOM = require('./createDOM');

process.browser = true;

createDOM();
require('./init');

testingLibrary.configure({
  // JSDOM logs errors otherwise on `getComputedStyles(element, pseudoElement)` calls.
  computedStyleSupportsPseudoElements: false,
});
