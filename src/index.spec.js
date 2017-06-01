// @flow weak
/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */

import { assert } from 'chai';
import * as MaterialUI from './index';

describe('Material-UI', () => {
  it('should have exports', () => assert.ok(MaterialUI));

  it('should not do undefined exports', () => {
    Object.keys(MaterialUI).forEach(exportKey => assert.ok(MaterialUI[exportKey]));
  });
});
