import { expect } from 'chai';
import styled from './index';

describe('styled', () => {
  it('should help debug wrong args', () => {
    expect(() => {
      expect(() => {
        styled('span')();
        // Error message changes between browsers.
        // It's not relevant to the test anyway.
      }).to.throw();
    }).toErrorDev(
      'Material-UI: Seems like you called `styled("span")()` without a `style` argument',
    );

    expect(() => {
      expect(() => {
        styled('span')(undefined, { color: 'red' });
        // Error message changes between browsers.
        // It's not relevant to the test anyway.
      }).to.throw();
    }).toErrorDev(
      'Material-UI: the styled("span")(...args) API requires all its args to be defined',
    );
  });
});
