import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { createMount } from '@material-ui/core/test-utils';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import TreeNode from './TreeNode';
import TreeView from '../TreeView';

describe('<TreeNode />', () => {
  let mount;
  const defaultProps = {
    nodeId: 'node1',
  };

  before(() => {
    mount = createMount({ strict: false });
  });

  after(() => {
    mount.cleanUp();
  });

  describe('console errors', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('should error if not rendered inside `TreeView`', () => {
      mount(<TreeNode {...defaultProps} />);
      assert.strictEqual(consoleErrorMock.callCount(), 1, 'should call console.error');
      assert.match(
        consoleErrorMock.args()[0][0],
        /Material-UI: A `TreeNode` must be rendered inside a `TreeView`./,
      );
    });
  });

  it('should call onClick when clicked', () => {
    const handleClick = spy();

    const wrapper = mount(
      <TreeView>
        <TreeNode nodeId="test" label="test" onClick={handleClick} />
      </TreeView>,
    );

    wrapper.find('[role="treeitem"] > *').simulate('click');

    assert.strictEqual(handleClick.callCount, 1);
  });

  it('should call onFocus when focused', () => {
    const handleFocus = spy();

    const wrapper = mount(
      <TreeView>
        <TreeNode nodeId="test" label="test" onFocus={handleFocus} />
      </TreeView>,
    );

    wrapper.find('[role="treeitem"]').simulate('focus');

    assert.strictEqual(handleFocus.callCount, 2);
  });

  it('should call onKeyDown when clicked', () => {
    const handleKeyDown = spy();

    const wrapper = mount(
      <TreeView>
        <TreeNode nodeId="test" label="test" onKeyDown={handleKeyDown} />
      </TreeView>,
    );

    wrapper.find('[role="treeitem"]').simulate('keydown', { key: 'Enter' });

    assert.strictEqual(handleKeyDown.callCount, 1);
  });

  describe('Accessibility', () => {
    it('should have the role `treeitem`', () => {
      const wrapper = mount(
        <TreeView>
          <TreeNode nodeId="test" label="test" />
        </TreeView>,
      );

      assert.strictEqual(wrapper.find('[role="treeitem"]').exists(), true);
    });

    it('should add the role `group` to a `ul` component if it has children', () => {
      const wrapper = mount(
        <TreeView>
          <TreeNode nodeId="test" label="test">
            <TreeNode nodeId="test2" label="test" />
          </TreeNode>
        </TreeView>,
      );

      assert.strictEqual(wrapper.find('ul[role="group"]').exists(), true);
    });

    it('should have the attribute `aria-expanded=false` if collapsed', () => {
      const wrapper = mount(
        <TreeView>
          <TreeNode nodeId="test" label="test">
            <TreeNode nodeId="test2" label="test" />
          </TreeNode>
        </TreeView>,
      );

      assert.strictEqual(wrapper.find('[aria-expanded=false]').exists(), true);
    });

    it('should have the attribute `aria-expanded=true` if expanded', () => {
      const wrapper = mount(
        <TreeView expanded={["test"]} >
          <TreeNode nodeId="test" label="test">
            <TreeNode nodeId="test2" label="test" />
          </TreeNode>
        </TreeView>,
      );

      assert.strictEqual(wrapper.find('[aria-expanded=true]').exists(), true);
    });

  });
});
