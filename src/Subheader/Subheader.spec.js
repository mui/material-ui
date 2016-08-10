/* eslint-env mocha */
import {assert} from 'chai';
import Subheader from './Subheader';

describe('<Subheader />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(Subheader.displayName, 'Subheader');
  });
});
