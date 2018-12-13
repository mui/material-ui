import { assert } from 'chai';
import { createStyles } from '.';

describe('createStyles', () => {
  it('is the identity function', () => {
    const styles = {};
    assert.strictEqual(createStyles(styles), styles);
  });
});
