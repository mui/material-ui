import { expect } from 'chai';
import css from './css';
import style from './style';

const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

describe('css', () => {
  it('should work', () => {
    const palette = css(textColor);

    expect(palette.filterProps.length).to.equal(2);
    expect(
      palette({
        theme: {},
        css: {
          color: 'red',
          padding: 10,
        },
      }),
    ).to.deep.equal({
      padding: 10,
      color: 'red',
    });
  });
});
