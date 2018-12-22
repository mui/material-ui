import { assert } from 'chai';
import css from './css';
import style from './style';

const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

describe('css', () => {
  it('should work', () => {
    const palette = css(textColor);

    assert.strictEqual(palette.filterProps.length, 2);
    assert.deepEqual(
      palette({
        theme: {},
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
});
