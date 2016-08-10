/* eslint-env mocha */
import {assert} from 'chai';
import NestedList from './NestedList';

describe('<NestedList />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(NestedList.displayName, 'NestedList');
  });
});
