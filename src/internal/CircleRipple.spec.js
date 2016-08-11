/* eslint-env mocha */
import {assert} from 'chai';
import CircleRipple from './CircleRipple';

describe('<CircleRipple />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(CircleRipple.displayName, 'CircleRipple');
  });
});
