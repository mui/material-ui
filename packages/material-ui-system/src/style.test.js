import { assert } from 'chai';
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
    assert.deepEqual(output, {
      backgroundColor: 'blue',
    });
  });

  it('should support breakpoints', () => {
    const output1 = bgcolor({
      theme: {},
      bgcolor: ['blue', 'red'],
    });
    assert.deepEqual(output1, {
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
    assert.deepEqual(output2, {
      '@media (min-width:0px)': {
        backgroundColor: 'blue',
      },
      '@media (min-width:600px)': {
        backgroundColor: 'red',
      },
    });

    // const output3 = bgcolor({
    //   theme: {},
    //   bgcolor: 'blue',
    //   sm: {
    //     bgcolor: 'red',
    //   },
    // });
    // assert.deepEqual(output3, {
    //   backgroundColor: 'blue',
    //   '@media (min-width:600px)': {
    //     backgroundColor: 'red',
    //   },
    // });
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

    assert.deepEqual(output, {
      boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2)',
    });
  });

  const border = style({
    prop: 'border',
    themeKey: 'borders',
    transform: value => (typeof value === 'number' && value > 0 ? `${value}px solid` : value),
  });

  it('should transform the property correctly', () => {
    const output1 = border({
      theme: {},
      border: 1,
    });
    assert.deepEqual(output1, {
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
    assert.deepEqual(output2, {
      border: '2px solid',
    });

    const output3 = border({
      theme: {
        borders: value => `${value ** 2}px solid`,
      },
      border: 2,
    });
    assert.deepEqual(output3, {
      border: '4px solid',
    });
  });
});
