import * as React from 'react';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import {
  describeConformance,
  ErrorBoundary,
  act,
  createRenderer,
  fireEvent,
  screen,
} from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Select, { selectClasses as classes } from '@mui/joy/Select';
import Option from '@mui/joy/Option';

describe('Joy <Select />', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  describeConformance(<Select value="" />, () => ({
    render,
    classes,
    ThemeProvider,
    refInstanceof: window.HTMLDivElement,
    muiName: 'JoySelect',
    skip: ['classesRoot', 'propsSpread', 'componentProp', 'componentsProp'],
  }));

  it('should be able to mount the component', () => {
    render(
      <Select value={10}>
        <Option value="">
          <em>None</em>
        </Option>
        <Option value={10}>Ten</Option>
        <Option value={20}>Twenty</Option>
        <Option value={30}>Thirty</Option>
      </Select>,
    );

    expect(screen.getByRole('button')).to.have.text('Ten');
  });

  specify('the trigger is in tab order', () => {
    const { getByRole } = render(
      <Select value="">
        <Option value="">None</Option>
      </Select>,
    );

    expect(getByRole('button')).to.have.property('tabIndex', 0);
  });

  it('should accept null child', () => {
    render(
      <Select defaultListboxOpen value={10}>
        {null}
        <Option value={10}>Ten</Option>
      </Select>,
    );
  });

  it('should pass "name" as part of the event.target for onBlur', () => {
    const handleBlur = stub().callsFake((event) => event.target.name);
    const { getByRole } = render(
      <Select
        componentsProps={{
          button: {
            onBlur: handleBlur,
            name: 'blur-testing',
          },
        }}
        value=""
      >
        <Option value="">none</Option>
      </Select>,
    );
    const button = getByRole('button');
    act(() => {
      button.focus();
    });

    act(() => {
      button.blur();
    });

    expect(handleBlur.callCount).to.equal(1);
    expect(handleBlur.firstCall.returnValue).to.equal('blur-testing');
  });

  it('should call onClose when the same option is selected', () => {
    const handleChange = spy();
    const handleClose = spy();
    render(
      <Select defaultListboxOpen onChange={handleChange} onClose={handleClose} value="second">
        <Option value="first" />
        <Option value="second" />
      </Select>,
    );

    act(() => {
      screen.getByRole('option', { selected: true }).click();
    });

    expect(handleChange.callCount).to.equal(0);
    expect(handleClose.callCount).to.equal(1);
  });

  it('should focus list if no selection', () => {
    const { getByRole } = render(<Select value="" autoFocus />);

    fireEvent.click(getByRole('button'));

    // TODO not matching WAI-ARIA authoring practices. It should focus the first (or selected) item.
    expect(getByRole('listbox')).toHaveFocus();
  });

  describe('prop: onChange', () => {
    it('should get selected value from the 1st argument', () => {
      const onChangeHandler = spy();
      const { getAllByRole, getByRole } = render(
        <Select onChange={onChangeHandler} value="0">
          <Option value="0" />
          <Option value="1" />
          <Option value="2" />
        </Select>,
      );
      fireEvent.click(getByRole('button'));
      act(() => {
        getAllByRole('option')[1].click();
      });

      expect(onChangeHandler.calledOnce).to.equal(true);
      expect(onChangeHandler.args[0][0]).to.equal('1');
    });

    it('should not be called if selected element has the current value (value did not change)', () => {
      const onChangeHandler = spy();
      const { getAllByRole, getByRole } = render(
        <Select onChange={onChangeHandler} value="1">
          <Option value="0" />
          <Option value="1" />
          <Option value="2" />
        </Select>,
      );
      fireEvent.click(getByRole('button'));
      act(() => {
        getAllByRole('option')[1].click();
      });

      expect(onChangeHandler.callCount).to.equal(0);
    });
  });

  describe('prop: defaultOpen', () => {
    it('should be open on mount', () => {
      const { getByRole } = render(<Select defaultListboxOpen value="" />);
      expect(getByRole('button', { hidden: true })).to.have.attribute('aria-expanded', 'true');
    });
  });

  describe('prop: value', () => {
    it('should select the option based on the number value', () => {
      render(
        <Select defaultListboxOpen value={20}>
          <Option value={10}>Ten</Option>
          <Option value={20}>Twenty</Option>
          <Option value={30}>Thirty</Option>
        </Select>,
      );
      const options = screen.getAllByRole('option');

      expect(options[0]).not.to.have.attribute('aria-selected', 'true');
      expect(options[1]).to.have.attribute('aria-selected', 'true');
      expect(options[2]).not.to.have.attribute('aria-selected', 'true');
    });

    it('should not select the option based on the string value', () => {
      render(
        <Select defaultListboxOpen value="20">
          <Option value={10}>Ten</Option>
          <Option value={20}>Twenty</Option>
          <Option value={30}>Thirty</Option>
        </Select>,
      );
      const options = screen.getAllByRole('option');

      expect(options[0]).not.to.have.attribute('aria-selected', 'true');
      expect(options[1]).not.to.have.attribute('aria-selected', 'true');
      expect(options[2]).not.to.have.attribute('aria-selected', 'true');
    });

    it('should select only the option that matches the object', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      render(
        <Select defaultListboxOpen value={obj1}>
          <Option value={obj1}>1</Option>
          <Option value={obj2}>2</Option>
        </Select>,
      );
      const options = screen.getAllByRole('option');

      expect(options[0]).to.have.attribute('aria-selected', 'true');
      expect(options[1]).not.to.have.attribute('aria-selected', 'true');
    });

    it('should be able to use an object', () => {
      const value = {};
      const { getByRole } = render(
        <Select value={value}>
          <Option value="">
            <em>None</em>
          </Option>
          <Option value={10}>Ten</Option>
          <Option value={value}>Twenty</Option>
          <Option value={30}>Thirty</Option>
        </Select>,
      );

      expect(getByRole('button')).to.have.text('Twenty');
    });
  });
});
