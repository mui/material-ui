import React from 'react';
import { expect } from 'chai';
import { spy, stub, useFakeTimers } from 'sinon';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { act, cleanup, createClientRender, fireEvent } from 'test/utils/createClientRender';
import MenuItem from '../MenuItem';
import SelectInput from './SelectInput';

describe('<SelectInput />', () => {
  // StrictModeViolation: uses Popover
  const render = createClientRender({ strict: false });

  afterEach(() => {
    cleanup();
  });

  specify('the trigger is in tab order', () => {
    const { getByRole } = render(
      <SelectInput classes={{}} IconComponent="div" open value="">
        <MenuItem value="">None</MenuItem>
      </SelectInput>,
    );

    expect(getByRole('button')).to.have.property('tabIndex', 0);
  });

  it('options should have a data-value attribute', () => {
    const { getAllByRole } = render(
      <SelectInput classes={{}} IconComponent="div" open value={10}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </SelectInput>,
      { baseElement: document.body },
    );

    expect(getAllByRole('option')[0]).to.have.attribute('data-value', '10');
    expect(getAllByRole('option')[1]).to.have.attribute('data-value', '20');
  });

  it('should accept null child', () => {
    render(
      <SelectInput classes={{}} IconComponent="div" open value={10}>
        {null}
        <MenuItem value={10}>Ten</MenuItem>
      </SelectInput>,
    );
  });

  it('should have a input[type="hidden"] by default', () => {
    const { container } = render(
      <SelectInput classes={{}} IconComponent="div" value="10">
        <MenuItem value="10">Ten</MenuItem>
      </SelectInput>,
    );

    expect(container.querySelector('input')).to.have.property('type', 'hidden');
  });

  describe('prop: value', () => {
    it('should select the option based on the number value', () => {
      const { getAllByRole } = render(
        <SelectInput classes={{}} IconComponent="div" open value={20}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </SelectInput>,
        { baseElement: document.body },
      );

      expect(getAllByRole('option')[0]).not.to.have.attribute('aria-selected', 'true');
      expect(getAllByRole('option')[1]).to.have.attribute('aria-selected', 'true');
      expect(getAllByRole('option')[2]).not.to.have.attribute('aria-selected', 'true');
    });

    it('should select the option based on the string value', () => {
      const { getAllByRole } = render(
        <SelectInput classes={{}} IconComponent="div" open value="20">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </SelectInput>,
        { baseElement: document.body },
      );

      expect(getAllByRole('option')[0]).not.to.have.attribute('aria-selected', 'true');
      expect(getAllByRole('option')[1]).to.have.attribute('aria-selected', 'true');
      expect(getAllByRole('option')[2]).not.to.have.attribute('aria-selected', 'true');
    });

    it('should select only the option that matches the object', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const { getAllByRole } = render(
        <SelectInput classes={{}} IconComponent="div" open value={obj1}>
          <MenuItem value={obj1}>1</MenuItem>
          <MenuItem value={obj2}>2</MenuItem>
        </SelectInput>,
        { baseElement: document.body },
      );

      expect(getAllByRole('option')[0]).to.have.attribute('aria-selected', 'true');
      expect(getAllByRole('option')[1]).not.to.have.attribute('aria-selected', 'true');
    });
  });

  describe('prop: readOnly', () => {
    it('should not trigger any event with readOnly', () => {
      const { getByRole, queryByRole } = render(
        <SelectInput classes={{}} IconComponent="div" readOnly value="10">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
        </SelectInput>,
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
        <SelectInput
          classes={{}}
          IconComponent="div"
          MenuProps={{ onEntered, transitionDuration: 100 }}
          value="10"
        >
          <MenuItem value="10">Ten</MenuItem>
        </SelectInput>,
      );

      fireEvent.click(getByRole('button'));
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
        <SelectInput
          classes={{}}
          IconComponent="div"
          MenuProps={{ PaperProps: { 'data-testid': 'paper', style: { minWidth: 12 } } }}
          open
          value="10"
        >
          <MenuItem value="10">Ten</MenuItem>
        </SelectInput>,
      );

      expect(getByTestId('paper').style).to.have.property('minWidth', '12px');
    });
  });

  describe('prop: SelectDisplayProps', () => {
    it('should apply additional props to trigger element', () => {
      const { getByRole } = render(
        <SelectInput
          classes={{}}
          IconComponent="div"
          SelectDisplayProps={{ 'data-test': 'SelectDisplay' }}
          value="10"
        >
          <MenuItem value="10">Ten</MenuItem>
        </SelectInput>,
      );

      expect(getByRole('button')).to.have.attribute('data-test', 'SelectDisplay');
    });
  });

  describe('prop: displayEmpty', () => {
    it('should display the selected item even if its value is empty', () => {
      const { getByRole } = render(
        <SelectInput classes={{}} IconComponent="div" value="" displayEmpty>
          <MenuItem value="">Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </SelectInput>,
      );

      expect(getByRole('button')).to.have.text('Ten');
    });
  });

  describe('prop: renderValue', () => {
    it('should use the prop to render the value', () => {
      const renderValue = x => `0b${x.toString(2)}`;
      const { getByRole } = render(
        <SelectInput classes={{}} IconComponent="div" renderValue={renderValue} value={4}>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </SelectInput>,
      );

      expect(getByRole('button')).to.have.text('0b100');
    });
  });

  describe('prop: onChange', () => {
    let clock;

    before(() => {
      clock = useFakeTimers();
    });

    after(() => {
      clock.restore();
    });

    it('should call onChange when clicking an item', () => {
      const handleChange = stub().callsFake(event => event.target.value);
      const { getByRole, getAllByRole, queryByRole } = render(
        <SelectInput
          classes={{}}
          IconComponent="div"
          MenuProps={{ transitionDuration: 0 }}
          onChange={handleChange}
          value=""
        >
          <MenuItem value="">none</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
        </SelectInput>,
      );

      fireEvent.click(getByRole('button'));
      fireEvent.click(getAllByRole('option')[1]);
      act(() => {
        clock.tick(0);
      });

      expect(handleChange.calledOnce).to.be.true;
      expect(handleChange.firstCall.returnValue).to.equal(10);
      expect(queryByRole('listbox')).to.be.null;
    });

    it('should ignore onBlur the first time the menu is open', () => {
      // mousedown calls focus while click opens moving the focus to an item
      // this means the trigger is blurred immediately
      const handleBlur = spy();
      const { getByRole, getAllByRole } = render(
        <SelectInput classes={{}} IconComponent="div" onBlur={handleBlur} value="">
          <MenuItem value="">none</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
        </SelectInput>,
      );

      const trigger = getByRole('button');
      // simulating user click
      fireEvent.mouseDown(trigger);
      trigger.focus();
      trigger.click();

      expect(handleBlur.callCount).to.equal(0);
      expect(getByRole('listbox')).to.be.ok;

      act(() => {
        getAllByRole('option')[0].click();
      });
      trigger.blur();

      expect(handleBlur.callCount).to.equal(1);
    });

    it('should pass "name" as part of the event.target for onBlur', () => {
      const handleBlur = stub().callsFake(event => event.target.name);
      const { getByRole } = render(
        <SelectInput
          classes={{}}
          IconComponent="div"
          onBlur={handleBlur}
          name="blur-testing"
          value=""
        >
          <MenuItem value="">none</MenuItem>
        </SelectInput>,
      );
      getByRole('button').focus();

      getByRole('button').blur();

      expect(handleBlur.callCount).to.equal(1);
      expect(handleBlur.firstCall.returnValue).to.equal('blur-testing');
    });

    [' ', 'ArrowUp', 'ArrowDown', 'Enter'].forEach(key => {
      it(`'should open menu when pressed ${key} key on select`, () => {
        const { getByRole } = render(
          <SelectInput classes={{}} IconComponent="div" value="">
            <MenuItem value="">none</MenuItem>
          </SelectInput>,
        );
        getByRole('button').focus();

        fireEvent.keyDown(document.activeElement, { key });

        expect(getByRole('listbox')).to.be.ok;
      });
    });

    it('should call onClose when the backdrop is clicked', () => {
      const handleClose = spy();
      const { getByTestId } = render(
        <SelectInput
          classes={{}}
          IconComponent="div"
          MenuProps={{ BackdropProps: { 'data-testid': 'backdrop' } }}
          onClose={handleClose}
          open
          value=""
        >
          <MenuItem value="">none</MenuItem>
        </SelectInput>,
      );

      act(() => {
        getByTestId('backdrop').click();
      });

      expect(handleClose.callCount).to.equal(1);
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
          <SelectInput
            classes={{}}
            IconComponent="div"
            MenuProps={{ transitionDuration: 0 }}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            value=""
          >
            <MenuItem onClick={() => setOpen(false)}>close</MenuItem>
          </SelectInput>
        );
      }
      const { getByRole, queryByRole } = render(<ControlledWrapper />);

      act(() => {
        getByRole('button').click();
      });

      expect(getByRole('listbox')).to.be.ok;

      act(() => {
        getByRole('option').click();
      });
      // react-transition-group uses one extra commit for exit
      // it is desired that this assertion breaks some day. Current behavior adds
      // and unnecessary commit artifically slowing down the exit transition
      expect(getByRole('listbox')).to.be.ok;
      act(() => {
        clock.tick(0);
      });

      expect(queryByRole('listbox')).to.be.null;
    });

    it('should be open when initially true', () => {
      const { getByRole } = render(
        <SelectInput classes={{}} IconComponent="div" open value="">
          <MenuItem>Hello</MenuItem>
        </SelectInput>,
      );

      expect(getByRole('listbox')).to.be.ok;
    });
  });

  describe('prop: autoWidth', () => {
    it('should take the trigger width into account by default', () => {
      const { getByRole, getByTestId } = render(
        <SelectInput
          classes={{}}
          IconComponent="div"
          MenuProps={{ PaperProps: { 'data-testid': 'paper' } }}
          value=""
        >
          <MenuItem>Only</MenuItem>
        </SelectInput>,
      );
      stub(getByRole('button'), 'clientWidth').get(() => 14);

      act(() => {
        getByRole('button').click();
      });

      expect(getByTestId('paper').style).to.have.property('minWidth', '14px');
    });

    it('should not take the triger width into account when autoWidth is true', () => {
      const { getByRole, getByTestId } = render(
        <SelectInput
          autoWidth
          classes={{}}
          IconComponent="div"
          MenuProps={{ PaperProps: { 'data-testid': 'paper' } }}
          value=""
        >
          <MenuItem>Only</MenuItem>
        </SelectInput>,
      );
      stub(getByRole('button'), 'clientWidth').get(() => 14);

      act(() => {
        getByRole('button').click();
      });

      expect(getByTestId('paper').style).to.have.property('minWidth', '');
    });
  });

  describe('prop: multiple', () => {
    it('should serialize multiple select value', () => {
      const { container, getAllByRole } = render(
        <SelectInput classes={{}} IconComponent="div" multiple open value={[10, 30]}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </SelectInput>,
      );

      expect(container.querySelector('input')).to.have.property('value', '10,30');
      expect(getAllByRole('option')[0]).to.have.attribute('aria-selected', 'true');
      expect(getAllByRole('option')[1]).not.to.have.attribute('aria-selected', 'true');
      expect(getAllByRole('option')[2]).to.have.attribute('aria-selected', 'true');
    });

    it('selects value based on their stringified equality when theyre not objects', () => {
      const { getAllByRole } = render(
        <SelectInput classes={{}} IconComponent="div" multiple open value={['10', '20']}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </SelectInput>,
      );

      expect(getAllByRole('option')[0]).to.have.attribute('aria-selected', 'true');
      expect(getAllByRole('option')[1]).to.have.attribute('aria-selected', 'true');
      expect(getAllByRole('option')[2]).not.to.have.attribute('aria-selected', 'true');
    });

    it('selects values based on strict equlity if theyre objects', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const obj3 = { id: 3 };
      const { getAllByRole } = render(
        <SelectInput classes={{}} IconComponent="div" multiple open value={[obj1, obj3]}>
          <MenuItem value={obj1}>ID: 1</MenuItem>
          <MenuItem value={obj2}>ID: 2</MenuItem>
          <MenuItem value={obj3}>ID: 3</MenuItem>
        </SelectInput>,
      );

      expect(getAllByRole('option')[0]).to.have.attribute('aria-selected', 'true');
      expect(getAllByRole('option')[1]).not.to.have.attribute('aria-selected', 'true');
      expect(getAllByRole('option')[2]).to.have.attribute('aria-selected', 'true');
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
            <SelectInput classes={{}} IconComponent="div" multiple value="10,20">
              <MenuItem value="10">Ten</MenuItem>
              <MenuItem value="20">Twenty</MenuItem>
              <MenuItem value="30">Thirty</MenuItem>
            </SelectInput>,
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

          function handleChange(event) {
            onChange(event);
            clickedValue(event.target.value);
          }

          return (
            <SelectInput
              classes={{}}
              IconComponent="div"
              multiple
              name="age"
              onChange={handleChange}
              value={values}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Ten</MenuItem>
              <MenuItem value={30}>Ten</MenuItem>
            </SelectInput>
          );
        }
        const onChange = stub().callsFake(event => {
          return {
            name: event.target.name,
            value: event.target.value,
          };
        });
        const { getByRole, getAllByRole } = render(<ControlledSelectInput onChange={onChange} />);

        fireEvent.click(getByRole('button'));
        fireEvent.click(getAllByRole('option')[2]);

        expect(onChange.callCount).to.equal(1);
        expect(onChange.firstCall.returnValue).to.deep.equal({ name: 'age', value: [30] });

        act(() => {
          getByRole('button').click();
        });
        act(() => {
          getAllByRole('option')[0].click();
        });

        expect(onChange.callCount).to.equal(2);
        expect(onChange.secondCall.returnValue).to.deep.equal({ name: 'age', value: [30, 10] });
      });
    });
  });

  describe('no selection', () => {
    it('should focus list if no selection', () => {
      const { getByRole } = render(
        <SelectInput classes={{}} IconComponent="div" value="" autoFocus />,
      );

      act(() => {
        getByRole('button').click();
      });

      // TODO not matching WAI-ARIA authoring practices. It should focus the first (or selected) item.
      expect(getByRole('listbox')).to.be.focused;
    });
  });

  describe('prop: autoFocus', () => {
    it('should focus select after SelectInput did mount', () => {
      const { getByRole } = render(
        <SelectInput classes={{}} IconComponent="div" value="" autoFocus />,
      );

      expect(getByRole('button')).to.be.focused;
    });
  });

  it('should be able to return the input node via a ref object', () => {
    const ref = React.createRef();
    const { setProps } = render(
      <SelectInput classes={{}} IconComponent="div" ref={ref} value="" />,
    );

    expect(ref.current.node).to.have.property('tagName', 'INPUT');

    setProps({
      value: 20,
    });
    expect(ref.current.node).to.have.property('tagName', 'INPUT');
  });

  describe('prop: inputRef', () => {
    it('should be able to return the input node via a ref object', () => {
      const ref = React.createRef();
      render(<SelectInput classes={{}} IconComponent="div" inputRef={ref} value="" />);

      expect(ref.current.node).to.have.property('tagName', 'INPUT');
    });

    // TODO: This might be confusing a prop called input!Ref can imperatively
    // focus a button. This implies <input type="button" /> is still used.
    it('should be able focus the trigger imperatively', () => {
      const ref = React.createRef();
      const { getByRole } = render(
        <SelectInput classes={{}} IconComponent="div" inputRef={ref} value="" />,
      );

      act(() => {
        ref.current.focus();
      });

      expect(getByRole('button')).to.be.focused;
    });
  });

  describe('prop: name', () => {
    it('should have no id when name is not provided', () => {
      const { getByRole } = render(<SelectInput classes={{}} IconComponent="div" value="" />);

      expect(getByRole('button')).not.to.have.attribute('id');
    });

    it('should have select-`name` id when name is provided', () => {
      const { getByRole } = render(
        <SelectInput classes={{}} IconComponent="div" name="foo" value="" />,
      );

      expect(getByRole('button')).to.have.attribute('id', 'select-foo');
    });
  });
});
