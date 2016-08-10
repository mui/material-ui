/* eslint-env mocha */
import {assert} from 'chai';
import ClockPointer from './ClockPointer';

describe('<ClockPointer />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(ClockPointer.displayName, 'ClockPointer');
  });
});
