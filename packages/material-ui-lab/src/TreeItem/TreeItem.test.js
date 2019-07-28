import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { cleanup, createClientRender, fireEvent } from 'test/utils/createClientRender';
import TreeItem from './TreeItem';
import TreeView from '../TreeView';

describe('<TreeItem />', () => {
  // StrictModeViolation: uses Collapse
  const render = createClientRender({ strict: false });
  const mount = createMount({ strict: false });
  const classes = getClasses(<TreeItem nodeId="one" label="one" />);

  afterEach(() => {
    cleanup();
  });

  describeConformance(<TreeItem nodeId="one" label="one" />, () => ({
    classes,
    inheritComponent: 'li',
    mount,
    refInstanceof: window.HTMLLIElement,
    skip: ['componentProp'],
    after: () => mount.cleanUp(),
  }));

  it('should call onClick when clicked', () => {
    const handleClick = spy();

    const { getByText } = render(
      <TreeView>
        <TreeItem nodeId="test" label="test" onClick={handleClick} />
      </TreeView>,
    );

    fireEvent.click(getByText('test'));

    expect(handleClick.callCount).to.equal(1);
  });

  it('should not call onClick when children are clicked', () => {
    const handleClick = spy();

    const { getByText } = render(
      <TreeView defaultExpanded={['one']}>
        <TreeItem nodeId="one" label="one" onClick={handleClick}>
          <TreeItem nodeId="two" label="two" />
        </TreeItem>
      </TreeView>,
    );

    fireEvent.click(getByText('two'));

    expect(handleClick.callCount).to.equal(0);
  });

  it('should call onFocus when focused', () => {
    const handleFocus = spy();

    const { getByTestId } = render(
      <TreeView>
        <TreeItem nodeId="test" label="test" data-testid="test" onFocus={handleFocus} />
      </TreeView>,
    );

    getByTestId('test').focus();

    expect(handleFocus.callCount).to.equal(1);
  });

  it('should call onKeyDown when a key is pressed', () => {
    const handleKeyDown = spy();

    const { getByTestId } = render(
      <TreeView>
        <TreeItem nodeId="test" label="test" data-testid="test" onKeyDown={handleKeyDown} />
      </TreeView>,
    );

    getByTestId('test').focus();

    fireEvent.keyDown(document.activeElement, { key: 'Enter' });
    fireEvent.keyDown(document.activeElement, { key: 'A' });
    fireEvent.keyDown(document.activeElement, { key: ']' });

    expect(handleKeyDown.callCount).to.equal(3);
  });

  describe('Accessibility', () => {
    it('should have the role `treeitem`', () => {
      const { getByRole } = render(
        <TreeView>
          <TreeItem nodeId="test" label="test" />
        </TreeView>,
      );

      expect(getByRole('treeitem')).to.be.ok;
    });

    it('should add the role `group` to a component containing children', () => {
      const { getByRole, getByText } = render(
        <TreeView>
          <TreeItem nodeId="test" label="test">
            <TreeItem nodeId="test2" label="test2" />
          </TreeItem>
        </TreeView>,
      );

      expect(getByRole('group')).to.contain(getByText('test2'));
    });

    it('should have the attribute `aria-expanded=false` if collapsed', () => {
      const { getByTestId } = render(
        <TreeView>
          <TreeItem nodeId="test" label="test" data-testid="test">
            <TreeItem nodeId="test2" label="test2" />
          </TreeItem>
        </TreeView>,
      );

      expect(getByTestId('test')).to.have.attribute('aria-expanded', 'false');
    });

    it('should have the attribute `aria-expanded=true` if expanded', () => {
      const { container } = render(
        <TreeView defaultExpanded={['test']}>
          <TreeItem nodeId="test" label="test">
            <TreeItem nodeId="test2" label="test" />
          </TreeItem>
        </TreeView>,
      );

      expect(container.querySelector('[aria-expanded=true]')).to.be.ok;
    });

    it('should not have the attribute `aria-expanded` if no children are present', () => {
      const { container } = render(
        <TreeView>
          <TreeItem nodeId="test" label="test" />
        </TreeView>,
      );

      expect(container.querySelector('[aria-expanded]')).to.not.be.ok;
    });

    describe('when a tree receives focus', () => {
      it('should focus the first node if none of the nodes are selected before the tree receives focus', () => {
        const { getByTestId } = render(
          <React.Fragment>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
            <div data-testid="start" tabIndex={0} />
            <TreeView>
              <TreeItem nodeId="1" label="one" data-testid="one" />
              <TreeItem nodeId="2" label="two" />
              <TreeItem nodeId="3" label="three" />
            </TreeView>
          </React.Fragment>,
        );

        getByTestId('start').focus();
        expect(getByTestId('start')).to.be.focused;

        fireEvent.keyDown(document.activeElement, { key: 'Tab' });
        getByTestId('one').focus();

        expect(getByTestId('one')).to.be.focused;
      });

      it('should focus the selected node if a node is selected before the tree receives focus', () => {
        const { getByTestId, getByText } = render(
          <React.Fragment>
            {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
            <div data-testid="start" tabIndex={0} />
            <TreeView>
              <TreeItem nodeId="1" label="one" data-testid="one" />
              <TreeItem nodeId="2" label="two" data-testid="two" />
              <TreeItem nodeId="3" label="three" />
            </TreeView>
          </React.Fragment>,
        );

        fireEvent.click(getByText('two'));
        expect(getByTestId('two')).to.be.focused;

        getByTestId('start').focus();
        expect(getByTestId('start')).to.be.focused;

        fireEvent.keyDown(document.activeElement, { key: 'Tab' });
        getByTestId('two').focus();

        expect(getByTestId('two')).to.be.focused;
      });
    });

    describe('right arrow interaction', () => {
      it('should open the node and not move the focus if focus is on a closed node', () => {
        const { getByTestId } = render(
          <TreeView>
            <TreeItem nodeId="one" label="one" data-testid="one">
              <TreeItem nodeId="two" label="two" />
            </TreeItem>
          </TreeView>,
        );

        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'false');
        getByTestId('one').focus();
        fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
        expect(getByTestId('one')).to.be.focused;
      });

      it('should move focus to the first child if focus is on an open node', () => {
        const { getByTestId } = render(
          <TreeView defaultExpanded={['one']}>
            <TreeItem nodeId="one" label="one" data-testid="one">
              <TreeItem nodeId="two" label="two" data-testid="two" />
            </TreeItem>
          </TreeView>,
        );

        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
        getByTestId('one').focus();
        fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
        expect(getByTestId('two')).to.be.focused;
      });

      it('should do nothing if focus is on an end node', () => {
        const { getByTestId, getByText } = render(
          <TreeView defaultExpanded={['one']}>
            <TreeItem nodeId="one" label="one" data-testid="one">
              <TreeItem nodeId="two" label="two" data-testid="two" />
            </TreeItem>
          </TreeView>,
        );

        fireEvent.click(getByText('two'));
        expect(getByTestId('two')).to.be.focused;
        fireEvent.keyDown(document.activeElement, { key: 'ArrowRight' });
        expect(getByTestId('two')).to.be.focused;
      });
    });

    describe('left arrow interaction', () => {
      it('should close the node if focus is on an open node', () => {
        const { getByTestId, getByText } = render(
          <TreeView>
            <TreeItem nodeId="one" label="one" data-testid="one">
              <TreeItem nodeId="two" label="two" />
            </TreeItem>
          </TreeView>,
        );

        fireEvent.click(getByText('one'));
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
        getByTestId('one').focus();
        fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'false');
        expect(getByTestId('one')).to.be.focused;
      });

      it("should move focus to the node's parent node if focus is on a child node that is an end node", () => {
        const { getByTestId, getByText } = render(
          <TreeView defaultExpanded={['one']}>
            <TreeItem nodeId="one" label="one" data-testid="one">
              <TreeItem nodeId="two" label="two" data-testid="two" />
            </TreeItem>
          </TreeView>,
        );

        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
        fireEvent.click(getByText('two'));
        fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
        expect(getByTestId('one')).to.be.focused;
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
      });

      it("should move focus to the node's parent node if focus is on a child node that is closed", () => {
        const { getByTestId, getByText } = render(
          <TreeView>
            <TreeItem nodeId="one" label="one" data-testid="one">
              <TreeItem nodeId="two" label="two" data-testid="two">
                <TreeItem nodeId="three" label="three" />
              </TreeItem>
            </TreeItem>
          </TreeView>,
        );

        fireEvent.click(getByText('one'));
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
        // move focus to node two
        fireEvent.click(getByText('two'));
        fireEvent.click(getByText('two'));
        expect(getByTestId('two')).to.have.attribute('aria-expanded', 'false');
        fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
        expect(getByTestId('one')).to.be.focused;
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
      });

      it('should do nothing if focus is on a root node that is closed', () => {
        const { getByTestId } = render(
          <TreeView>
            <TreeItem nodeId="one" label="one" data-testid="one">
              <TreeItem nodeId="two" label="two" />
            </TreeItem>
          </TreeView>,
        );

        getByTestId('one').focus();
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'false');
        fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
        expect(getByTestId('one')).to.be.focused;
      });

      it('should do nothing if focus is on a root node that is an end node', () => {
        const { getByTestId } = render(
          <TreeView>
            <TreeItem nodeId="one" label="one" data-testid="one" />
          </TreeView>,
        );

        getByTestId('one').focus();
        fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
        expect(getByTestId('one')).to.be.focused;
      });
    });

    describe('down arrow interaction', () => {
      it('moves focus to a non-nested sibling node', () => {
        const { getByTestId } = render(
          <TreeView>
            <TreeItem nodeId="one" label="one" data-testid="one" />
            <TreeItem nodeId="two" label="two" data-testid="two" />
          </TreeView>,
        );

        getByTestId('one').focus();
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
        expect(getByTestId('two')).to.be.focused;
      });

      it('moves focus to a nested node', () => {
        const { getByTestId } = render(
          <TreeView defaultExpanded={['one']}>
            <TreeItem nodeId="one" label="one" data-testid="one">
              <TreeItem nodeId="two" label="two" data-testid="two" />
            </TreeItem>
          </TreeView>,
        );

        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
        getByTestId('one').focus();
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
        expect(getByTestId('two')).to.be.focused;
      });

      it("moves focus to a parent's sibling", () => {
        const { getByTestId, getByText } = render(
          <TreeView defaultExpanded={['one']}>
            <TreeItem nodeId="one" label="one" data-testid="one">
              <TreeItem nodeId="two" label="two" data-testid="two" />
            </TreeItem>
            <TreeItem nodeId="three" label="three" data-testid="three" />
          </TreeView>,
        );

        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
        fireEvent.click(getByText('two'));
        expect(getByTestId('two')).to.be.focused;
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
        expect(getByTestId('three')).to.be.focused;
      });
    });

    describe('up arrow interaction', () => {
      it('moves focus to a non-nested sibling node', () => {
        const { getByTestId, getByText } = render(
          <TreeView>
            <TreeItem nodeId="one" label="one" data-testid="one" />
            <TreeItem nodeId="two" label="two" data-testid="two" />
          </TreeView>,
        );

        fireEvent.click(getByText('two'));
        expect(getByTestId('two')).to.be.focused;
        fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
        expect(getByTestId('one')).to.be.focused;
      });

      it('moves focus to a parent', () => {
        const { getByTestId, getByText } = render(
          <TreeView defaultExpanded={['one']}>
            <TreeItem nodeId="one" label="one" data-testid="one">
              <TreeItem nodeId="two" label="two" data-testid="two" />
            </TreeItem>
          </TreeView>,
        );

        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
        fireEvent.click(getByText('two'));
        expect(getByTestId('two')).to.be.focused;
        fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
        expect(getByTestId('one')).to.be.focused;
      });

      it("moves focus to a sibling's child", () => {
        const { getByTestId, getByText } = render(
          <TreeView defaultExpanded={['one']}>
            <TreeItem nodeId="one" label="one" data-testid="one">
              <TreeItem nodeId="two" label="two" data-testid="two" />
            </TreeItem>
            <TreeItem nodeId="three" label="three" data-testid="three" />
          </TreeView>,
        );

        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
        fireEvent.click(getByText('three'));
        expect(getByTestId('three')).to.be.focused;
        fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
        expect(getByTestId('two')).to.be.focused;
      });
    });

    describe('home key interaction', () => {
      it('moves focus to the first node in the tree', () => {
        const { getByTestId, getByText } = render(
          <TreeView>
            <TreeItem nodeId="one" label="one" data-testid="one" />
            <TreeItem nodeId="two" label="two" data-testid="two" />
            <TreeItem nodeId="three" label="three" data-testid="three" />
            <TreeItem nodeId="four" label="four" data-testid="four" />
          </TreeView>,
        );

        fireEvent.click(getByText('four'));
        expect(getByTestId('four')).to.be.focused;
        fireEvent.keyDown(document.activeElement, { key: 'Home' });
        expect(getByTestId('one')).to.be.focused;
      });
    });

    describe('end key interaction', () => {
      it('moves focus to the last node in the tree without expanded items', () => {
        const { getByTestId } = render(
          <TreeView>
            <TreeItem nodeId="one" label="one" data-testid="one" />
            <TreeItem nodeId="two" label="two" data-testid="two" />
            <TreeItem nodeId="three" label="three" data-testid="three" />
            <TreeItem nodeId="four" label="four" data-testid="four" />
          </TreeView>,
        );

        getByTestId('one').focus();
        expect(getByTestId('one')).to.be.focused;
        fireEvent.keyDown(document.activeElement, { key: 'End' });
        expect(getByTestId('four')).to.be.focused;
      });

      it('moves focus to the last node in the tree with expanded items', () => {
        const { getByTestId } = render(
          <TreeView defaultExpanded={['four', 'five']}>
            <TreeItem nodeId="one" label="one" data-testid="one" />
            <TreeItem nodeId="two" label="two" data-testid="two" />
            <TreeItem nodeId="three" label="three" data-testid="three" />
            <TreeItem nodeId="four" label="four" data-testid="four">
              <TreeItem nodeId="five" label="five" data-testid="five">
                <TreeItem nodeId="six" label="six" data-testid="six" />
              </TreeItem>
            </TreeItem>
          </TreeView>,
        );

        getByTestId('one').focus();
        expect(getByTestId('one')).to.be.focused;
        fireEvent.keyDown(document.activeElement, { key: 'End' });
        expect(getByTestId('six')).to.be.focused;
      });
    });

    describe('enter key interaction', () => {
      it('expands a node with children', () => {
        const { getByTestId } = render(
          <TreeView>
            <TreeItem nodeId="one" label="one" data-testid="one">
              <TreeItem nodeId="two" label="two" data-testid="two" />
            </TreeItem>
          </TreeView>,
        );

        getByTestId('one').focus();
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'false');
        fireEvent.keyDown(document.activeElement, { key: 'Enter' });
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
      });

      it('collapses a node with children', () => {
        const { getByTestId, getByText } = render(
          <TreeView>
            <TreeItem nodeId="one" label="one" data-testid="one">
              <TreeItem nodeId="two" label="two" data-testid="two" />
            </TreeItem>
          </TreeView>,
        );

        fireEvent.click(getByText('one'));
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
        fireEvent.keyDown(document.activeElement, { key: 'Enter' });
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'false');
      });
    });

    describe('type-ahead functionality', () => {
      it('moves focus to the next node with a name that starts with the typed character', () => {
        const { getByTestId } = render(
          <TreeView>
            <TreeItem nodeId="one" label="one" data-testid="one" />
            <TreeItem nodeId="two" label="two" data-testid="two" />
            <TreeItem nodeId="three" label="three" data-testid="three" />
            <TreeItem nodeId="four" label="four" data-testid="four" />
          </TreeView>,
        );

        getByTestId('one').focus();
        expect(getByTestId('one')).to.be.focused;
        fireEvent.keyDown(document.activeElement, { key: 't' });
        expect(getByTestId('two')).to.be.focused;

        fireEvent.keyDown(document.activeElement, { key: 'f' });
        expect(getByTestId('four')).to.be.focused;

        fireEvent.keyDown(document.activeElement, { key: 'o' });
        expect(getByTestId('one')).to.be.focused;
      });

      it('moves focus to the next node with the same starting character', () => {
        const { getByTestId } = render(
          <TreeView>
            <TreeItem nodeId="one" label="one" data-testid="one" />
            <TreeItem nodeId="two" label="two" data-testid="two" />
            <TreeItem nodeId="three" label="three" data-testid="three" />
            <TreeItem nodeId="four" label="four" data-testid="four" />
          </TreeView>,
        );

        getByTestId('one').focus();
        expect(getByTestId('one')).to.be.focused;
        fireEvent.keyDown(document.activeElement, { key: 't' });
        expect(getByTestId('two')).to.be.focused;

        fireEvent.keyDown(document.activeElement, { key: 't' });
        expect(getByTestId('three')).to.be.focused;

        fireEvent.keyDown(document.activeElement, { key: 't' });
        expect(getByTestId('two')).to.be.focused;
      });
    });

    describe('asterisk key interaction', () => {
      it('expands all siblings that are at the same level as the current node', () => {
        const { getByTestId } = render(
          <TreeView>
            <TreeItem nodeId="one" label="one" data-testid="one">
              <TreeItem nodeId="two" label="two" data-testid="two" />
            </TreeItem>
            <TreeItem nodeId="three" label="three" data-testid="three">
              <TreeItem nodeId="four" label="four" data-testid="four" />
            </TreeItem>
            <TreeItem nodeId="five" label="five" data-testid="five">
              <TreeItem nodeId="six" label="six" data-testid="six">
                <TreeItem nodeId="seven" label="seven" data-testid="seven" />
              </TreeItem>
            </TreeItem>
          </TreeView>,
        );

        getByTestId('one').focus();
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'false');
        expect(getByTestId('three')).to.have.attribute('aria-expanded', 'false');
        expect(getByTestId('five')).to.have.attribute('aria-expanded', 'false');
        fireEvent.keyDown(document.activeElement, { key: '*' });
        expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
        expect(getByTestId('three')).to.have.attribute('aria-expanded', 'true');
        expect(getByTestId('five')).to.have.attribute('aria-expanded', 'true');
        expect(getByTestId('six')).to.have.attribute('aria-expanded', 'false');
      });
    });
  });
});
