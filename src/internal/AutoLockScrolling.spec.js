/* eslint-env mocha */
import {assert} from 'chai';
import AutoLockScrolling from './AutoLockScrolling';

describe('<AutoLockScrolling />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(AutoLockScrolling.displayName, 'AutoLockScrolling');
  });
});
