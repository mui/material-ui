import { assert } from 'chai';
import createSpacing from './createSpacing';
import consoleErrorMock from 'test/utils/consoleErrorMock';

describe('createSpacing', () => {
  it('should work as expected', () => {
    let spacing;
    spacing = createSpacing();
    assert.strictEqual(spacing(1), 8);
    spacing = createSpacing(10);
    assert.strictEqual(spacing(1), 10);
    spacing = createSpacing(value => [0, 8, 16][value]);
    assert.strictEqual(spacing(2), 16);
    spacing = createSpacing(value => value ** 2);
    assert.strictEqual(spacing(2), 4);
  });

  it('should support recursion', () => {
    const spacing = createSpacing();
    createSpacing(spacing);
  });

  describe('v4 deprecation', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('should warn for the deprecated API', () => {
      const spacing = createSpacing(11);
      assert.strictEqual(spacing.unit, 11);
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(consoleErrorMock.args()[0][0], 'theme.spacing.unit usage has been deprecated');
    });
  });
});
