/* eslint-env mocha */
import {assert} from 'chai';
import ClockMinutes from './ClockMinutes';

describe('<ClockMinutes />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(ClockMinutes.displayName, 'ClockMinutes');
  });
});
