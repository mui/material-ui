/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */
import { expect } from 'chai';
import * as materialNext from './index';

describe('@mui/material-next', () => {
  it('should have exports', () => {
    expect(typeof materialNext).to.equal('object');
  });

  it('should not have undefined exports', () => {
    Object.keys(materialNext).forEach((exportKey) =>
      expect(Boolean(materialNext[exportKey])).to.equal(true),
    );
  });
});
