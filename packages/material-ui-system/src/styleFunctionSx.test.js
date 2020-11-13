import { expect } from 'chai';
import { consoleWarnMock } from 'test/utils/consoleErrorMock';
import styleFunctionSx, { css } from './styleFunctionSx';
import style from './style';

const textColor = style({
  prop: 'color',
  themeKey: 'palette',
});

describe('styleFunctionSx', () => {
  beforeEach(() => {
    consoleWarnMock.spy();
  });

  afterEach(() => {
    consoleWarnMock.reset();
  });

  it('should work', () => {
    const palette = styleFunctionSx(textColor);

    expect(palette.filterProps.length).to.equal(3);
    expect(
      palette({
        theme: {},
        sx: {
          color: 'red',
          padding: 10,
        },
      }),
    ).to.deep.equal({
      padding: 10,
      color: 'red',
    });
  });

  it('should warn if deprecated css is used', () => {
    css(textColor);

    expect(consoleWarnMock.callCount()).to.equal(1);
    expect(consoleWarnMock.messages()[0]).to.include(
      'Material-UI: The `css` function is deprecated. Use the `styleFunctionSx` instead.',
    );
  });
});
