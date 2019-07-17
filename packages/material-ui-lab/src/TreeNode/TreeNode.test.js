import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { cleanup, createClientRender, fireEvent } from 'test/utils/createClientRender';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import TreeNode from './TreeNode';
import TreeView from '../TreeView';

describe('<TreeNode />', () => {
  const render = createClientRender({ strict: false });

  afterEach(() => {
    cleanup();
  });

  it('should call onClick when clicked', () => {
    const handleClick = spy();

    const { getByText } = render(
      <TreeView>
        <TreeNode nodeId="test" label="test" onClick={handleClick} />
      </TreeView>,
    );

    fireEvent.click(getByText('test'));

    expect(handleClick.callCount).to.equal(1);
  });

  it('should call onFocus when focused', () => {
    const handleFocus = spy();

    const { getByText } = render(
      <TreeView>
        <TreeNode nodeId="test" label="test" onFocus={handleFocus} />
      </TreeView>,
    );

    fireEvent.focus(getByText('test'));

    expect(handleFocus.callCount).to.equal(2);
  });

  it('should call onKeyDown when clicked', () => {
    const handleKeyDown = spy();

    const { getByText } = render(
      <TreeView>
        <TreeNode nodeId="test" label="test" onKeyDown={handleKeyDown} />
      </TreeView>,
    );

    fireEvent.keyDown(getByText('test'), { key: 'Enter' });

    expect(handleKeyDown.callCount).to.equal(1);
  });

  describe('console errors', () => {
    before(() => {
      consoleErrorMock.spy();
    });

    after(() => {
      consoleErrorMock.reset();
    });

    it('should error if not rendered inside `TreeView`', () => {
      render(<TreeNode nodeId="node1" />);

      expect(consoleErrorMock.callCount()).to.equal(1);
      expect(consoleErrorMock.args()[0][0]).to.include(
        'Material-UI: A `TreeNode` must be rendered inside a `TreeView`.',
      );
    });
  });

  describe('Accessibility', () => {
    it('should have the role `treeitem`', () => {
      const { container } = render(
        <TreeView>
          <TreeNode nodeId="test" label="test" />
        </TreeView>,
      );

      expect(container.querySelector('[role="treeitem"]')).to.be.ok;
    });

    it('should add the role `group` to a `ul` component if it has children', () => {
      const { container } = render(
        <TreeView>
          <TreeNode nodeId="test" label="test">
            <TreeNode nodeId="test2" label="test" />
          </TreeNode>
        </TreeView>,
      );

      expect(container.querySelector('ul[role="group"]')).to.be.ok;
    });

    it('should have the attribute `aria-expanded=false` if collapsed', () => {
      const { container } = render(
        <TreeView>
          <TreeNode nodeId="test" label="test">
            <TreeNode nodeId="test2" label="test" />
          </TreeNode>
        </TreeView>,
      );

      expect(container.querySelector('[aria-expanded=false]')).to.be.ok;
    });

    it('should have the attribute `aria-expanded=true` if expanded', () => {
      const { container } = render(
        <TreeView expanded={['test']}>
          <TreeNode nodeId="test" label="test">
            <TreeNode nodeId="test2" label="test" />
          </TreeNode>
        </TreeView>,
      );

      expect(container.querySelector('[aria-expanded=true]')).to.be.ok;
    });

    it('should not have the attribute `aria-expanded` if no children are present', () => {
      const { container } = render(
        <TreeView>
          <TreeNode nodeId="test" label="test" />
        </TreeView>,
      );

      expect(container.querySelector('[aria-expanded]')).to.not.be.ok;
    });
  });
});
