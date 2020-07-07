import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createClientRender, fireEvent, screen } from 'test/utils/createClientRender';
import { ErrorBoundary } from 'test/utils/components';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import TreeView from './TreeView';
import TreeItem from '../TreeItem';

describe('<TreeView />', () => {
  let classes;
  const mount = createMount();
  // StrictModeViolation: test uses TreeItem
  const render = createClientRender({ strict: false });

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

  it('should call onKeyDown when a key is pressed', () => {
    const handleKeyDown = spy();

    render(
      <TreeView onKeyDown={handleKeyDown}>
        <TreeItem nodeId="test" label="test" data-testid="test" />
      </TreeView>,
    );
    screen.getByRole('tree').focus();

    fireEvent.keyDown(screen.getByRole('tree'), { key: 'Enter' });
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'A' });
    fireEvent.keyDown(screen.getByRole('tree'), { key: ']' });

    expect(handleKeyDown.callCount).to.equal(3);
  });

  it('should call onFocus when tree is focused', () => {
    const handleFocus = spy();

    render(
      <TreeView onFocus={handleFocus}>
        <TreeItem nodeId="test" label="test" data-testid="test" />
      </TreeView>,
    );
    screen.getByRole('tree').focus();
    expect(handleFocus.callCount).to.equal(1);
  });

  it('should call onBlur when tree is blurred', () => {
    const handleBlur = spy();

    render(
      <TreeView onBlur={handleBlur}>
        <TreeItem nodeId="test" label="test" data-testid="test" />
      </TreeView>,
    );
    screen.getByRole('tree').focus();
    screen.getByRole('tree').blur();
    expect(handleBlur.callCount).to.equal(1);
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

    render(<MyComponent />);

    expect(screen.getByTestId('one')).to.have.attribute('aria-expanded', 'false');
    fireEvent.click(screen.getByText('one'));
    screen.getByRole('tree').focus();
    expect(screen.getByTestId('one')).to.have.attribute('aria-expanded', 'true');
    fireEvent.click(screen.getByText('one'));
    expect(screen.getByTestId('one')).to.have.attribute('aria-expanded', 'false');
    fireEvent.keyDown(screen.getByRole('tree'), { key: '*' });
    expect(screen.getByTestId('one')).to.have.attribute('aria-expanded', 'true');
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

    render(<MyComponent />);

    expect(screen.getByTestId('one')).to.not.have.attribute('aria-selected');
    expect(screen.getByTestId('two')).to.not.have.attribute('aria-selected');
    fireEvent.click(screen.getByText('one'));
    expect(screen.getByTestId('one')).to.have.attribute('aria-selected', 'true');
    expect(screen.getByTestId('two')).to.not.have.attribute('aria-selected');
    fireEvent.click(screen.getByText('two'));
    expect(screen.getByTestId('one')).to.not.have.attribute('aria-selected');
    expect(screen.getByTestId('two')).to.have.attribute('aria-selected', 'true');
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

    render(<MyComponent />);

    expect(screen.getByTestId('one')).to.have.attribute('aria-selected', 'false');
    expect(screen.getByTestId('two')).to.have.attribute('aria-selected', 'false');
    fireEvent.click(screen.getByText('one'));
    expect(screen.getByTestId('one')).to.have.attribute('aria-selected', 'true');
    expect(screen.getByTestId('two')).to.have.attribute('aria-selected', 'false');
    fireEvent.click(screen.getByText('two'), { ctrlKey: true });
    expect(screen.getByTestId('one')).to.have.attribute('aria-selected', 'true');
    expect(screen.getByTestId('two')).to.have.attribute('aria-selected', 'true');
  });

  it('should not error when component state changes', () => {
    function MyComponent() {
      const [, setState] = React.useState(1);

      return (
        <TreeView
          onFocus={() => {
            setState(Math.random);
          }}
          id="tree"
        >
          <TreeItem nodeId="one" label="one" data-testid="one">
            <TreeItem nodeId="two" label="two" data-testid="two" />
          </TreeItem>
        </TreeView>
      );
    }

    render(<MyComponent />);

    fireEvent.click(screen.getByText('one'));
    // Clicks would normally focus tree
    screen.getByRole('tree').focus();

    expect(screen.getByTestId('one')).toBeActiveDescendant();
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
    expect(screen.getByTestId('two')).toBeActiveDescendant();
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowUp' });
    expect(screen.getByTestId('one')).toBeActiveDescendant();
    fireEvent.keyDown(screen.getByRole('tree'), { key: 'ArrowDown' });
    expect(screen.getByTestId('two')).toBeActiveDescendant();
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

    render(<TestComponent />);

    expect(screen.getByText('test')).not.to.equal(null);
    fireEvent.click(screen.getByText('Hide'));
    expect(screen.queryByText('test')).to.equal(null);
  });

  describe('onNodeFocus', () => {
    it('should be called when node is focused', () => {
      const focusSpy = spy();
      render(
        <TreeView onNodeFocus={focusSpy}>
          <TreeItem nodeId="1" label="one" />
        </TreeView>,
      );

      // First node receives focus when tree focused
      screen.getByRole('tree').focus();

      expect(focusSpy.callCount).to.equal(1);
      expect(focusSpy.args[0][1]).to.equal('1');
    });
  });

  describe('onNodeToggle', () => {
    it('should be called when a parent node label is clicked', () => {
      const handleNodeToggle = spy();

      render(
        <TreeView onNodeToggle={handleNodeToggle}>
          <TreeItem nodeId="1" label="outer">
            <TreeItem nodeId="2" label="inner" />
          </TreeItem>
        </TreeView>,
      );

      fireEvent.click(screen.getByText('outer'));

      expect(handleNodeToggle.callCount).to.equal(1);
      expect(handleNodeToggle.args[0][1]).to.deep.equal(['1']);
    });

    it('should not be called when a parent node label is clicked and onLabelClick preventDefault', () => {
      const handleNodeToggle = spy();

      render(
        <TreeView onNodeToggle={handleNodeToggle}>
          <TreeItem onLabelClick={(event) => event.preventDefault()} nodeId="1" label="outer">
            <TreeItem nodeId="2" label="inner" />
          </TreeItem>
        </TreeView>,
      );

      fireEvent.click(screen.getByText('outer'));

      expect(handleNodeToggle.callCount).to.equal(0);
    });

    it('should be called when a parent node icon is clicked', () => {
      const handleNodeToggle = spy();

      render(
        <TreeView onNodeToggle={handleNodeToggle}>
          <TreeItem icon={<div data-testid="icon" />} nodeId="1" label="outer">
            <TreeItem nodeId="2" label="inner" />
          </TreeItem>
        </TreeView>,
      );

      fireEvent.click(screen.getByTestId('icon'));

      expect(handleNodeToggle.callCount).to.equal(1);
      expect(handleNodeToggle.args[0][1]).to.deep.equal(['1']);
    });

    it('should not be called when a parent node icon is clicked and onIconClick preventDefault', () => {
      const handleNodeToggle = spy();

      render(
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

      fireEvent.click(screen.getByTestId('icon'));

      expect(handleNodeToggle.callCount).to.equal(0);
    });
  });

  describe('Accessibility', () => {
    it('(TreeView) should have the role `tree`', () => {
      render(<TreeView />);

      expect(screen.getByRole('tree')).not.to.equal(null);
    });

    it('(TreeView) should have the attribute `aria-multiselectable=false if using single select`', () => {
      render(<TreeView />);

      expect(screen.getByRole('tree')).to.have.attribute('aria-multiselectable', 'false');
    });

    it('(TreeView) should have the attribute `aria-multiselectable=true if using multi select`', () => {
      render(<TreeView multiSelect />);

      expect(screen.getByRole('tree')).to.have.attribute('aria-multiselectable', 'true');
    });
  });
});
