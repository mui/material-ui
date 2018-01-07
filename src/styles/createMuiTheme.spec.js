// @flow

import { assert } from 'chai';
import createMuiTheme from './createMuiTheme';
import { deepOrange, green } from '../colors';

describe('createMuiTheme', () => {
  it('should have a palette', () => {
    const muiTheme = createMuiTheme();
    assert.strictEqual(typeof createMuiTheme, 'function', 'should be a function');
    assert.ok(muiTheme.palette, 'should have a palette');
  });

  it('should have the custom palette', () => {
    const muiTheme = createMuiTheme({
      palette: { primary: { main: deepOrange[500] }, secondary: { main: green.A400 } },
    });
    assert.strictEqual(muiTheme.palette.primary.main, deepOrange[500], 'should have a palette');
    assert.strictEqual(muiTheme.palette.secondary.main, green.A400, 'should have a palette');
  });

  it('should allow providing a partial structure', () => {
    const muiTheme = createMuiTheme({ transitions: { duration: { shortest: 150 } } });
    assert.notStrictEqual(muiTheme.transitions.duration.shorter, undefined);
  });

  describe('shadows', () => {
    it('should provide the default array', () => {
      const muiTheme = createMuiTheme();
      assert.strictEqual(
        muiTheme.shadows[2],
        '0px 1px 5px 0px rgba(0, 0, 0, 0.2),' +
          '0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 3px 1px -2px rgba(0, 0, 0, 0.12)',
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
});
