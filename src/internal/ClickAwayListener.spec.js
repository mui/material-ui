/* eslint-env mocha */
import {assert} from 'chai';
import ClickAwayListener from './ClickAwayListener';

describe('<ClickAwayListener />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(ClickAwayListener.displayName, 'ClickAwayListener');
  });
});
