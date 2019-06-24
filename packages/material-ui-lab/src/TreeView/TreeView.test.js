import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount } from '@material-ui/core/test-utils';
import TreeView from './TreeView';
import TreeNode from '../TreeNode';

describe('<TreeView />', () => {
  let mount;

  before(() => {
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  describe('onNodeToggle', () => {
    it('should be called when a parent node is clicked', () => {
      const handleNodeToggle = spy();

      const wrapper = mount(
        <TreeView onNodeToggle={handleNodeToggle}>
          <TreeNode nodeId="1">
            <TreeNode nodeId="2" />
          </TreeNode>
        </TreeView>,
      );

      wrapper
        .find('[role="treeitem"] > *')
        .at(0)
        .simulate('click');

      assert.strictEqual(handleNodeToggle.callCount, 1);
      assert.strictEqual(handleNodeToggle.args[0][0], '1');
      assert.strictEqual(handleNodeToggle.args[0][1], true);
    });
  });

  describe('Accessibility', () => {
    it('(TreeView) should have the role `tree`', () => {
      const wrapper = mount(<TreeView />);

      assert.strictEqual(wrapper.find('[role="tree"]').exists(), true);
    });
  });
});
