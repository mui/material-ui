/* eslint-env mocha */
import {assert} from 'chai';
import ToolbarTitle from './ToolbarTitle';

describe('<ToolbarTitle />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(ToolbarTitle.displayName, 'ToolbarTitle');
  });
});
