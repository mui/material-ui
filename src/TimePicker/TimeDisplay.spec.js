/* eslint-env mocha */
import {assert} from 'chai';
import TimeDisplay from './TimeDisplay';

describe('<TimeDisplay />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(TimeDisplay.displayName, 'TimeDisplay');
  });
});
