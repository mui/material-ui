/* eslint-env mocha */
import {assert} from 'chai';
import ToolbarSeparator from './ToolbarSeparator';

describe('<ToolbarSeparator />', () => {
  it('should have the correct displayName', () => {
    assert.strictEqual(ToolbarSeparator.displayName, 'ToolbarSeparator');
  });
});
