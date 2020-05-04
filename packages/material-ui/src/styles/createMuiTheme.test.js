import { expect } from 'chai';
import createMuiTheme from './createMuiTheme';
import { deepOrange, green } from '../colors';
import consoleErrorMock from 'test/utils/consoleErrorMock';

describe('createMuiTheme', () => {
  it('should have a palette', () => {
    const muiTheme = createMuiTheme();
    expect(typeof createMuiTheme).to.equal('function');
    expect(typeof muiTheme.palette).to.equal('object');
  });

  it('should have the custom palette', () => {
    const muiTheme = createMuiTheme({
      palette: { primary: { main: deepOrange[500] }, secondary: { main: green.A400 } },
    });
    expect(muiTheme.palette.primary.main).to.equal(deepOrange[500]);
    expect(muiTheme.palette.secondary.main).to.equal(green.A400);
  });

  it('should allow providing a partial structure', () => {
    const muiTheme = createMuiTheme({ transitions: { duration: { shortest: 150 } } });
    expect(muiTheme.transitions.duration.shorter).to.not.equal(undefined);
  });

  it('should use the defined spacing for the gutters mixin', () => {
    const spacing = 100;
    const muiTheme = createMuiTheme({ spacing });
    expect(muiTheme.mixins.gutters().paddingLeft).to.equal(spacing * 2);
  });

  describe('shadows', () => {
    it('should provide the default array', () => {
      const muiTheme = createMuiTheme();
      expect(muiTheme.shadows[2]).to.equal(
        '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
      );
    });

    it('should override the array as expected', () => {
      const shadows = [
        'none',
        1,
        1,
        1,
        2,
        3,
        3,
        4,
        5,
        5,
        6,
        6,
        7,
        7,
        7,
        8,
        8,
        8,
        9,
        9,
        10,
        10,
        10,
        11,
        11,
      ];
      const muiTheme = createMuiTheme({ shadows });
      expect(muiTheme.shadows).to.equal(shadows);
    });
  });

  describe('props', () => {
    it('should have the props as expected', () => {
      const props = {
        MuiDialog: {
          fullScreen: true,
          fullWidth: false,
        },
        MuiButtonBase: {
          disableRipple: true,
        },
        MuiPopover: {
          container: document.createElement('div'),
        },
      };
      const muiTheme = createMuiTheme({ props });
      expect(muiTheme.props).to.deep.equal(props);
    });
  });

  describe('overrides', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('should warn when trying to override an internal state the wrong way', () => {
      let theme;

      theme = createMuiTheme({ overrides: { Button: { disabled: { color: 'blue' } } } });
      expect(Object.keys(theme.overrides.Button.disabled).length).to.equal(1);
      expect(consoleErrorMock.messages().length).to.equal(0);
      theme = createMuiTheme({ overrides: { MuiButton: { root: { color: 'blue' } } } });
      expect(consoleErrorMock.messages().length).to.equal(0);
      theme = createMuiTheme({ overrides: { MuiButton: { disabled: { color: 'blue' } } } });
      expect(Object.keys(theme.overrides.MuiButton.disabled).length).to.equal(0);
      expect(consoleErrorMock.messages().length).to.equal(1);
      expect(consoleErrorMock.messages()[0]).to.match(
        /Material-UI: The `MuiButton` component increases the CSS specificity of the `disabled` internal state./,
      );
    });
  });

  it('shallow merges multiple arguments', () => {
    const muiTheme = createMuiTheme({ foo: 'I am foo' }, { bar: 'I am bar' });
    expect(muiTheme.foo).to.equal('I am foo');
    expect(muiTheme.bar).to.equal('I am bar');
  });

  it('deep merges multiple arguments', () => {
    const muiTheme = createMuiTheme(
      { custom: { foo: 'I am foo' } },
      { custom: { bar: 'I am bar' } },
    );
    expect(muiTheme.custom.foo).to.equal('I am foo');
    expect(muiTheme.custom.bar).to.equal('I am bar');
  });
});
