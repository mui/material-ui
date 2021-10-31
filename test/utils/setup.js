const testingLibrary = require('@testing-library/dom');
const createDOM = require('./createDOM');

createDOM();
require('./init');

testingLibrary.configure({
  // JSDOM logs errors otherwise on `getComputedStyles(element, pseudoElement)` calls.
  computedStyleSupportsPseudoElements: false,
});
