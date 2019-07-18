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

    describe('when a tree receives focus', () => {
      it('should focus the first node if none of the nodes are selected before the tree receives focus', () => {
        const { getByTestId, getByText } = render(
          <TreeView>
            <TreeNode nodeId="1" label="one" data-testid="one" />
            <TreeNode nodeId="2" label="two" />
            <TreeNode nodeId="3" label="three" />
          </TreeView>,
        );

        fireEvent.focus(getByText('one'));
        fireEvent.focus(getByText('two'));
        fireEvent.focus(getByText('three'));

        expect(getByTestId('one')).to.be.focused;
      });

      it('should focus the selected node if a node is selected before the tree receives focus', () => {
        const { getByTestId, getByText } = render(
          <TreeView>
            <TreeNode nodeId="1" label="one" />
            <TreeNode nodeId="2" label="two" data-testid="two" />
            <TreeNode nodeId="3" label="three" />
          </TreeView>,
        );

        fireEvent.click(getByText('two'));

        fireEvent.focus(getByText('one'));
        fireEvent.focus(getByText('two'));
        fireEvent.focus(getByText('three'));

        expect(getByTestId('two')).to.be.focused;
      });
    });

    describe('right arrow interaction', () => {
      it('should open the node and not move the focus if focus is on a closed node', () => {
        const { getByTestId, getByText } = render(
          <TreeView>
            <TreeNode nodeId="one" label="one" data-testid="one">
              <TreeNode nodeId="two" label="two" />
            </TreeNode>
          </TreeView>,
        );

        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'false');
        fireEvent.focus(getByTestId('one'));
        fireEvent.keyDown(getByText('one'), { key: 'ArrowRight' });
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
        expect(getByTestId('one')).to.be.focused;
      });

      it('should move focus to the first child if focus is on an open node', () => {
        const { getByTestId, getByText } = render(
          <TreeView expanded={['one']}>
            <TreeNode nodeId="one" label="one" data-testid="one">
              <TreeNode nodeId="two" label="two" data-testid="two" />
            </TreeNode>
          </TreeView>,
        );

        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
        fireEvent.focus(getByTestId('one'));
        fireEvent.keyDown(getByText('one'), { key: 'ArrowRight' });
        expect(getByTestId('two')).to.be.focused;
      });

      it('should do nothing if focus is on an end node', () => {
        const { getByTestId, getByText } = render(
          <TreeView expanded={['one']}>
            <TreeNode nodeId="one" label="one" data-testid="one">
              <TreeNode nodeId="two" label="two" data-testid="two" />
            </TreeNode>
          </TreeView>,
        );

        fireEvent.click(getByText('two'));
        expect(getByTestId('two')).to.be.focused;
        fireEvent.keyDown(getByText('two'), { key: 'ArrowRight' });
        expect(getByTestId('two')).to.be.focused;
      });
    });

    describe('left arrow interaction', () => {
      it('should close the node if focus is on an open node', () => {
        const { getByTestId, getByText } = render(
          <TreeView>
            <TreeNode nodeId="one" label="one" data-testid="one">
              <TreeNode nodeId="two" label="two" />
            </TreeNode>
          </TreeView>,
        );

        fireEvent.click(getByText('one'));
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
        fireEvent.focus(getByTestId('one'));
        fireEvent.keyDown(getByText('one'), { key: 'ArrowLeft' });
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'false');
        expect(getByTestId('one')).to.be.focused;
      });

      it("should move focus to the node's parent node if focus is on a child node that is an end node", () => {
        const { getByTestId, getByText } = render(
          <TreeView expanded={['one']}>
            <TreeNode nodeId="one" label="one" data-testid="one">
              <TreeNode nodeId="two" label="two" data-testid="two" />
            </TreeNode>
          </TreeView>,
        );

        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
        fireEvent.click(getByTestId('two'));
        fireEvent.keyDown(getByText('two'), { key: 'ArrowLeft' });
        expect(getByTestId('one')).to.be.focused;
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
      });

      it("should move focus to the node's parent node if focus is on a child node that is closed", () => {
        const { getByTestId, getByText } = render(
          <TreeView>
            <TreeNode nodeId="one" label="one" data-testid="one">
              <TreeNode nodeId="two" label="two" data-testid="two">
                <TreeNode nodeId="three" label="three" />
              </TreeNode>
            </TreeNode>
          </TreeView>,
        );

        fireEvent.click(getByText('one'));
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
        // move focus to node two
        fireEvent.click(getByTestId('two'));
        fireEvent.click(getByTestId('two'));
        expect(getByTestId('two')).to.have.attribute('aria-expanded', 'false');
        fireEvent.keyDown(getByText('two'), { key: 'ArrowLeft' });
        expect(getByTestId('one')).to.be.focused;
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
      });

      it('should do nothing if focus is on a root node that is closed', () => {
        const { getByTestId, getByText } = render(
          <TreeView>
            <TreeNode nodeId="one" label="one" data-testid="one">
              <TreeNode nodeId="two" label="two" />
            </TreeNode>
          </TreeView>,
        );

        fireEvent.focus(getByTestId('one'));
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'false');
        fireEvent.keyDown(getByText('one'), { key: 'ArrowLeft' });
        expect(getByTestId('one')).to.be.focused;
      });

      it('should do nothing if focus is on a root node that is an end node', () => {
        const { getByTestId, getByText } = render(
          <TreeView>
            <TreeNode nodeId="one" label="one" data-testid="one" />
          </TreeView>,
        );

        fireEvent.focus(getByTestId('one'));
        fireEvent.keyDown(getByText('one'), { key: 'ArrowLeft' });
        expect(getByTestId('one')).to.be.focused;
      });
    });
  });
});
