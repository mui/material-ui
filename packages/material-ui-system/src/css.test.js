import { assert } from 'chai';
import css from './css';
import style from './style';
import display from './display';
import compose from './compose';

const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

const testBreakpoints = {
  keys: ['sm', 'md', 'lg'],
  up: key => `@media (min-width: ${key} width)`,
};

describe('css', () => {
  it('should work', () => {
    const palette = css(textColor);

    assert.strictEqual(palette.filterProps.length, 2);
    assert.deepEqual(
      palette({
        theme: {
          breakpoints: testBreakpoints,
        },
        css: {
          color: 'red',
          padding: 10,
        },
      }),
      {
        padding: 10,
        color: 'red',
      },
    );
  });

  it('should order the css correctly, irrespective of compose order', () => {
    const palette = css(
      compose(
        display,
        textColor,
      ),
    );
    const output = palette({
      theme: {
        breakpoints: testBreakpoints,
      },
      color: { sm: 'white', md: 'red' },
      display: { md: 'flex' },
    });
    assert.deepEqual(Object.keys(output), ['@media (min-width: sm width)', '@media (min-width: md width)']);
  });

  it('should order the css correctly, irrespective of prop order', () => {
    const palette = css(
      compose(
        textColor,
        display,
      ),
    );
    const output = palette({
      theme: {
        breakpoints: testBreakpoints,
      },
      color: { md: 'white', sm: 'red' },
      display: { md: 'flex' },
    });
    assert.deepEqual(Object.keys(output), ['@media (min-width: sm width)', '@media (min-width: md width)']);
  });
});
