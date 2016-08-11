/* eslint-env mocha */
import {assert} from 'chai';
import Drawer from './Drawer';

describe('<Drawer />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(Drawer.displayName, 'Drawer');
  });
});
