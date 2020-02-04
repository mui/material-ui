import { assert } from 'chai';
import breakpoints from './breakpoints';
import style from './style';

const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

describe('breakpoints', () => {
  it('should work', () => {
    const palette = breakpoints(textColor);

    assert.strictEqual(palette.filterProps.length, 6);
    assert.deepEqual(
      palette({
        theme: {},
        color: 'red',
        sm: {
          color: 'blue',
        },
      }),
      {
        color: 'red',
        '@media (min-width:600px)': {
          color: 'blue',
        },
      },
    );
  });
});
