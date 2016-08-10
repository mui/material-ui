/* eslint-env mocha */
import {assert} from 'chai';
import Toolbar from './Toolbar';

describe('<Toolbar />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(Toolbar.displayName, 'Toolbar');
  });
});
