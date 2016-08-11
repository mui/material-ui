/* eslint-env mocha */
import {assert} from 'chai';
import ToolbarGroup from './ToolbarGroup';

describe('<ToolbarGroup />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(ToolbarGroup.displayName, 'ToolbarGroup');
  });
});
