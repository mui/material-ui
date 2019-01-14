import { assert } from 'chai';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import spacing from './spacing';

describe('spacing', () => {
  describe('themeTransformer', () => {
    it('should have a default unit value', () => {
      const output = spacing({
        theme: {},
        p: 1,
      });
      assert.deepEqual(output, { padding: 8 });
    });

    it('should be able to customize the unit value', () => {
      const output1 = spacing({
        theme: {
          spacing: 2,
        },
        p: 2,
      });
      assert.deepEqual(output1, { padding: 4 });

      const output2 = spacing({
        theme: {
          spacing: [0, 3, 5, 8, 13, 21], // Fibonacci
        },
        p: 1,
      });
      assert.deepEqual(output2, { padding: 3 });

      const output3 = spacing({
        theme: {
          spacing: x => x ** 2,
        },
        p: 2,
      });
      assert.deepEqual(output3, { padding: 4 });
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should warn if the value overflow', () => {
      const output = spacing({
        theme: {
          spacing: [0, 3, 5],
        },
        p: 3,
      });
      assert.deepEqual(output, { padding: undefined });
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.match(consoleErrorMock.args()[0][0], /the value provided \(3\) overflows\./);
      assert.match(consoleErrorMock.args()[0][0], /The supported values are: \[0,3,5\]\./);
      assert.match(consoleErrorMock.args()[0][0], /3 > 2, you need to add the missing values\./);
    });

    it('should warn if the theme transformer is invalid', () => {
      const output = spacing({
        theme: {
          spacing: {},
        },
        p: 3,
      });
      assert.deepEqual(output, { padding: undefined });
      assert.strictEqual(consoleErrorMock.callCount(), 1);
      assert.match(
        consoleErrorMock.args()[0][0],
        /the `theme.spacing` value \(\[object Object\]\) is invalid\./,
      );
      assert.match(
        consoleErrorMock.args()[0][0],
        /It should be a number, an array or a function\./,
      );
    });
  });

  it('should support negative values', () => {
    const output = spacing({
      theme: {},
      p: -1,
    });
    assert.deepEqual(output, { padding: -8 });
  });

  it('should support composes values', () => {
    const output = spacing({
      theme: {},
      px: 1,
    });
    assert.deepEqual(output, {
      paddingLeft: 8,
      paddingRight: 8,
    });
  });

  it('should support string', () => {
    const output = spacing({
      theme: {
        spacing: ['1em', '2em'],
      },
      p: -1,
    });
    assert.deepEqual(output, { padding: '-2em' });
  });

  it('should support breakpoints', () => {
    const output1 = spacing({
      theme: {},
      p: [1, 2],
    });
    assert.deepEqual(output1, {
      '@media (min-width:0px)': {
        padding: 8,
      },
      '@media (min-width:600px)': {
        padding: 16,
      },
    });

    const output2 = spacing({
      theme: {},
      p: {
        xs: 1,
        sm: 2,
      },
    });
    assert.deepEqual(output2, {
      '@media (min-width:0px)': {
        padding: 8,
      },
      '@media (min-width:600px)': {
        padding: 16,
      },
    });

    // const output3 = spacing({
    //   theme: {},
    //   p: 1,
    //   sm: {
    //     p: 2,
    //   },
    // });
    // assert.deepEqual(output3, {
    //   padding: 8,
    //   '@media (min-width:600px)': {
    //     padding: 16,
    //   },
    // });
  });

  it('should support full version', () => {
    const output = spacing({
      theme: {},
      paddingTop: 1,
    });
    assert.deepEqual(output, {
      paddingTop: 8,
    });
  });

  it('should support string values', () => {
    const output = spacing({
      theme: {},
      pt: '10px',
    });
    assert.deepEqual(output, {
      paddingTop: '10px',
    });
  });
});
