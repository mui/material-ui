/* eslint-env mocha */
import {assert} from 'chai';
import EnhancedSwitch from './EnhancedSwitch';

describe('<EnhancedSwitch />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(EnhancedSwitch.displayName, 'EnhancedSwitch');
  });
});
