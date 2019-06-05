import { assert } from 'chai';
import createMuiTheme from './createMuiTheme';
import { deepOrange, green } from '../colors';
import consoleErrorMock from 'test/utils/consoleErrorMock';

describe('createMuiTheme', () => {
  it('should have a palette', () => {
    const muiTheme = createMuiTheme();
    assert.strictEqual(typeof createMuiTheme, 'function');
    assert.strictEqual(typeof muiTheme.palette, 'object');
  });

  it('should have the custom palette', () => {
    const muiTheme = createMuiTheme({
      palette: { primary: { main: deepOrange[500] }, secondary: { main: green.A400 } },
    });
    assert.strictEqual(muiTheme.palette.primary.main, deepOrange[500]);
    assert.strictEqual(muiTheme.palette.secondary.main, green.A400);
  });

  it('should allow providing a partial structure', () => {
    const muiTheme = createMuiTheme({ transitions: { duration: { shortest: 150 } } });
    assert.notStrictEqual(muiTheme.transitions.duration.shorter, undefined);
  });

  it('should use the defined spacing for the gutters mixin', () => {
    const spacing = 100;
    const muiTheme = createMuiTheme({ spacing });
    assert.strictEqual(muiTheme.mixins.gutters().paddingLeft, spacing * 2);
  });

  describe('shadows', () => {
    it('should provide the default array', () => {
      const muiTheme = createMuiTheme();
      assert.strictEqual(
        muiTheme.shadows[2],
        '0px 1px 5px 0px rgba(0,0,0,0.2),' +
          '0px 2px 2px 0px rgba(0,0,0,0.14),0px 3px 1px -2px rgba(0,0,0,0.12)',
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
      assert.strictEqual(muiTheme.shadows, shadows);
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
      assert.deepEqual(muiTheme.props, props);
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
      assert.strictEqual(Object.keys(theme.overrides.Button.disabled).length, 1);
      assert.strictEqual(consoleErrorMock.args().length, 0);
      theme = createMuiTheme({ overrides: { MuiButton: { root: { color: 'blue' } } } });
      assert.strictEqual(consoleErrorMock.args().length, 0);
      theme = createMuiTheme({ overrides: { MuiButton: { disabled: { color: 'blue' } } } });
      assert.strictEqual(Object.keys(theme.overrides.MuiButton.disabled).length, 0);
      assert.strictEqual(consoleErrorMock.args().length, 1);
      assert.match(
        consoleErrorMock.args()[0][0],
        /the `MuiButton` component increases the CSS specificity of the `disabled` internal state./,
      );
    });
  });
});
