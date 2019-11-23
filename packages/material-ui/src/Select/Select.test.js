import React from 'react';
import { expect } from 'chai';
import { getClasses, createMount } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import { act, createClientRender, fireEvent } from 'test/utils/createClientRender';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import MenuItem from '../MenuItem';
import Input from '../Input';
import Select from './Select';
import { spy, stub, useFakeTimers } from 'sinon';

describe('<Select />', () => {
  let classes;
  let mount;
  const render = createClientRender({ strict: false });

  before(() => {
    classes = getClasses(<Select />);
    // StrictModeViolation: uses Menu
    mount = createMount({ strict: false });
  });

  describeConformance(<Select value="" />, () => ({
    classes,
    inheritComponent: Input,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'rootClass'],
    after: () => mount.cleanUp(),
  }));

  describe('prop: inputProps', () => {
    it('should be able to provide a custom classes property', () => {
      const { container } = render(
        <Select
          inputProps={{
            classes: { root: 'root' },
          }}
          value=""
        />,
      );

      expect(container.querySelector(`.${classes.root}`)).to.have.class('root');
    });
  });

  it('should be able to mount the component', () => {
    const { container } = render(
      <Select value={10}>
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>,
    );

    expect(container.querySelector('input')).to.have.property('value', '10');
  });

  specify('the trigger is in tab order', () => {
    const { getByRole } = render(
      <Select value="">
        <MenuItem value="">None</MenuItem>
      </Select>,
    );

    expect(getByRole('button')).to.have.property('tabIndex', 0);
  });

  it('should accept null child', () => {
    render(
      <Select open value={10}>
        {null}
        <MenuItem value={10}>Ten</MenuItem>
      </Select>,
    );
  });

  it('should have an input with [type="hidden"] by default', () => {
    const { container } = render(
      <Select value="10">
        <MenuItem value="10">Ten</MenuItem>
      </Select>,
    );

    expect(container.querySelector('input')).to.have.property('type', 'hidden');
  });

  it('should ignore onBlur when the menu opens', () => {
    // mousedown calls focus while click opens moving the focus to an item
    // this means the trigger is blurred immediately
    const handleBlur = spy();
    const { getByRole, getAllByRole, queryByRole } = render(
      <Select
        onBlur={handleBlur}
        value=""
        onMouseDown={event => {
          // simulating certain platforms that focus on mousedown
          if (event.defaultPrevented === false) {
            event.currentTarget.focus();
          }
        }}
      >
        <MenuItem value="">none</MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
      </Select>,
    );
    const trigger = getByRole('button');

    fireEvent.mouseDown(trigger);

    expect(handleBlur.callCount).to.equal(0);
    expect(getByRole('listbox')).to.be.ok;

    act(() => {
      const options = getAllByRole('option');
      fireEvent.mouseDown(options[0]);
      options[0].click();
    });

    expect(handleBlur.callCount).to.equal(0);
    expect(queryByRole('listbox', { hidden: false })).to.be.null;
  });

  it('options should have a data-value attribute', () => {
    const { getAllByRole } = render(
      <Select open value={10}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>,
      { baseElement: document.body },
    );
    const options = getAllByRole('option');

    expect(options[0]).to.have.attribute('data-value', '10');
    expect(options[1]).to.have.attribute('data-value', '20');
  });

  [' ', 'ArrowUp', 'ArrowDown', 'Enter'].forEach(key => {
    it(`should open menu when pressed ${key} key on select`, () => {
      const { getByRole } = render(
        <Select value="">
          <MenuItem value="">none</MenuItem>
        </Select>,
      );
      getByRole('button').focus();

      fireEvent.keyDown(document.activeElement, { key });

      expect(getByRole('listbox')).to.be.ok;
    });
  });

  it('should pass "name" as part of the event.target for onBlur', () => {
    const handleBlur = stub().callsFake(event => event.target.name);
    const { getByRole } = render(
      <Select onBlur={handleBlur} name="blur-testing" value="">
        <MenuItem value="">none</MenuItem>
      </Select>,
    );
    const button = getByRole('button');
    button.focus();

    button.blur();

    expect(handleBlur.callCount).to.equal(1);
    expect(handleBlur.firstCall.returnValue).to.equal('blur-testing');
  });

  it('should call onClose when the backdrop is clicked', () => {
    const handleClose = spy();
    const { getByTestId } = render(
      <Select
        MenuProps={{ BackdropProps: { 'data-testid': 'backdrop' } }}
        onClose={handleClose}
        open
        value=""
      >
        <MenuItem value="">none</MenuItem>
      </Select>,
    );

    act(() => {
      getByTestId('backdrop').click();
    });

    expect(handleClose.callCount).to.equal(1);
  });

  it('should focus list if no selection', () => {
    const { getByRole } = render(<Select value="" autoFocus />);

    fireEvent.mouseDown(getByRole('button'));

    // TODO not matching WAI-ARIA authoring practices. It should focus the first (or selected) item.
    expect(getByRole('listbox')).to.have.focus;
  });

  describe('prop: onChange', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should get selected element from arguments', () => {
      const onChangeHandler = spy();
      const { getAllByRole, getByRole } = render(
        <Select onChange={onChangeHandler} value="1">
          <MenuItem value="0" />
          <MenuItem value="1" />
          <MenuItem value="2" />
        </Select>,
      );
      fireEvent.mouseDown(getByRole('button'));
      getAllByRole('option')[1].click();

      expect(onChangeHandler.calledOnce).to.be.true;
      const selected = onChangeHandler.args[0][1];
      expect(React.isValidElement(selected)).to.equal(true);
    });
  });

  describe('prop: value', () => {
    it('should select the option based on the number value', () => {
      const { getAllByRole } = render(
        <Select open value={20}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
        { baseElement: document.body },
      );
      const options = getAllByRole('option');

      expect(options[0]).not.to.have.attribute('aria-selected', 'true');
      expect(options[1]).to.have.attribute('aria-selected', 'true');
      expect(options[2]).not.to.have.attribute('aria-selected', 'true');
    });

    it('should select the option based on the string value', () => {
      const { getAllByRole } = render(
        <Select open value="20">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
        { baseElement: document.body },
      );
      const options = getAllByRole('option');

      expect(options[0]).not.to.have.attribute('aria-selected', 'true');
      expect(options[1]).to.have.attribute('aria-selected', 'true');
      expect(options[2]).not.to.have.attribute('aria-selected', 'true');
    });

    it('should select only the option that matches the object', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const { getAllByRole } = render(
        <Select open value={obj1}>
          <MenuItem value={obj1}>1</MenuItem>
          <MenuItem value={obj2}>2</MenuItem>
        </Select>,
        { baseElement: document.body },
      );
      const options = getAllByRole('option');

      expect(options[0]).to.have.attribute('aria-selected', 'true');
      expect(options[1]).not.to.have.attribute('aria-selected', 'true');
    });

    it('should be able to use an object', () => {
      const value = {};
      const { getByRole } = render(
        <Select value={value}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={value}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );

      expect(getByRole('button')).to.have.text('Twenty');
    });

    describe('warnings', () => {
      let consoleWarnContainer = null;

      beforeEach(() => {
        consoleWarnContainer = console.warn;
        console.warn = spy();
      });

      afterEach(() => {
        console.warn = consoleWarnContainer;
        consoleWarnContainer = null;
      });

      it('warns when the value is not present in any option', () => {
        render(
          <Select value={20}>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>,
        );
        expect(console.warn.callCount).to.equal(1);
        expect(console.warn.args[0][0]).to.include(
          'Material-UI: you have provided an out-of-range value `20` for the select component.',
        );
      });
    });
  });

  describe('SVG icon', () => {
    it('should not present an SVG icon when native and multiple are specified', () => {
      const { container } = render(
        <Select native multiple value={[0, 1]}>
          <option value={0}>Zero</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
        </Select>,
      );
      expect(container.querySelector('svg')).to.be.null;
    });

    it('should present an SVG icon', () => {
      const { container } = render(
        <Select native value={1}>
          <option value={0}>Zero</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
        </Select>,
      );
      expect(container.querySelector('svg')).to.be.visible;
    });
  });

  describe('accessibility', () => {
    it('sets aria-expanded="true" when the listbox is displayed', () => {
      // since we make the rest of the UI inaccessible when open this doesn't
      // technically matter. This is only here in case we keep the rest accessible
      const { getByRole } = render(<Select open value="" />);

      expect(getByRole('button', { hidden: true })).to.have.attribute('aria-expanded', 'true');
    });

    specify('aria-expanded is not present if the listbox isnt displayed', () => {
      const { getByRole } = render(<Select value="" />);

      expect(getByRole('button')).not.to.have.attribute('aria-expanded');
    });

    it('indicates that activating the button displays a listbox', () => {
      const { getByRole } = render(<Select value="" />);

      expect(getByRole('button')).to.have.attribute('aria-haspopup', 'listbox');
    });

    it('renders an element with listbox behavior', () => {
      const { getByRole } = render(<Select open value="" />);

      expect(getByRole('listbox')).to.be.visible;
    });

    specify('the listbox is focusable', () => {
      const { getByRole } = render(<Select open value="" />);

      getByRole('listbox').focus();

      expect(getByRole('listbox')).to.have.focus;
    });

    it('identifies each selectable element containing an option', () => {
      const { getAllByRole } = render(
        <Select open value="">
          <MenuItem value="1">First</MenuItem>
          <MenuItem value="2">Second</MenuItem>
        </Select>,
      );

      const options = getAllByRole('option');
      expect(options[0]).to.have.text('First');
      expect(options[1]).to.have.text('Second');
    });

    it('indicates the selected option', () => {
      const { getAllByRole } = render(
        <Select open value="2">
          <MenuItem value="1">First</MenuItem>
          <MenuItem value="2">Second</MenuItem>
        </Select>,
      );

      expect(getAllByRole('option')[1]).to.have.attribute('aria-selected', 'true');
    });

    it('it will fallback to its content for the accessible name when it has no name', () => {
      const { getByRole } = render(<Select value="" />);

      expect(getByRole('button')).to.have.attribute('aria-labelledby', ' ');
    });

    it('is labelled by itself when it has a name', () => {
      const { getByRole } = render(<Select name="select" value="" />);

      expect(getByRole('button')).to.have.attribute(
        'aria-labelledby',
        ` ${getByRole('button').getAttribute('id')}`,
      );
    });

    it('is labelled by itself when it has an id which is preferred over name', () => {
      const { getAllByRole } = render(
        <React.Fragment>
          <span id="select-1-label">Chose first option:</span>
          <Select id="select-1" labelId="select-1-label" name="select" value="" />
          <span id="select-2-label">Chose second option:</span>
          <Select id="select-2" labelId="select-2-label" name="select" value="" />
        </React.Fragment>,
      );

      const triggers = getAllByRole('button');

      expect(triggers[0]).to.have.attribute(
        'aria-labelledby',
        `select-1-label ${triggers[0].getAttribute('id')}`,
      );
      expect(triggers[1]).to.have.attribute(
        'aria-labelledby',
        `select-2-label ${triggers[1].getAttribute('id')}`,
      );
    });

    it('can be labelled by an additional element if its id is provided in `labelId`', () => {
      const { getByRole } = render(
        <React.Fragment>
          <span id="select-label">Choose one:</span>
          <Select labelId="select-label" name="select" value="" />
        </React.Fragment>,
      );

      expect(getByRole('button')).to.have.attribute(
        'aria-labelledby',
        `select-label ${getByRole('button').getAttribute('id')}`,
      );
    });

    specify('the list of options is not labelled by default', () => {
      const { getByRole } = render(<Select open value="" />);

      expect(getByRole('listbox')).not.to.have.attribute('aria-labelledby');
    });

    specify('the list of options can be labelled by providing `labelId`', () => {
      const { getByRole } = render(
        <React.Fragment>
          <span id="select-label">Choose one:</span>
          <Select labelId="select-label" open value="" />
        </React.Fragment>,
      );

      expect(getByRole('listbox')).to.have.attribute('aria-labelledby', 'select-label');
    });
  });

  describe('prop: readOnly', () => {
    it('should not trigger any event with readOnly', () => {
      const { getByRole, queryByRole } = render(
        <Select readOnly value="10">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
        </Select>,
        { baseElement: document.body },
      );
      getByRole('button').focus();

      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

      expect(queryByRole('listbox')).not.to.be.ok;
    });
  });

  describe('prop: MenuProps', () => {
    let clock;

    beforeEach(() => {
      clock = useFakeTimers();
    });

    afterEach(() => {
      clock.restore();
    });

    it('should apply additional props to the Menu component', () => {
      const onEntered = spy();
      const { getByRole } = render(
        <Select MenuProps={{ onEntered, transitionDuration: 100 }} value="10">
          <MenuItem value="10">Ten</MenuItem>
        </Select>,
      );

      fireEvent.mouseDown(getByRole('button'));
      act(() => {
        clock.tick(99);
      });

      expect(onEntered.callCount).to.equal(0);

      act(() => {
        clock.tick(1);
      });

      expect(onEntered.callCount).to.equal(1);
    });

    it('should be able to override PaperProps minWidth', () => {
      const { getByTestId } = render(
        <Select
          MenuProps={{ PaperProps: { 'data-testid': 'paper', style: { minWidth: 12 } } }}
          open
          value="10"
        >
          <MenuItem value="10">Ten</MenuItem>
        </Select>,
      );

      expect(getByTestId('paper').style).to.have.property('minWidth', '12px');
    });
  });

  describe('prop: SelectDisplayProps', () => {
    it('should apply additional props to trigger element', () => {
      const { getByRole } = render(
        <Select SelectDisplayProps={{ 'data-test': 'SelectDisplay' }} value="10">
          <MenuItem value="10">Ten</MenuItem>
        </Select>,
      );

      expect(getByRole('button')).to.have.attribute('data-test', 'SelectDisplay');
    });
  });

  describe('prop: displayEmpty', () => {
    it('should display the selected item even if its value is empty', () => {
      const { getByRole } = render(
        <Select value="" displayEmpty>
          <MenuItem value="">Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );

      expect(getByRole('button')).to.have.text('Ten');
    });
  });

  describe('prop: renderValue', () => {
    it('should use the prop to render the value', () => {
      const renderValue = x => `0b${x.toString(2)}`;
      const { getByRole } = render(
        <Select renderValue={renderValue} value={4}>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>,
      );

      expect(getByRole('button')).to.have.text('0b100');
    });
  });

  describe('prop: open (controlled)', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should allow to control closing by passing onClose props', () => {
      function ControlledWrapper() {
        const [open, setOpen] = React.useState(false);

        return (
          <Select
            MenuProps={{ transitionDuration: 0 }}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            value=""
          >
            <MenuItem onClick={() => setOpen(false)}>close</MenuItem>
          </Select>
        );
      }
      const { getByRole, queryByRole } = render(<ControlledWrapper />);

      fireEvent.mouseDown(getByRole('button'));
      expect(getByRole('listbox')).to.be.ok;

      act(() => {
        getByRole('option').click();
      });
      // react-transition-group uses one extra commit for exit to completely remove
      // it from the DOM. but it's at least immediately inaccessible.
      // It's desired that this fails one day. The additional tick required to remove
      // this from the DOM is not a feature
      expect(getByRole('listbox', { hidden: true })).to.be.inaccessible;
      act(() => {
        clock.tick(0);
      });

      expect(queryByRole('listbox', { hidden: true })).to.be.null;
    });

    it('should be open when initially true', () => {
      const { getByRole } = render(
        <Select open value="">
          <MenuItem>Hello</MenuItem>
        </Select>,
      );

      expect(getByRole('listbox')).to.be.ok;
    });
  });

  describe('prop: autoWidth', () => {
    it('should take the trigger width into account by default', () => {
      const { getByRole, getByTestId } = render(
        <Select MenuProps={{ PaperProps: { 'data-testid': 'paper' } }} value="">
          <MenuItem>Only</MenuItem>
        </Select>,
      );
      const button = getByRole('button');
      stub(button, 'clientWidth').get(() => 14);

      fireEvent.mouseDown(button);
      expect(getByTestId('paper').style).to.have.property('minWidth', '14px');
    });

    it('should not take the triger width into account when autoWidth is true', () => {
      const { getByRole, getByTestId } = render(
        <Select autoWidth MenuProps={{ PaperProps: { 'data-testid': 'paper' } }} value="">
          <MenuItem>Only</MenuItem>
        </Select>,
      );
      const button = getByRole('button');
      stub(button, 'clientWidth').get(() => 14);

      fireEvent.mouseDown(button);
      expect(getByTestId('paper').style).to.have.property('minWidth', '');
    });
  });

  describe('prop: multiple', () => {
    it('should serialize multiple select value', () => {
      const { container, getAllByRole } = render(
        <Select multiple open value={[10, 30]}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );
      const options = getAllByRole('option');

      expect(container.querySelector('input')).to.have.property('value', '10,30');
      expect(options[0]).to.have.attribute('aria-selected', 'true');
      expect(options[1]).not.to.have.attribute('aria-selected', 'true');
      expect(options[2]).to.have.attribute('aria-selected', 'true');
    });

    it('selects value based on their stringified equality when theyre not objects', () => {
      const { getAllByRole } = render(
        <Select multiple open value={['10', '20']}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );
      const options = getAllByRole('option');

      expect(options[0]).to.have.attribute('aria-selected', 'true');
      expect(options[1]).to.have.attribute('aria-selected', 'true');
      expect(options[2]).not.to.have.attribute('aria-selected', 'true');
    });

    it('selects values based on strict equlity if theyre objects', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const obj3 = { id: 3 };
      const { getAllByRole } = render(
        <Select multiple open value={[obj1, obj3]}>
          <MenuItem value={obj1}>ID: 1</MenuItem>
          <MenuItem value={obj2}>ID: 2</MenuItem>
          <MenuItem value={obj3}>ID: 3</MenuItem>
        </Select>,
      );
      const options = getAllByRole('option');

      expect(options[0]).to.have.attribute('aria-selected', 'true');
      expect(options[1]).not.to.have.attribute('aria-selected', 'true');
      expect(options[2]).to.have.attribute('aria-selected', 'true');
    });

    describe('errors', () => {
      beforeEach(() => {
        consoleErrorMock.spy();
      });

      afterEach(() => {
        consoleErrorMock.reset();
      });

      it('should throw if non array', function test() {
        if (!/jsdom/.test(window.navigator.userAgent)) {
          // afterEach is not run since the only test in this block is skipped
          // this is likely a bug in mocha
          consoleErrorMock.reset();
          // can't catch render errors in the browser for unknown reason
          // tried try-catch + error boundary + window onError preventDefault
          this.skip();
        }

        expect(() => {
          render(
            <Select multiple value="10,20">
              <MenuItem value="10">Ten</MenuItem>
              <MenuItem value="20">Twenty</MenuItem>
              <MenuItem value="30">Thirty</MenuItem>
            </Select>,
          );
        }).to.throw(/the `value` prop must be an array/);
      });
    });

    describe('prop: onChange', () => {
      it('should call onChange when clicking an item', () => {
        function ControlledSelectInput(props) {
          // eslint-disable-next-line react/prop-types
          const { onChange } = props;
          const [values, clickedValue] = React.useReducer((currentValues, valueClicked) => {
            if (currentValues.indexOf(valueClicked) === -1) {
              return currentValues.concat(valueClicked);
            }
            return currentValues.filter(value => {
              return value !== valueClicked;
            });
          }, []);

          const handleChange = event => {
            onChange(event);
            clickedValue(event.target.value);
          };

          return (
            <Select multiple name="age" onChange={handleChange} value={values}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Ten</MenuItem>
              <MenuItem value={30}>Ten</MenuItem>
            </Select>
          );
        }
        const onChange = stub().callsFake(event => {
          return {
            name: event.target.name,
            value: event.target.value,
          };
        });
        const { getByRole, getAllByRole } = render(<ControlledSelectInput onChange={onChange} />);

        fireEvent.mouseDown(getByRole('button'));
        const options = getAllByRole('option');
        fireEvent.click(options[2]);

        expect(onChange.callCount).to.equal(1);
        expect(onChange.firstCall.returnValue).to.deep.equal({ name: 'age', value: [30] });

        act(() => {
          options[0].click();
        });

        expect(onChange.callCount).to.equal(2);
        expect(onChange.secondCall.returnValue).to.deep.equal({ name: 'age', value: [30, 10] });
      });
    });
  });

  describe('prop: autoFocus', () => {
    it('should focus select after Select did mount', () => {
      const { getByRole } = render(<Select value="" autoFocus />);

      expect(getByRole('button')).to.have.focus;
    });
  });

  it('should be able to return the input node via a ref object', () => {
    const ref = React.createRef();
    const { setProps } = render(<Select inputProps={{ ref }} value="" />);

    expect(ref.current.node).to.have.property('tagName', 'INPUT');

    setProps({
      value: '',
    });
    expect(ref.current.node).to.have.property('tagName', 'INPUT');
  });

  describe('prop: inputRef', () => {
    it('should be able to return the input node via a ref object', () => {
      const ref = React.createRef();
      render(<Select inputRef={ref} value="" />);

      expect(ref.current.node).to.have.property('tagName', 'INPUT');
    });

    // TODO: This might be confusing a prop called input!Ref can imperatively
    // focus a button. This implies <input type="button" /> is still used.
    it('should be able focus the trigger imperatively', () => {
      const ref = React.createRef();
      const { getByRole } = render(<Select inputRef={ref} value="" />);

      act(() => {
        ref.current.focus();
      });

      expect(getByRole('button')).to.have.focus;
    });
  });

  describe('prop: name', () => {
    it('should have no id when name is not provided', () => {
      const { getByRole } = render(<Select value="" />);

      expect(getByRole('button')).not.to.have.attribute('id');
    });

    it('should have select-`name` id when name is provided', () => {
      const { getByRole } = render(<Select name="foo" value="" />);

      expect(getByRole('button')).to.have.attribute('id', 'mui-component-select-foo');
    });
  });

  describe('prop: native', () => {
    it('renders a <select />', () => {
      const { container } = render(<Select native />);

      expect(container.querySelector('select')).not.to.be.null;
    });

    it('can be labelled with a <label />', () => {
      const { getByLabelText } = render(
        <React.Fragment>
          <label htmlFor="select">A select</label>
          <Select id="select" native />
        </React.Fragment>,
      );

      expect(getByLabelText('A select')).to.have.property('tagName', 'SELECT');
    });
  });
});
