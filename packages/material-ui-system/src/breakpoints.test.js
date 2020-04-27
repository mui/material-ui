import { expect } from 'chai';
import breakpoints from './breakpoints';
import style from './style';

const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

describe('breakpoints', () => {
  it('should work', () => {
    const palette = breakpoints(textColor);

    expect(palette.filterProps.length).to.equal(6);
    expect(
      palette({
        theme: {},
        color: 'red',
        sm: {
          color: 'blue',
        },
      }),
    ).to.deep.equal({
      color: 'red',
      '@media (min-width:600px)': {
        color: 'blue',
      },
    });
  });
});
