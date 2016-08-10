/* eslint-env mocha */
import {assert} from 'chai';
import RefreshIndicator from './RefreshIndicator';

describe('<RefreshIndicator />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(RefreshIndicator.displayName, 'RefreshIndicator');
  });
});
