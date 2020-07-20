import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createClientRender, fireEvent, screen } from 'test/utils/createClientRender';
import { ErrorBoundary } from 'test/utils/components';
import describeConformance from 'test/utils/describeConformance';
import { getClasses } from 'test/utils';
import createMount from 'test/utils/createMount';
import TreeView from './TreeView';
import TreeItem from '../TreeItem';

describe('<TreeView />', () => {
  let classes;
  const mount = createMount({ strict: true });
  const render = createClientRender();

  before(() => {
    classes = getClasses(<TreeView />);
  });

  describeConformance(<TreeView />, () => ({
    classes,
    inheritComponent: 'ul',
    mount,
    refInstanceof: window.HTMLUListElement,
    skip: ['componentProp'],
  }));

  describe('warnings', () => {
    it('should warn when switching from controlled to uncontrolled of the expanded prop', () => {
      const { setProps } = render(
        <TreeView expanded={[]}>
          <TreeItem nodeId="1" label="one" />
        </TreeView>,
      );

      expect(() => {
        setProps({ expanded: undefined });
      }).toErrorDev(
        'Material-UI: A component is changing the controlled expanded state of TreeView to be uncontrolled.',
      );
    });

    it('should warn when switching from controlled to uncontrolled of the selected prop', () => {
      const { setProps } = render(
        <TreeView selected={[]}>
          <TreeItem nodeId="1" label="one" />
        </TreeView>,
      );

      expect(() => {
        setProps({ selected: undefined });
      }).toErrorDev(
        'Material-UI: A component is changing the controlled selected state of TreeView to be uncontrolled.',
      );
    });

    it('should not crash when unmounting with duplicate ids', () => {
      const CustomTreeItem = () => {
        return <TreeItem nodeId="iojerogj" />;
      };
      function App() {
        const [isVisible, hideTreeView] = React.useReducer(() => false, true);

        return (
          <React.Fragment>
            <button onClick={hideTreeView} type="button">
              Toggle
            </button>
            {isVisible && (
              <TreeView>
                <TreeItem nodeId="a" label="b">
                  <CustomTreeItem nodeId="a" />
                </TreeItem>
              </TreeView>
            )}
          </React.Fragment>
        );
      }
      const errorRef = React.createRef();
      render(
        <ErrorBoundary ref={errorRef}>
          <App />
        </ErrorBoundary>,
      );

      expect(() => {
        screen.getByRole('button').click();
      }).not.toErrorDev();
    });
  });

  it('should be able to be controlled with the expanded prop', () => {
    function MyComponent() {
      const [expandedState, setExpandedState] = React.useState([]);
      const handleNodeToggle = (event, nodes) => {
        setExpandedState(nodes);
      };
      return (
        <TreeView expanded={expandedState} onNodeToggle={handleNodeToggle}>
          <TreeItem nodeId="1" label="one" data-testid="one">
            <TreeItem nodeId="2" label="two" />
          </TreeItem>
        </TreeView>
      );
    }

    const { getByTestId, getByText } = render(<MyComponent />);

    expect(getByTestId('one')).to.have.attribute('aria-expanded', 'false');
    fireEvent.click(getByText('one'));
    expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
    fireEvent.click(getByText('one'));
    expect(getByTestId('one')).to.have.attribute('aria-expanded', 'false');
    fireEvent.keyDown(getByTestId('one'), { key: '*' });
    expect(getByTestId('one')).to.have.attribute('aria-expanded', 'true');
  });

  it('should be able to be controlled with the selected prop and singleSelect', () => {
    function MyComponent() {
      const [selectedState, setSelectedState] = React.useState(null);
      const handleNodeSelect = (event, nodes) => {
        setSelectedState(nodes);
      };
      return (
        <TreeView selected={selectedState} onNodeSelect={handleNodeSelect}>
          <TreeItem nodeId="1" label="one" data-testid="one" />
          <TreeItem nodeId="2" label="two" data-testid="two" />
        </TreeView>
      );
    }

    const { getByTestId, getByText } = render(<MyComponent />);

    expect(getByTestId('one')).to.not.have.attribute('aria-selected');
    expect(getByTestId('two')).to.not.have.attribute('aria-selected');
    fireEvent.click(getByText('one'));
    expect(getByTestId('one')).to.have.attribute('aria-selected', 'true');
    expect(getByTestId('two')).to.not.have.attribute('aria-selected');
    fireEvent.click(getByText('two'));
    expect(getByTestId('one')).to.not.have.attribute('aria-selected');
    expect(getByTestId('two')).to.have.attribute('aria-selected', 'true');
  });

  it('should be able to be controlled with the selected prop and multiSelect', () => {
    function MyComponent() {
      const [selectedState, setSelectedState] = React.useState([]);
      const handleNodeSelect = (event, nodes) => {
        setSelectedState(nodes);
      };
      return (
        <TreeView selected={selectedState} onNodeSelect={handleNodeSelect} multiSelect>
          <TreeItem nodeId="1" label="one" data-testid="one" />
          <TreeItem nodeId="2" label="two" data-testid="two" />
        </TreeView>
      );
    }

    const { getByTestId, getByText } = render(<MyComponent />);

    expect(getByTestId('one')).to.have.attribute('aria-selected', 'false');
    expect(getByTestId('two')).to.have.attribute('aria-selected', 'false');
    fireEvent.click(getByText('one'));
    expect(getByTestId('one')).to.have.attribute('aria-selected', 'true');
    expect(getByTestId('two')).to.have.attribute('aria-selected', 'false');
    fireEvent.click(getByText('two'), { ctrlKey: true });
    expect(getByTestId('one')).to.have.attribute('aria-selected', 'true');
    expect(getByTestId('two')).to.have.attribute('aria-selected', 'true');
  });

  it('should not error when component state changes', () => {
    function MyComponent() {
      const [, setState] = React.useState(1);

      return (
        <TreeView>
          <TreeItem
            nodeId="one"
            label="one"
            data-testid="one"
            onFocus={() => {
              setState(Math.random);
            }}
          >
            <TreeItem nodeId="two" label="two" data-testid="two" />
          </TreeItem>
        </TreeView>
      );
    }

    const { getByText, getByTestId } = render(<MyComponent />);

    fireEvent.click(getByText('one'));
    expect(getByTestId('one')).toHaveFocus();
    fireEvent.keyDown(getByTestId('one'), { key: 'ArrowDown' });
    expect(getByTestId('two')).toHaveFocus();
    fireEvent.keyDown(getByTestId('two'), { key: 'ArrowUp' });
    expect(getByTestId('one')).toHaveFocus();
    fireEvent.keyDown(getByTestId('one'), { key: 'ArrowDown' });
    expect(getByTestId('two')).toHaveFocus();
  });

  it('should support conditional rendered tree items', () => {
    function TestComponent() {
      const [hide, setState] = React.useState(false);

      return (
        <React.Fragment>
          <button type="button" onClick={() => setState(true)}>
            Hide
          </button>
          <TreeView>{!hide && <TreeItem nodeId="test" label="test" />}</TreeView>
        </React.Fragment>
      );
    }

    const { getByText, queryByText } = render(<TestComponent />);

    expect(getByText('test')).not.to.equal(null);
    fireEvent.click(getByText('Hide'));
    expect(queryByText('test')).to.equal(null);
  });

  describe('onNodeToggle', () => {
    it('should be called when a parent node label is clicked', () => {
      const handleNodeToggle = spy();

      const { getByText } = render(
        <TreeView onNodeToggle={handleNodeToggle}>
          <TreeItem nodeId="1" label="outer">
            <TreeItem nodeId="2" label="inner" />
          </TreeItem>
        </TreeView>,
      );

      fireEvent.click(getByText('outer'));

      expect(handleNodeToggle.callCount).to.equal(1);
      expect(handleNodeToggle.args[0][1]).to.deep.equal(['1']);
    });

    it('should not be called when a parent node label is clicked and onLabelClick preventDefault', () => {
      const handleNodeToggle = spy();

      const { getByText } = render(
        <TreeView onNodeToggle={handleNodeToggle}>
          <TreeItem onLabelClick={(event) => event.preventDefault()} nodeId="1" label="outer">
            <TreeItem nodeId="2" label="inner" />
          </TreeItem>
        </TreeView>,
      );

      fireEvent.click(getByText('outer'));

      expect(handleNodeToggle.callCount).to.equal(0);
    });

    it('should be called when a parent node icon is clicked', () => {
      const handleNodeToggle = spy();

      const { getByTestId } = render(
        <TreeView onNodeToggle={handleNodeToggle}>
          <TreeItem icon={<div data-testid="icon" />} nodeId="1" label="outer">
            <TreeItem nodeId="2" label="inner" />
          </TreeItem>
        </TreeView>,
      );

      fireEvent.click(getByTestId('icon'));

      expect(handleNodeToggle.callCount).to.equal(1);
      expect(handleNodeToggle.args[0][1]).to.deep.equal(['1']);
    });

    it('should not be called when a parent node icon is clicked and onIconClick preventDefault', () => {
      const handleNodeToggle = spy();

      const { getByTestId } = render(
        <TreeView onNodeToggle={handleNodeToggle}>
          <TreeItem
            onIconClick={(event) => event.preventDefault()}
            icon={<div data-testid="icon" />}
            nodeId="1"
            label="outer"
          >
            <TreeItem nodeId="2" label="inner" />
          </TreeItem>
        </TreeView>,
      );

      fireEvent.click(getByTestId('icon'));

      expect(handleNodeToggle.callCount).to.equal(0);
    });
  });

  describe('Accessibility', () => {
    it('(TreeView) should have the role `tree`', () => {
      const { getByRole } = render(<TreeView />);

      expect(getByRole('tree')).not.to.equal(null);
    });

    it('(TreeView) should have the attribute `aria-multiselectable=false if using single select`', () => {
      const { getByRole } = render(<TreeView />);

      expect(getByRole('tree')).to.have.attribute('aria-multiselectable', 'false');
    });

    it('(TreeView) should have the attribute `aria-multiselectable=true if using multi select`', () => {
      const { getByRole } = render(<TreeView multiSelect />);

      expect(getByRole('tree')).to.have.attribute('aria-multiselectable', 'true');
    });
  });
});
