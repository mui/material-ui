/* eslint import/namespace: ['error', { allowComputed: true }] */
/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */

import { assert } from 'chai';
import * as MaterialUI from './index';

describe('@material-ui/lab', () => {
  it('should have exports', () => {
    assert.strictEqual(typeof MaterialUI, 'object');
  });

  it('should not do undefined exports', () => {
    Object.keys(MaterialUI).forEach(exportKey =>
      assert.strictEqual(Boolean(MaterialUI[exportKey]), true),
    );
  });
});
