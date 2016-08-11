/* eslint-env mocha */
import {assert} from 'chai';
import ClockNumber from './ClockNumber';

describe('<ClockNumber />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(ClockNumber.displayName, 'ClockNumber');
  });
});
