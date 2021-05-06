import { expect } from 'chai';
import styled from './index';

describe('styled', () => {
  it('should help debug wrong args', () => {
    expect(() => {
      expect(() => {
        styled('span')();
      }).to.throw("Cannot read property 'length' of undefined");
    }).toErrorDev('Material-UI: the styled("div")(style) API requires the style to be provided');

    expect(() => {
      expect(() => {
        styled('span')(undefined, { color: 'red' });
      }).to.throw("Cannot read property '0' of undefined");
    }).toErrorDev(
      'Material-UI: the styled("div")(...args) API requires all its args to be defined',
    );
  });
});
