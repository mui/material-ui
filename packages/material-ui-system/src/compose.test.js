import { assert } from 'chai';
import compose from './compose';
import style from './style';

const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

const bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
});

describe('compose', () => {
  it('should compose', () => {
    const palette = compose(
      textColor,
      bgcolor,
    );

    assert.strictEqual(palette.filterProps.length, 2);
    assert.deepEqual(
      palette({
        theme: {},
        color: 'red',
        bgcolor: 'gree',
      }),
      {
        backgroundColor: 'gree',
        color: 'red',
      },
    );
  });
});
