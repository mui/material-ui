import { assert } from 'chai';
import hasValue from './hasValue';

describe('<ToggleButton /> hasValue', () => {
  it('should be true for a scalar value', () => {
    assert.strictEqual(hasValue('yep'), true);
  });

  it('should be true for a non-empty array', () => {
    assert.strictEqual(hasValue(['got one']), true);
  });

  it('should be false for an empty array', () => {
    assert.strictEqual(hasValue([]), false);
  });

  it('should be false for undefined', () => {
    assert.strictEqual(hasValue(undefined), false);
  });

  it('should be false for null', () => {
    assert.strictEqual(hasValue(null), false);
  });
});
