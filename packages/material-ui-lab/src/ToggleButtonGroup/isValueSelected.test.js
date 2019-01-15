import { assert } from 'chai';
import isValueSelected from './isValueSelected';

describe('<ToggleButton /> isValueSelected', () => {
  it('is false when value is undefined', () => {
    assert.strictEqual(isValueSelected(undefined, [undefined]), false);
  });

  it('is false when candidate is undefined', () => {
    assert.strictEqual(isValueSelected('example', undefined), false);
  });

  describe('non exclusive', () => {
    it('is true if candidate is contained in value', () => {
      assert.strictEqual(isValueSelected('one', ['one']), true);
    });

    it('is false if value is not contained in candidate', () => {
      assert.strictEqual(isValueSelected('one', ['two']), false);
    });

    it('is false if value is loosely contained in candidate', () => {
      assert.strictEqual(isValueSelected('3', [3]), false);
    });
  });

  describe('exclusive', () => {
    it('is true if candidate strictly equals value', () => {
      assert.strictEqual(isValueSelected('one', 'one'), true);
    });

    it('is false if candidate does not equal value', () => {
      assert.strictEqual(isValueSelected('two', 'one'), false);
    });

    it('is false if candidate loosely equals value', () => {
      assert.strictEqual(isValueSelected('3', 3), false);
    });
  });
});
