import { expect } from 'chai';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import spacing from './spacing';

describe('spacing', () => {
  describe('themeTransformer', () => {
    it('should have a default unit value', () => {
      const output = spacing({
        theme: {},
        p: 1,
      });
      expect(output).to.deep.equal({ padding: 8 });
    });

    it('should be able to customize the unit value', () => {
      const output1 = spacing({
        theme: {
          spacing: 2,
        },
        p: 2,
      });
      expect(output1).to.deep.equal({ padding: 4 });

      const output2 = spacing({
        theme: {
          spacing: [0, 3, 5, 8, 13, 21], // Fibonacci
        },
        p: 1,
      });
      expect(output2).to.deep.equal({ padding: 3 });

      const output3 = spacing({
        theme: {
          spacing: (x) => x ** 2,
        },
        p: 2,
      });
      expect(output3).to.deep.equal({ padding: 4 });
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
      expect(output).to.deep.equal({ padding: undefined });
      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.match(
        /Material-UI: The value provided \(3\) overflows\./,
      );
      expect(consoleErrorMock.messages()[0]).to.match(/The supported values are: \[0,3,5\]\./);
      expect(consoleErrorMock.messages()[0]).to.match(
        /3 > 2, you need to add the missing values\./,
      );
    });

    it('should warn if the theme transformer is invalid', () => {
      const output = spacing({
        theme: {
          spacing: {},
        },
        p: 3,
      });
      expect(output).to.deep.equal({ padding: undefined });
      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.match(
        /Material-UI: The `theme.spacing` value \(\[object Object\]\) is invalid\./,
      );
      expect(consoleErrorMock.messages()[0]).to.match(
        /It should be a number, an array or a function\./,
      );
    });
  });

  it('should support negative values', () => {
    const output = spacing({
      theme: {},
      p: -1,
    });
    expect(output).to.deep.equal({ padding: -8 });
  });

  it('should support composes values', () => {
    const output = spacing({
      theme: {},
      px: 1,
    });
    expect(output).to.deep.equal({
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
    expect(output).to.deep.equal({ padding: '-2em' });
  });

  it('should support breakpoints', () => {
    const output1 = spacing({
      theme: {},
      p: [1, 2],
    });
    expect(output1).to.deep.equal({
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
    expect(output2).to.deep.equal({
      '@media (min-width:0px)': {
        padding: 8,
      },
      '@media (min-width:600px)': {
        padding: 16,
      },
    });
  });

  it('should support full version', () => {
    const output1 = spacing({
      theme: {},
      paddingTop: 1,
    });
    expect(output1).to.deep.equal({
      paddingTop: 8,
    });
    const output2 = spacing({
      theme: {},
      paddingY: 1,
    });
    expect(output2).to.deep.equal({
      paddingBottom: 8,
      paddingTop: 8,
    });
  });

  it('should support string values', () => {
    const output = spacing({
      theme: {},
      pt: '10px',
    });
    expect(output).to.deep.equal({
      paddingTop: '10px',
    });
  });
});
