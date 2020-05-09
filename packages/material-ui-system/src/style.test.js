import { expect } from 'chai';
import style from './style';

describe('style', () => {
  const bgcolor = style({
    prop: 'bgcolor',
    cssProperty: 'backgroundColor',
    themeKey: 'palette',
  });

  it('should work', () => {
    const output = bgcolor({
      theme: {},
      bgcolor: 'blue',
    });
    expect(output).to.deep.equal({
      backgroundColor: 'blue',
    });
  });

  it('should support breakpoints', () => {
    const output1 = bgcolor({
      theme: {},
      bgcolor: ['blue', 'red'],
    });
    expect(output1).to.deep.equal({
      '@media (min-width:0px)': {
        backgroundColor: 'blue',
      },
      '@media (min-width:600px)': {
        backgroundColor: 'red',
      },
    });

    const output2 = bgcolor({
      theme: {},
      bgcolor: {
        xs: 'blue',
        sm: 'red',
      },
    });
    expect(output2).to.deep.equal({
      '@media (min-width:0px)': {
        backgroundColor: 'blue',
      },
      '@media (min-width:600px)': {
        backgroundColor: 'red',
      },
    });
  });

  const boxShadow = style({
    prop: 'boxShadow',
    themeKey: 'shadows',
  });

  it('should support array theme value', () => {
    const output = boxShadow({
      theme: {
        shadows: ['none', '0px 1px 3px 0px rgba(0, 0, 0, 0.2)'],
      },
      boxShadow: 1,
    });

    expect(output).to.deep.equal({
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2)',
    });
  });

  it('should fallback to value if theme value is an array and index missing', () => {
    const output = boxShadow({
      theme: {
        shadows: ['none'],
      },
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2)',
    });

    expect(output).to.deep.equal({
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2)',
    });
  });

  const border = style({
    prop: 'border',
    themeKey: 'borders',
    transform: (value) => (typeof value === 'number' && value > 0 ? `${value}px solid` : value),
  });

  it('should transform the prop correctly', () => {
    const output1 = border({
      theme: {},
      border: 1,
    });
    expect(output1).to.deep.equal({
      border: '1px solid',
    });

    const output2 = border({
      theme: {
        borders: {
          small: 2,
        },
      },
      border: 'small',
    });
    expect(output2).to.deep.equal({
      border: '2px solid',
    });

    const output3 = border({
      theme: {
        borders: (value) => `${value ** 2}px solid`,
      },
      border: 2,
    });
    expect(output3).to.deep.equal({
      border: '4px solid',
    });
  });
});
