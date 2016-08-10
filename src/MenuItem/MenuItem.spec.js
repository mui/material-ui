/* eslint-env mocha */
import {assert} from 'chai';
import MenuItem from './MenuItem';

describe('<MenuItem />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(MenuItem.displayName, 'MenuItem');
  });
});
