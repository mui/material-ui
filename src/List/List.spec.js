/* eslint-env mocha */
import {assert} from 'chai';
import List from './List';

describe('<List />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(List.displayName, 'List');
  });
});
