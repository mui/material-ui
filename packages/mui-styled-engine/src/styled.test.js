import { expect } from 'chai';
import emStyled from '@emotion/styled';
import styled from './index';

describe('styled', () => {
  it('should help debug wrong args', () => {
    expect(() => {
      styled('span')();
    }).toErrorDev('MUI: Seems like you called `styled("span")()` without a `style` argument');

    expect(() => {
      styled('span')(undefined, { color: 'red' });
    }).toErrorDev('MUI: the styled("span")(...args) API requires all its args to be defined');
  });

  it('has primitive', () => {
    expect(styled.div).to.equal(emStyled.div);
  });
});
