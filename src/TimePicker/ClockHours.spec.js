/* eslint-env mocha */
import {assert} from 'chai';
import ClockHours from './ClockHours';

describe('<ClockHours />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(ClockHours.displayName, 'ClockHours');
  });
});
