/* eslint-env mocha */
import {assert} from 'chai';
import Menu from './Menu';

describe('<Menu />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(Menu.displayName, 'Menu');
  });
});
