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
      palette: { primary: deepOrange, secondary: green },
    });
    assert.strictEqual(muiTheme.palette.primary, deepOrange, 'should have a palette');
  });

  it('should allow providing a partial structure', () => {
    const muiTheme = createMuiTheme({
      transitions: {
        duration: {
          shortest: 150,
        },
      },
    });
    assert.notStrictEqual(muiTheme.transitions.duration.shorter, undefined);
  });
});
