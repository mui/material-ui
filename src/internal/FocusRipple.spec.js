/* eslint-env mocha */
import {assert} from 'chai';
import FocusRipple from './FocusRipple';

describe('<FocusRipple />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(FocusRipple.displayName, 'FocusRipple');
  });
});
