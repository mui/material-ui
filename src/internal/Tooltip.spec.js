/* eslint-env mocha */
import {assert} from 'chai';
import Tooltip from './Tooltip';

describe('<Tooltip />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(Tooltip.displayName, 'Tooltip');
  });
});
