import { assert } from 'chai';
import compose from './compose';
import style from './style';

const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

const bgColor = style({
  prop: 'bg',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
});

describe('compose', () => {
  it('should compose', () => {
    const palette = compose(
      textColor,
      bgColor,
    );

    assert.strictEqual(palette.filterProps.length, 2);
    assert.deepEqual(
      palette({
        theme: {},
        color: 'red',
        bg: 'gree',
      }),
      {
        backgroundColor: 'gree',
        color: 'red',
      },
    );
  });
});
