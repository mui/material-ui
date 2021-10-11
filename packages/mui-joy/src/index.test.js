/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */

import { expect } from 'chai';
import * as joy from './index';

describe('@mui/joy', () => {
  it('should have exports', () => {
    expect(typeof joy).to.equal('object');
  });

  it('should not have undefined exports', () => {
    Object.keys(joy).forEach((exportKey) => expect(Boolean(joy[exportKey])).to.equal(true));
  });
});
