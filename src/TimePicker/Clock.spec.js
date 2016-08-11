/* eslint-env mocha */
import {assert} from 'chai';
import Clock from './Clock';

describe('<Clock />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(Clock.displayName, 'Clock');
  });
});
