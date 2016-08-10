/* eslint-env mocha */
import {assert} from 'chai';
import InkBar from './InkBar';

describe('<InkBar />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(InkBar.displayName, 'InkBar');
  });
});
