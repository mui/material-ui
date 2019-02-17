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
    spacing = createSpacing(factor => [0, 8, 16][factor]);
    assert.strictEqual(spacing(2), 16);
    spacing = createSpacing(factor => factor ** 2);
    assert.strictEqual(spacing(2), 4);
    spacing = createSpacing(factor => `${0.25 * factor}rem`);
    assert.strictEqual(spacing(2), '0.5rem');
  });

  it('should support recursion', () => {
    const spacing = createSpacing();
    createSpacing(spacing);
  });

  it('should support multiple arguments', () => {
    let spacing;
    spacing = createSpacing();
    assert.strictEqual(spacing(1, 2), '8px 16px');
    spacing = createSpacing(factor => `${0.25 * factor}rem`);
    assert.strictEqual(spacing(1, 2), '0.25rem 0.5rem');
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should warn for the deprecated API', () => {
      const spacing = createSpacing(11);
      assert.strictEqual(spacing.unit, 11);
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(consoleErrorMock.args()[0][0], 'theme.spacing.unit usage has been deprecated');
    });

    it('should warn for wrong input', () => {
      createSpacing({
        unit: 4,
      });
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.include(
        consoleErrorMock.args()[0][0],
        'the `theme.spacing` value ([object Object]) is invalid',
      );
    });
  });
});
