/* eslint-env mocha */
import {assert} from 'chai';
import ClearFix from './ClearFix';

describe('<ClearFix />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(ClearFix.displayName, 'ClearFix');
  });
});
