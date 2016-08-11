/* eslint-env mocha */
import {assert} from 'chai';
import TouchRipple from './TouchRipple';

describe('<TouchRipple />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(TouchRipple.displayName, 'TouchRipple');
  });
});
