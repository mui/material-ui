/* eslint-env mocha */
import {assert} from 'chai';
import Popover from './Popover';

describe('<Popover />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(Popover.displayName, 'Popover');
  });
});
