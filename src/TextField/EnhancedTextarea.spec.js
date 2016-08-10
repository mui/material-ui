/* eslint-env mocha */
import {assert} from 'chai';
import EnhancedTextarea from './EnhancedTextarea';

describe('<EnhancedTextarea />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(EnhancedTextarea.displayName, 'EnhancedTextarea');
  });
});
