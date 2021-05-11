import { expect } from 'chai';
import styled from './index';

describe('styled', () => {
  it('should help debug wrong args', () => {
    expect(() => {
      styled('span')();
    }).toErrorDev(
      'Material-UI: Seems like you called `styled("span")()` without a `style` argument',
    );

    expect(() => {
      styled('span')(undefined, { color: 'red' });
    }).toErrorDev(
      'Material-UI: the styled("span")(...args) API requires all its args to be defined',
    );
  });
});
