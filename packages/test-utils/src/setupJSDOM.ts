import { configure } from '@testing-library/dom';
import Mocha from 'mocha';
import createDOM from './createDOM';
import { createMochaHooks } from './mochaHooks';

// Enable missing act warnings: https://github.com/reactwg/react-18/discussions/102
// @ts-ignore
global.jest = null;
// @ts-ignore
global.IS_REACT_ACT_ENVIRONMENT = true;

createDOM();
require('./init');

configure({
  // JSDOM logs errors otherwise on `getComputedStyle(element, pseudoElement)` calls.
  computedStyleSupportsPseudoElements: false,
});

export const mochaHooks = createMochaHooks(Mocha);
