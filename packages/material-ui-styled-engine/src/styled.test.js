import { expect } from 'chai';
import styled from './index';

describe('styled', () => {
  it('should help debug wrong args', () => {
    expect(() => {
      styled('span')();
    }).toErrorDev('Material-UI: the styled("div")(style) API requires the style to be provided');

    expect(() => {
      styled('span')(undefined, { color: 'red' });
    }).toErrorDev(
      'Material-UI: the styled("div")(...args) API requires all its args to be defined',
    );
  });
});
