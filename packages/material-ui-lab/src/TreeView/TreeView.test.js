import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { cleanup, createClientRender, fireEvent } from 'test/utils/createClientRender';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import TreeView from './TreeView';
import TreeNode from '../TreeNode';

describe('<TreeView />', () => {
  const render = createClientRender({ strict: false });
  const mount = createMount({ strict: false });
  const classes = getClasses(<TreeView />);

  afterEach(() => {
    cleanup();
  });

  describeConformance(<TreeView />, () => ({
    classes,
    inheritComponent: 'ul',
    mount,
    refInstanceof: window.HTMLUListElement,
    skip: ['componentProp'],
    after: () => mount.cleanUp(),
  }));

  describe('onNodeToggle', () => {
    it('should be called when a parent node is clicked', () => {
      const handleNodeToggle = spy();

      const { getByText } = render(
        <TreeView onNodeToggle={handleNodeToggle}>
          <TreeNode nodeId="1" label="outer">
            <TreeNode nodeId="2" label="inner" />
          </TreeNode>
        </TreeView>,
      );

      fireEvent.click(getByText('outer'));

      expect(handleNodeToggle.callCount).to.equal(1);
      expect(handleNodeToggle.args[0][0]).to.equal('1');
      expect(handleNodeToggle.args[0][1]).to.equal(true);
    });
  });

  describe('Accessibility', () => {
    it('(TreeView) should have the role `tree`', () => {
      const { container } = render(<TreeView />);

      expect(container.querySelector('[role="tree"]')).to.be.ok;
    });
  });
});
