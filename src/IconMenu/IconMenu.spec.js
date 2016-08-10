/* eslint-env mocha */
import {assert} from 'chai';
import IconMenu from './IconMenu';

describe('<IconMenu />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(IconMenu.displayName, 'IconMenu');
  });
});
