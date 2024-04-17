import { configure } from '@testing-library/dom';
import mocha from 'mocha';
import createDOM from './createDOM';
import { createMochaHooks } from './mochaHooks';
import './init';

// Enable missing act warnings: https://github.com/reactwg/react-18/discussions/102
// @ts-ignore
global.jest = null;
// @ts-ignore
global.IS_REACT_ACT_ENVIRONMENT = true;

createDOM();

configure({
  // JSDOM logs errors otherwise on `getComputedStyle(element, pseudoElement)` calls.
  computedStyleSupportsPseudoElements: false,
});

export default createMochaHooks(mocha);
