import * as React from 'react';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import userEvent from '@testing-library/user-event';
import {
  describeConformance,
  ErrorBoundary,
  act,
  createRenderer,
  fireEvent,
  screen,
} from '@mui-internal/test-utils';
import { nativeSelectClasses } from '@mui/material/NativeSelect';
// TODO v6: replace with material-next's extendTheme and provider when implementing Material You design
import { createTheme, ThemeProvider } from '@mui/material/styles';
// TODO v6: replace with material-next ListSubheader when available
import ListSubheader from '@mui/material/ListSubheader';
// TODO v6: replace with material-next OutlinedInput when available
import OutlinedInput from '@mui/material/OutlinedInput';
// TODO v6: replace with material-next InputLabel when available
import InputLabel from '@mui/material/InputLabel';
// TODO v6: replace with material-next Divider when available
import Divider from '@mui/material/Divider';
import Select from '@mui/material-next/Select';
import Option, { optionClasses } from '@mui/material-next/Option';
import classes from './selectClasses';

describe('<Select />', () => {
  const { clock, render } = createRenderer({ clock: 'fake' });

  describeConformance(<Select value="" />, () => ({
    classes,
    inheritComponent: OutlinedInput,
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiSelect',
    skip: ['componentProp', 'componentsProp', 'themeVariants', 'themeStyleOverrides'],
  }));

  describe('prop: inputProps', () => {
    it('should be able to provide a custom classes property', () => {
      render(
        <Select
          inputProps={{
            classes: { select: 'select' },
          }}
          value=""
        />,
      );
      expect(document.querySelector(`.${classes.select}`)).to.have.class('select');
    });
  });

  it('should be able to mount the component', () => {
    const { container } = render(
      <Select value={10}>
        <Option value="">
          <em>None</em>
        </Option>
        <Option value={10}>Ten</Option>
        <Option value={20}>Twenty</Option>
        <Option value={30}>Thirty</Option>
      </Select>,
    );

    expect(container.querySelector('input')).to.have.property('value', '10');
  });

  specify('the trigger is in tab order', () => {
    const { getByRole } = render(
      <Select value="">
        <Option value="">None</Option>
      </Select>,
    );

    expect(getByRole('combobox')).to.have.property('tabIndex', 0);
  });

  it('should accept null child', () => {
    render(
      <Select open value={10}>
        {null}
        <Option value={10}>Ten</Option>
      </Select>,
    );
  });

  ['', 0, false, undefined, NaN].forEach((value) =>
    it(`should support conditional rendering with "${value}"`, () => {
      render(
        <Select open value={2}>
          {value && <Option value={1}>One</Option>}
          <Option value={2}>Two</Option>
        </Select>,
      );
    }),
  );

  describe('hidden input', () => {
    it('should have [aria-hidden] by default', () => {
      const { container } = render(
        <Select value="10">
          <Option value="10">Ten</Option>
        </Select>,
      );

      expect(container.querySelector('input')).to.have.attribute('aria-hidden', 'true');
    });

    it('should have tabIndex -1', () => {
      const { container } = render(
        <Select value="10">
          <Option value="10">Ten</Option>
        </Select>,
      );

      expect(container.querySelector('input')).to.have.attribute('tabindex', '-1');
    });
  });

  it('should ignore onBlur when the listbox opens', () => {
    // mousedown calls focus while click opens moving the focus to an item
    // this means the trigger is blurred immediately
    const handleBlur = spy();
    const { getByRole, getAllByRole, queryByRole } = render(
      <Select
        onBlur={handleBlur}
        value=""
        onMouseDown={(event) => {
          // simulating certain platforms that focus on mousedown
          if (event.defaultPrevented === false) {
            event.currentTarget.focus();
          }
        }}
      >
        <Option value="">none</Option>
        <Option value={10}>Ten</Option>
      </Select>,
    );
    const trigger = getByRole('combobox');

    fireEvent.click(trigger);

    expect(handleBlur.callCount).to.equal(0);
    expect(getByRole('listbox')).not.to.equal(null);

    act(() => {
      const options = getAllByRole('option');
      fireEvent.mouseDown(options[0]);
      options[0].click();
    });

    expect(handleBlur.callCount).to.equal(0);
    expect(queryByRole('listbox', { hidden: false })).to.equal(null);
  });

  it('options should have a data-value attribute', () => {
    render(
      <Select open value={10}>
        <Option value={10}>Ten</Option>
        <Option value={20}>Twenty</Option>
      </Select>,
    );
    const options = screen.getAllByRole('option');

    expect(options[0]).to.have.attribute('data-value', '10');
    expect(options[1]).to.have.attribute('data-value', '20');
  });

  describe('combobox keydown', () => {
    clock.withRealTimers();

    [' ', 'ArrowUp', 'ArrowDown', 'Enter'].forEach((key) => {
      it(`should open listbox when pressed ${key} key on combobox`, async () => {
        render(
          <Select value="">
            <Option value="">none</Option>
          </Select>,
        );
        const trigger = screen.getByRole('combobox');
        act(() => {
          trigger.focus();
        });

        await userEvent.keyboard(`{${key}}`);

        expect(screen.getByRole('listbox', { hidden: false })).not.to.equal(null);
      });
    });
  });

  it('should pass "name" as part of the event.target for onBlur', () => {
    const handleBlur = stub().callsFake((event) => event.target.name);
    const { getByRole } = render(
      <Select onBlur={handleBlur} name="blur-testing" value="">
        <Option value="">none</Option>
      </Select>,
    );
    const button = getByRole('combobox');
    act(() => {
      button.focus();
    });

    act(() => {
      button.blur();
    });

    expect(handleBlur.callCount).to.equal(1);
    expect(handleBlur.firstCall.returnValue).to.equal('blur-testing');
  });

  describe('backdrop', () => {
    clock.withRealTimers();

    it('should call onClose when the backdrop is clicked', async () => {
      const handleClose = spy();
      const { getByRole, getByTestId } = render(
        <Select
          PopoverProps={{
            slotProps: {
              root: { slotProps: { backdrop: { 'data-testid': 'backdrop' } } },
            },
          }}
          onClose={handleClose}
          value=""
        >
          <Option value="">none</Option>
        </Select>,
      );

      await userEvent.click(getByRole('combobox'));

      await userEvent.click(getByTestId('backdrop'));

      expect(handleClose.callCount).to.equal(1);
    });
  });

  it('should call onClose when the same option is selected', async () => {
    const handleChange = spy();
    const handleClose = spy();
    render(
      <Select open onChange={handleChange} onClose={handleClose} value="second">
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

  it('should focus select when its label is clicked', () => {
    const { getByRole, getByTestId } = render(
      <React.Fragment>
        <InputLabel id="my$label" data-testid="label" />
        <Select value="" labelId="my$label" />
      </React.Fragment>,
    );

    fireEvent.click(getByTestId('label'));

    expect(getByRole('combobox')).toHaveFocus();
  });

  it('should focus first option if no selection', () => {
    const { getByRole } = render(
      <Select value="" autoFocus>
        <Option value="1">One</Option>
      </Select>,
    );

    fireEvent.click(getByRole('combobox'));

    expect(getByRole('option')).toHaveFocus();
  });

  describe('prop: onChange', () => {
    // TODO v6: deprecate onChange's signature
    // TODO v7: update onChange to have Base's signature
    // it.skip('should get selected element from arguments', () => {
    //   const onChangeHandler = spy();
    //   const { getAllByRole, getByRole } = render(
    //     <Select onChange={onChangeHandler} value="0">
    //       <Option value="0" />
    //       <Option value="1" />
    //       <Option value="2" />
    //     </Select>,
    //   );
    //   fireEvent.mouseDown(getByRole('combobox'));
    //   act(() => {
    //     getAllByRole('option')[1].click();
    //   });

    //   expect(onChangeHandler.calledOnce).to.equal(true);
    //   const selected = onChangeHandler.args[0][1];
    //   expect(React.isValidElement(selected)).to.equal(true);
    // });

    it('should call onChange before onClose', () => {
      const eventLog = [];
      const onChangeHandler = spy(() => eventLog.push('CHANGE_EVENT'));
      const onCloseHandler = spy(() => eventLog.push('CLOSE_EVENT'));
      const { getAllByRole, getByRole } = render(
        <Select onChange={onChangeHandler} onClose={onCloseHandler} value="0">
          <Option value="0" />
          <Option value="1" />
        </Select>,
      );

      fireEvent.click(getByRole('combobox'));
      act(() => {
        getAllByRole('option')[1].click();
      });

      expect(eventLog).to.deep.equal(['CHANGE_EVENT', 'CLOSE_EVENT']);
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
      fireEvent.click(getByRole('combobox'));
      act(() => {
        getAllByRole('option')[1].click();
      });

      expect(onChangeHandler.callCount).to.equal(0);
    });
  });

  describe('prop: defaultOpen', () => {
    it('should be open on mount', () => {
      const { getByRole } = render(<Select defaultOpen value="" />);
      expect(getByRole('combobox', { hidden: true })).to.have.attribute('aria-expanded', 'true');
    });
  });

  describe('prop: value', () => {
    it('should select the option based on the number value', () => {
      render(
        <Select open value={20}>
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

    it('should select the option based on the string value', () => {
      render(
        <Select open value="20">
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

    it('should select only the option that matches the object', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      render(
        <Select open value={obj1}>
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

      expect(getByRole('combobox')).to.have.text('Twenty');
    });
  });

  describe('prop: defaultValue', () => {
    it('should select the option based on the number value', () => {
      render(
        <Select open defaultValue={20}>
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

    it('should select the option based on the string value', () => {
      render(
        <Select open defaultValue="20">
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

    it('should select only the option that matches the object', () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      render(
        <Select open defaultValue={obj1}>
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
        <Select defaultValue={value}>
          <Option value="">
            <em>None</em>
          </Option>
          <Option value={10}>Ten</Option>
          <Option value={value}>Twenty</Option>
          <Option value={30}>Thirty</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.text('Twenty');
    });
  });

  it('should not have the selectable option selected when inital value provided is empty string on Select with ListSubHeader item', () => {
    render(
      <Select open value="">
        <ListSubheader>Category 1</ListSubheader>
        <Option value={10}>Ten</Option>
        <ListSubheader>Category 2</ListSubheader>
        <Option value={20}>Twenty</Option>
        <Option value={30}>Thirty</Option>
      </Select>,
    );

    const options = screen.getAllByRole('option');
    expect(options[1]).not.to.have.class(optionClasses.selected);
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
      expect(container.querySelector('svg')).to.equal(null);
    });

    it('should present an SVG icon', () => {
      const { container } = render(
        <Select native value={1}>
          <option value={0}>Zero</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
        </Select>,
      );
      expect(container.querySelector('svg')).toBeVisible();
    });
  });

  describe('accessibility', () => {
    it('sets aria-expanded="true" when the listbox is displayed', () => {
      // since we make the rest of the UI inaccessible when open this doesn't
      // technically matter. This is only here in case we keep the rest accessible
      const { getByRole } = render(<Select open value="" />);

      expect(getByRole('combobox', { hidden: true })).to.have.attribute('aria-expanded', 'true');
    });

    specify('ARIA 1.2: aria-expanded="false" if the listbox isn\'t displayed', () => {
      const { getByRole } = render(<Select value="" />);

      expect(getByRole('combobox')).to.have.attribute('aria-expanded', 'false');
    });

    it('sets disabled attribute when component is disabled', () => {
      const { getByRole } = render(<Select disabled value="" />);

      expect(getByRole('combobox')).to.have.attribute('disabled');
    });

    it('sets disabled attribute in input when component is disabled', () => {
      const { container } = render(<Select disabled value="" />);

      expect(container.querySelector('input')).to.have.property('disabled', true);
    });

    specify('aria-disabled is not present if component is not disabled', () => {
      const { getByRole } = render(<Select disabled={false} value="" />);

      expect(getByRole('combobox')).not.to.have.attribute('aria-disabled');
    });

    it('indicates that activating the button displays a listbox', () => {
      const { getByRole } = render(<Select value="" />);

      expect(getByRole('combobox')).to.have.attribute('aria-haspopup', 'listbox');
    });

    it('renders an element with listbox behavior', () => {
      const { getByRole } = render(<Select open value="" />);

      expect(getByRole('listbox')).toBeVisible();
    });

    it('indicates that input element has combobox role and aria-controls set to id of listbox', () => {
      const { getByRole } = render(<Select open value="" />);
      const listboxId = getByRole('listbox').id;

      expect(getByRole('combobox', { hidden: true })).to.have.attribute('aria-controls', listboxId);
    });

    specify('the listbox is focusable', () => {
      const { getByRole } = render(<Select open value="" />);

      act(() => {
        getByRole('listbox').focus();
      });

      expect(getByRole('listbox')).toHaveFocus();
    });

    it('identifies each selectable element containing an option', () => {
      const { getAllByRole } = render(
        <Select open value="">
          <Option value="1">First</Option>
          <Option value="2">Second</Option>
        </Select>,
      );

      const options = getAllByRole('option');
      expect(options[0]).to.have.text('First');
      expect(options[1]).to.have.text('Second');
    });

    it('indicates the selected option', () => {
      const { getAllByRole } = render(
        <Select open value="2">
          <Option value="1">First</Option>
          <Option value="2">Second</Option>
        </Select>,
      );

      expect(getAllByRole('option')[1]).to.have.attribute('aria-selected', 'true');
    });

    describe('when the first child is a ListSubheader', () => {
      clock.withRealTimers();

      it('first selectable option is focused to use the arrow', async () => {
        const { getByRole, getAllByRole } = render(
          <Select defaultValue="">
            <ListSubheader>Category 1</ListSubheader>
            <Option value={1}>Option 1</Option>
            <Option value={2}>Option 2</Option>
            <ListSubheader>Category 2</ListSubheader>
            <Option value={3}>Option 3</Option>
            <Option value={4}>Option 4</Option>
          </Select>,
        );

        const trigger = getByRole('combobox');

        await userEvent.click(trigger);

        const options = getAllByRole('option');
        expect(options[0]).to.have.attribute('tabindex', '0');

        await userEvent.keyboard('{ArrowDown}');
        await userEvent.keyboard('{ArrowDown}');
        await userEvent.keyboard('{Enter}');

        expect(options[2]).to.have.attribute('aria-selected', 'true');
      });

      describe('when also the second child is a ListSubheader', () => {
        it('first selectable option is focused to use the arrow', async () => {
          const { getByRole, getAllByRole } = render(
            <Select defaultValue="">
              <ListSubheader>Empty category</ListSubheader>
              <ListSubheader>Category 1</ListSubheader>
              <Option value={1}>Option 1</Option>
              <Option value={2}>Option 2</Option>
              <ListSubheader>Category 2</ListSubheader>
              <Option value={3}>Option 3</Option>
              <Option value={4}>Option 4</Option>
            </Select>,
          );

          const trigger = getByRole('combobox');

          await userEvent.click(trigger);

          const options = getAllByRole('option');
          expect(options[0]).to.have.attribute('tabindex', '0');

          await userEvent.keyboard('{ArrowDown}');
          await userEvent.keyboard('{ArrowDown}');
          await userEvent.keyboard('{Enter}');

          expect(options[2]).to.have.attribute('aria-selected', 'true');
        });
      });

      describe('when the second child is null', () => {
        it('first selectable option is focused to use the arrow', async () => {
          const { getByRole, getAllByRole } = render(
            <Select defaultValue="">
              <ListSubheader>Category 1</ListSubheader>
              {null}
              <Option value={1}>Option 1</Option>
              <Option value={2}>Option 2</Option>
              <ListSubheader>Category 2</ListSubheader>
              <Option value={3}>Option 3</Option>
              <Option value={4}>Option 4</Option>
            </Select>,
          );

          const trigger = getByRole('combobox');

          await userEvent.click(trigger);

          const options = getAllByRole('option');
          expect(options[0]).to.have.attribute('tabindex', '0');

          await userEvent.keyboard('{ArrowDown}');
          await userEvent.keyboard('{ArrowDown}');
          await userEvent.keyboard('{Enter}');

          expect(options[2]).to.have.attribute('aria-selected', 'true');
        });
      });

      ['', 0, false, undefined, NaN].forEach((value) =>
        describe(`when the second child is conditionally rendering with "${value}"`, () => {
          it('first selectable option is focused to use the arrow', async () => {
            const { getByRole, getAllByRole } = render(
              <Select defaultValue="">
                <ListSubheader>Category 1</ListSubheader>
                {value && <Option value={1}>One</Option>}
                <Option value={1}>Option 1</Option>
                <Option value={2}>Option 2</Option>
                <ListSubheader>Category 2</ListSubheader>
                <Option value={3}>Option 3</Option>
                <Option value={4}>Option 4</Option>
              </Select>,
            );

            const trigger = getByRole('combobox');

            await userEvent.click(trigger);

            const options = getAllByRole('option');
            expect(options[0]).to.have.attribute('tabindex', '0');

            await userEvent.keyboard('{ArrowDown}');
            await userEvent.keyboard('{ArrowDown}');
            await userEvent.keyboard('{Enter}');

            expect(options[2]).to.have.attribute('aria-selected', 'true');
          });
        }),
      );
    });

    describe('when the first child is a ListSubheader wrapped in a custom component', () => {
      describe('with the `muiSkipListHighlight` static field', () => {
        function WrappedListSubheader(props) {
          return <ListSubheader {...props} />;
        }

        WrappedListSubheader.muiSkipListHighlight = true;

        it('highlights the first selectable option below the header', () => {
          const { getByText } = render(
            <Select defaultValue="" open>
              <WrappedListSubheader>Category 1</WrappedListSubheader>
              <Option value={1}>Option 1</Option>
              <Option value={2}>Option 2</Option>
              <WrappedListSubheader>Category 2</WrappedListSubheader>
              <Option value={3}>Option 3</Option>
              <Option value={4}>Option 4</Option>
            </Select>,
          );

          const expectedHighlightedOption = getByText('Option 1');
          expect(expectedHighlightedOption).to.have.attribute('tabindex', '0');
        });
      });

      describe('with the `muiSkipListHighlight` prop', () => {
        function WrappedListSubheader(props) {
          const { muiSkipListHighlight, ...other } = props;
          return <ListSubheader {...other} />;
        }

        it('highlights the first selectable option below the header', () => {
          const { getByText } = render(
            <Select defaultValue="" open>
              <WrappedListSubheader muiSkipListHighlight>Category 1</WrappedListSubheader>
              <Option value={1}>Option 1</Option>
              <Option value={2}>Option 2</Option>
              <WrappedListSubheader muiSkipListHighlight>Category 2</WrappedListSubheader>
              <Option value={3}>Option 3</Option>
              <Option value={4}>Option 4</Option>
            </Select>,
          );

          const expectedHighlightedOption = getByText('Option 1');
          expect(expectedHighlightedOption).to.have.attribute('tabindex', '0');
        });
      });
    });

    describe('when the first child is a disabled Option', () => {
      clock.withRealTimers();

      it('highlights the first selectable option below the header', async () => {
        const { getByRole, getAllByRole } = render(
          <Select defaultValue="">
            <Option value="" disabled>
              <em>None</em>
            </Option>
            <ListSubheader>Category 1</ListSubheader>
            <Option value={1}>Option 1</Option>
            <Option value={2}>Option 2</Option>
            <ListSubheader>Category 2</ListSubheader>
            <Option value={3}>Option 3</Option>
            <Option value={4}>Option 4</Option>
          </Select>,
        );

        const trigger = getByRole('combobox');

        await userEvent.click(trigger);

        const options = getAllByRole('option');
        expect(options[1]).to.have.attribute('tabindex', '0');

        await userEvent.keyboard('{ArrowDown}');
        await userEvent.keyboard('{ArrowDown}');
        await userEvent.keyboard('{Enter}');

        expect(options[3]).to.have.attribute('aria-selected', 'true');
      });
    });

    it('it will fallback to its content for the accessible name when it has no name', () => {
      const { getByRole } = render(<Select value="" />);

      // TODO what is the accessible name actually?
      expect(getByRole('combobox')).not.to.have.attribute('aria-labelledby');
    });

    it('is labelled by itself when it has a name', () => {
      const { getByRole } = render(<Select name="select" value="" />);

      expect(getByRole('combobox')).to.have.attribute(
        'aria-labelledby',
        getByRole('combobox').getAttribute('id'),
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

      const triggers = getAllByRole('combobox');

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

      expect(getByRole('combobox')).to.have.attribute(
        'aria-labelledby',
        `select-label ${getByRole('combobox').getAttribute('id')}`,
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

    it('should have appropriate accessible description when provided in props', () => {
      const { getByRole } = render(
        <React.Fragment>
          <Select aria-describedby="select-helper-text" value="" />
          <span id="select-helper-text">Helper text content</span>
        </React.Fragment>,
      );

      const target = getByRole('combobox');
      expect(target).to.have.attribute('aria-describedby', 'select-helper-text');
      expect(target).toHaveAccessibleDescription('Helper text content');
    });
  });

  describe('prop: readOnly', () => {
    it('should not trigger any event with readOnly', () => {
      render(
        <Select readOnly value="10">
          <Option value={10}>Ten</Option>
          <Option value={20}>Twenty</Option>
        </Select>,
      );
      const trigger = screen.getByRole('combobox');
      act(() => {
        trigger.focus();
      });

      fireEvent.keyDown(trigger, { key: 'ArrowDown' });
      expect(screen.getByRole('listbox', { hidden: true })).to.have.attribute(
        'aria-hidden',
        'true',
      );

      fireEvent.keyUp(trigger, { key: 'ArrowDown' });
      expect(screen.getByRole('listbox', { hidden: true })).to.have.attribute(
        'aria-hidden',
        'true',
      );
    });

    it('should not open on combobox click when readOnly', () => {
      const { getByRole } = render(
        <Select readOnly value="10">
          <Option value={10}>Ten</Option>
          <Option value={20}>Twenty</Option>
        </Select>,
      );

      act(() => {
        fireEvent.click(getByRole('combobox'));
      });

      expect(getByRole('listbox', { hidden: true })).to.have.attribute('aria-hidden', 'true');
    });
  });

  describe('prop: PopoverProps', () => {
    it('should apply additional props to the Popover component', () => {
      const onEntered = spy();
      const { getByRole } = render(
        <Select
          PopoverProps={{ TransitionProps: { onEntered }, transitionDuration: 100 }}
          value="10"
        >
          <Option value="10">Ten</Option>
        </Select>,
      );

      fireEvent.click(getByRole('combobox'));
      clock.tick(99);

      expect(onEntered.callCount).to.equal(0);

      clock.tick(1);

      expect(onEntered.callCount).to.equal(1);
    });

    it('should be able to override PaperProps minWidth', () => {
      const { getByTestId } = render(
        <Select
          PopoverProps={{ PaperProps: { 'data-testid': 'paper', style: { minWidth: 12 } } }}
          open
          value="10"
        >
          <Option value="10">Ten</Option>
        </Select>,
      );

      expect(getByTestId('paper').style).to.have.property('minWidth', '12px');
    });

    // https://github.com/mui/material-ui/issues/38700
    it('should merge `slotProps.paper` with the default Paper props', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const { getByTestId, getByRole } = render(
        <Select PopoverProps={{ slotProps: { paper: { 'data-testid': 'paper' } } }} open value="10">
          <Option value="10">Ten</Option>
        </Select>,
      );

      const paper = getByTestId('paper');
      const selectButton = getByRole('combobox', { hidden: true });

      expect(paper.style).to.have.property('minWidth', `${selectButton.clientWidth}px`);
    });

    // https://github.com/mui/material-ui/issues/38949
    it('should forward `slotProps` to popover', function test() {
      const { getByTestId } = render(
        <Select
          PopoverProps={{
            slotProps: {
              root: {
                slotProps: {
                  backdrop: { 'data-testid': 'backdrop', style: { backgroundColor: 'red' } },
                },
              },
            },
          }}
          open
          value="10"
        >
          <Option value="10">Ten</Option>
        </Select>,
      );

      const backdrop = getByTestId('backdrop');

      expect(backdrop.style).to.have.property('backgroundColor', 'red');
    });
  });

  describe('prop: SelectDisplayProps', () => {
    it('should apply additional props to trigger element', () => {
      const { getByRole } = render(
        <Select SelectDisplayProps={{ 'data-test': 'SelectDisplay' }} value="10">
          <Option value="10">Ten</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.attribute('data-test', 'SelectDisplay');
    });
  });

  describe('prop: displayEmpty', () => {
    it('should display the selected item even if its value is empty', () => {
      const { getByRole } = render(
        <Select value="" displayEmpty>
          <Option value="">Ten</Option>
          <Option value={20}>Twenty</Option>
          <Option value={30}>Thirty</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.text('Ten');
    });
  });

  describe('prop: renderValue', () => {
    it('should use the prop to render the value', () => {
      const renderValue = (x) => `0b${x.toString(2)}`;
      const { getByRole } = render(
        <Select renderValue={renderValue} value={4}>
          <Option value={2}>2</Option>
          <Option value={4}>4</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.text('0b100');
    });
  });

  describe('prop: open (controlled)', () => {
    it('should not focus on close controlled select', () => {
      function ControlledWrapper() {
        const [open, setOpen] = React.useState(false);

        return (
          <div>
            <button type="button" id="open-select" onClick={() => setOpen(true)}>
              Open select
            </button>
            <Select
              PopoverProps={{ transitionDuration: 0 }}
              open={open}
              onClose={() => setOpen(false)}
              value=""
            >
              <Option value="close" onClick={() => setOpen(false)}>
                close
              </Option>
            </Select>
          </div>
        );
      }
      const { container, getByRole } = render(<ControlledWrapper />);
      const openSelect = container.querySelector('#open-select');
      act(() => {
        openSelect.focus();
      });
      fireEvent.click(openSelect);

      const option = getByRole('option');
      expect(option).toHaveFocus();
      fireEvent.click(option);

      expect(container.querySelectorAll(classes.focused).length).to.equal(0);
      expect(openSelect).toHaveFocus();
    });

    it('should allow to control closing by passing onClose props', () => {
      function ControlledWrapper() {
        const [open, setOpen] = React.useState(false);

        return (
          <Select
            PopoverProps={{ transitionDuration: 0 }}
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            value=""
          >
            <Option onClick={() => setOpen(false)} value="close">
              close
            </Option>
          </Select>
        );
      }
      const { getByRole, queryByRole } = render(<ControlledWrapper />);

      fireEvent.click(getByRole('combobox'));
      expect(getByRole('listbox')).not.to.equal(null);

      act(() => {
        getByRole('option').click();
      });

      expect(getByRole('listbox', { hidden: true })).toBeInaccessible();
      clock.tick(0);

      expect(queryByRole('listbox', { hidden: true })).not.to.equal(null);
    });

    it('should be open when initially true', () => {
      const { getByRole } = render(
        <Select open value="">
          <Option value="hello">Hello</Option>
        </Select>,
      );

      expect(getByRole('listbox')).not.to.equal(null);
    });

    it('open only with the left mouse button click', () => {
      // Test for https://github.com/mui/material-ui/issues/19250#issuecomment-578620934
      // Right/middle mouse click shouldn't open the Select
      const { getByRole, queryByRole } = render(
        <Select value="">
          <Option value="">
            <em>None</em>
          </Option>
          <Option value={10}>Ten</Option>
          <Option value={20}>Twenty</Option>
          <Option value={30}>Thirty</Option>
        </Select>,
      );

      const trigger = getByRole('combobox');

      // If clicked by the right/middle mouse button, no options list should be opened
      fireEvent.click(trigger, { button: 1 });
      expect(queryByRole('listbox', { hidden: true })).to.have.attribute('aria-hidden', 'true');

      fireEvent.click(trigger, { button: 2 });
      expect(queryByRole('listbox', { hidden: true })).to.have.attribute('aria-hidden', 'true');

      fireEvent.click(trigger, { button: 0 });
      expect(queryByRole('listbox')).to.have.attribute('aria-hidden', 'false');
    });
  });

  describe('prop: autoWidth', () => {
    it('should take the trigger parent element width into account by default', () => {
      const { container, getByRole, getByTestId } = render(
        <Select PopoverProps={{ PaperProps: { 'data-testid': 'paper' } }} value="">
          <Option value="only">Only</Option>
        </Select>,
      );
      const parentEl = container.querySelector('.MuiInputBase-root');
      const button = getByRole('combobox');
      stub(parentEl, 'clientWidth').get(() => 14);

      fireEvent.click(button);
      expect(getByTestId('paper').style).to.have.property('minWidth', '14px');
    });

    it('should not take the trigger parent element width into account when autoWidth is true', () => {
      const { container, getByRole, getByTestId } = render(
        <Select autoWidth PopoverProps={{ PaperProps: { 'data-testid': 'paper' } }} value="">
          <Option value="only">Only</Option>
        </Select>,
      );
      const parentEl = container.querySelector('.MuiInputBase-root');
      const button = getByRole('combobox');
      stub(parentEl, 'clientWidth').get(() => 14);

      fireEvent.click(button);
      expect(getByTestId('paper').style).to.have.property('minWidth', '');
    });
  });

  describe('prop: multiple', () => {
    it('should serialize multiple select value', () => {
      const { container, getAllByRole } = render(
        <Select multiple open value={[10, 30]}>
          <Option value={10}>Ten</Option>
          <Option value={20}>Twenty</Option>
          <Option value={30}>Thirty</Option>
        </Select>,
      );
      const options = getAllByRole('option');

      expect(container.querySelector('input')).to.have.property('value', '10,30');
      expect(options[0]).to.have.attribute('aria-selected', 'true');
      expect(options[1]).not.to.have.attribute('aria-selected', 'true');
      expect(options[2]).to.have.attribute('aria-selected', 'true');
    });

    it('should have aria-multiselectable=true when multiple is true', () => {
      const { getByRole } = render(
        <Select multiple value={[10, 30]}>
          <Option value={10}>Ten</Option>
          <Option value={20}>Twenty</Option>
          <Option value={30}>Thirty</Option>
        </Select>,
      );

      fireEvent.click(getByRole('combobox'));

      expect(getByRole('listbox')).to.have.attribute('aria-multiselectable', 'true');
    });

    it('should serialize multiple select display value', () => {
      const { getByRole } = render(
        <Select multiple value={[10, 20, 30]}>
          <Option value={10}>Ten</Option>
          <Option value={20}>
            <strong>Twenty</strong>
          </Option>
          <Option value={30}>Thirty</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.text('Ten, Twenty, Thirty');
    });

    it('should not throw an error if `value` is an empty array', () => {
      expect(() => {
        render(<Select multiple value={[]} />);
      }).not.to.throw();
    });

    it('should not throw an error if `value` is not an empty array', () => {
      expect(() => {
        render(<Select multiple value={['foo']} />);
      }).not.to.throw();
    });

    it("selects value based on their stringified equality when they're not objects", () => {
      const { getAllByRole } = render(
        <Select multiple open value={['10', '20']}>
          <Option value={10}>Ten</Option>
          <Option value={20}>Twenty</Option>
          <Option value={30}>Thirty</Option>
        </Select>,
      );
      const options = getAllByRole('option');

      expect(options[0]).to.have.attribute('aria-selected', 'true');
      expect(options[1]).to.have.attribute('aria-selected', 'true');
      expect(options[2]).not.to.have.attribute('aria-selected', 'true');
    });

    it("selects values based on strict equality if they're objects", () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const obj3 = { id: 3 };
      const { getAllByRole } = render(
        <Select multiple open value={[obj1, obj3]}>
          <Option value={obj1}>ID: 1</Option>
          <Option value={obj2}>ID: 2</Option>
          <Option value={obj3}>ID: 3</Option>
        </Select>,
      );
      const options = getAllByRole('option');

      expect(options[0]).to.have.attribute('aria-selected', 'true');
      expect(options[1]).not.to.have.attribute('aria-selected', 'true');
      expect(options[2]).to.have.attribute('aria-selected', 'true');
    });

    describe('errors', () => {
      it('should throw if non array', function test() {
        // TODO is this fixed?
        if (!/jsdom/.test(window.navigator.userAgent)) {
          // can't catch render errors in the browser for unknown reason
          // tried try-catch + error boundary + window onError preventDefault
          this.skip();
        }

        const errorRef = React.createRef();
        expect(() => {
          render(
            <ErrorBoundary ref={errorRef}>
              <Select multiple value="10,20">
                <Option value="10">Ten</Option>
                <Option value="20">Twenty</Option>
                <Option value="30">Thirty</Option>
              </Select>
            </ErrorBoundary>,
          );
        }).toErrorDev([
          'MUI: The `value` prop must be an array',
          // React 18 Strict Effects run mount effects twice
          React.version.startsWith('18') && 'MUI: The `value` prop must be an array',
          'The above error occurred in the <ForwardRef(SelectInput)> component',
          // React 18 Strict Effects run mount effects twice
          React.version.startsWith('18') &&
            'The above error occurred in the <ForwardRef(SelectInput)> component',
        ]);
        const {
          current: { errors },
        } = errorRef;
        expect(errors).to.have.length(2);
        expect(errors[0].toString()).to.include('MUI: The `value` prop must be an array');
      });
    });

    describe('prop: onChange', () => {
      it('should call onChange when clicking an item', () => {
        function ControlledSelectInput(props) {
          const { onChange } = props;
          const [values, clickedValue] = React.useReducer((currentValues, valueClicked) => {
            if (currentValues.indexOf(valueClicked) === -1) {
              return currentValues.concat(valueClicked);
            }
            return currentValues.filter((value) => {
              return value !== valueClicked;
            });
          }, []);

          const handleChange = (event) => {
            onChange(event);
            clickedValue(event.target.value);
          };

          return (
            <Select multiple name="age" onChange={handleChange} value={values}>
              <Option value={10}>Ten</Option>
              <Option value={20}>Ten</Option>
              <Option value={30}>Ten</Option>
            </Select>
          );
        }
        const onChange = stub().callsFake((event) => {
          return {
            name: event.target.name,
            value: event.target.value,
          };
        });
        const { getByRole, getAllByRole } = render(<ControlledSelectInput onChange={onChange} />);

        fireEvent.click(getByRole('combobox'));
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

    it('should apply multiple class to `select` slot', () => {
      const { container } = render(
        <Select multiple open value={[10, 30]}>
          <Option value={10}>Ten</Option>
          <Option value={20}>Twenty</Option>
          <Option value={30}>Thirty</Option>
        </Select>,
      );

      expect(container.querySelector(`.${classes.select}`)).to.have.class(classes.multiple);
    });

    it('should be able to override `multiple` rule name in `select` slot', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const selectStyle = {
        marginLeft: '10px',
        marginTop: '10px',
      };

      const multipleStyle = {
        marginTop: '14px',
      };

      const theme = createTheme({
        components: {
          MuiSelect: {
            styleOverrides: {
              select: selectStyle,
              multiple: multipleStyle,
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <Select open value={['first']} multiple>
            <Option value="first" />
            <Option value="second" />
          </Select>
        </ThemeProvider>,
      );

      const combinedStyle = { ...selectStyle, ...multipleStyle };

      expect(container.getElementsByClassName(classes.select)[0]).to.toHaveComputedStyle(
        combinedStyle,
      );
    });
  });

  describe('prop: autoFocus', () => {
    it('should focus select after Select did mount', () => {
      const { getByRole } = render(<Select value="" autoFocus />);

      expect(getByRole('combobox')).toHaveFocus();
    });
  });

  it('should be able to return the input node via a ref object', () => {
    const ref = React.createRef();
    const { setProps } = render(<Select inputProps={{ ref }} value="" />);

    expect(ref.current.node).to.have.tagName('input');

    setProps({
      value: '',
    });
    expect(ref.current.node).to.have.tagName('input');
  });

  describe('prop: inputRef', () => {
    it('should be able to return the input node via a ref object', () => {
      const ref = React.createRef();
      render(<Select inputRef={ref} value="" />);

      expect(ref.current.node).to.have.tagName('input');
    });

    // TODO: This might be confusing a prop called input!Ref can imperatively
    // focus a button. This implies <input type="button" /> is still used.
    it('should be able focus the trigger imperatively', () => {
      const ref = React.createRef();
      const { getByRole } = render(<Select inputRef={ref} value="" />);

      act(() => {
        ref.current.focus();
      });

      expect(getByRole('combobox')).toHaveFocus();
    });
  });

  describe('prop: name', () => {
    it('should have no id when name is not provided', () => {
      const { getByRole } = render(<Select value="" />);

      expect(getByRole('combobox')).not.to.have.attribute('id');
    });

    it('should have select-`name` id when name is provided', () => {
      const { getByRole } = render(<Select name="foo" value="" />);

      expect(getByRole('combobox')).to.have.attribute('id', 'mui-component-select-foo');
    });
  });

  describe('prop: native', () => {
    it('renders a <select />', () => {
      const { container } = render(<Select native />);

      expect(container.querySelector('select')).not.to.equal(null);
    });

    it('can be labelled with a <label />', () => {
      const { getByRole } = render(
        <React.Fragment>
          <label htmlFor="select">A select</label>
          <Select id="select" native />
        </React.Fragment>,
      );

      expect(getByRole('combobox', { name: 'A select' })).to.have.property('tagName', 'SELECT');
    });
  });

  it('should pass onClick prop to Option', () => {
    const onClick = spy();
    const { getAllByRole } = render(
      <Select open value="30">
        <Option onClick={onClick} value={30}>
          Thirty
        </Option>
      </Select>,
    );

    const options = getAllByRole('option');
    fireEvent.click(options[0]);

    expect(onClick.callCount).to.equal(1);
  });

  // https://github.com/testing-library/react-testing-library/issues/322
  // https://twitter.com/devongovett/status/1248306411508916224
  it('should handle the browser autofill event and simple testing-library API', () => {
    const onChangeHandler = spy();
    const { container, getByRole } = render(
      <Select onChange={onChangeHandler} defaultValue="germany" name="country">
        <Option value="france">France</Option>
        <Option value="germany">Germany</Option>
        <Option value="china">China</Option>
      </Select>,
    );
    fireEvent.change(container.querySelector('input[name="country"]'), {
      target: {
        value: 'france',
      },
    });

    expect(onChangeHandler.calledOnce).to.equal(true);
    expect(getByRole('combobox')).to.have.text('France');
  });

  it('should support native form validation', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // see https://github.com/jsdom/jsdom/issues/123
      this.skip();
    }

    const handleSubmit = spy((event) => {
      // avoid karma reload.
      event.preventDefault();
    });
    function Form(props) {
      return (
        <form onSubmit={handleSubmit}>
          <Select required name="country" {...props}>
            <Option value="" />
            <Option value="france">France</Option>
            <Option value="germany">Germany</Option>
            <Option value="china">China</Option>
          </Select>
          <button type="submit" />
        </form>
      );
    }
    const { container, setProps } = render(<Form value="" />);

    fireEvent.click(container.querySelector('button[type=submit]'));
    expect(handleSubmit.callCount).to.equal(0, 'the select is empty it should disallow submit');

    setProps({ value: 'france' });
    fireEvent.click(container.querySelector('button[type=submit]'));
    expect(handleSubmit.callCount).to.equal(1);
  });

  it('should programmatically focus the select', () => {
    const { getByRole } = render(
      <Select
        value={1}
        inputRef={(input) => {
          if (input !== null) {
            input.focus();
          }
        }}
      >
        <Option value={1}>1</Option>
        <Option value={2}>2</Option>
      </Select>,
    );
    expect(document.activeElement).to.equal(getByRole('combobox'));
  });

  it('should not override the event.target on mouse events', () => {
    const handleChange = spy();
    const handleClick = spy();
    render(
      <div onClick={handleClick}>
        <Select open onChange={handleChange} value="second">
          <Option value="first" />
          <Option value="second" />
        </Select>
      </div>,
    );

    const options = screen.getAllByRole('option');

    act(() => {
      options[0].click();
    });

    expect(handleChange.callCount).to.equal(1);
    expect(handleClick.callCount).to.equal(1);
    expect(handleClick.firstCall.args[0]).to.have.property('target', options[0]);
  });

  it('should only select options', () => {
    const handleChange = spy();
    render(
      <Select open onChange={handleChange} value="second">
        <Option value="first" />
        <Divider />
        <Option value="second" />
      </Select>,
    );

    const divider = document.querySelector('hr');
    divider.click();
    expect(handleChange.callCount).to.equal(0);
  });

  it('slots overrides should work', function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      this.skip();
    }

    const rootStyle = {
      marginTop: '15px',
    };

    const iconStyle = {
      marginTop: '13px',
    };

    const nativeInputStyle = {
      marginTop: '10px',
    };

    const selectStyle = {
      marginLeft: '10px',
      marginTop: '12px',
    };

    const multipleStyle = {
      marginTop: '14px',
    };

    const theme = createTheme({
      components: {
        MuiSelect: {
          styleOverrides: {
            root: rootStyle,
            select: selectStyle,
            icon: iconStyle,
            nativeInput: nativeInputStyle,
            multiple: multipleStyle,
          },
        },
      },
    });

    const { container, getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Select open value="first" data-testid="select">
          <Option value="first" />
          <Option value="second" />
        </Select>
      </ThemeProvider>,
    );

    expect(getByTestId('select')).toHaveComputedStyle(rootStyle);
    expect(container.getElementsByClassName(classes.icon)[0]).to.toHaveComputedStyle(iconStyle);
    expect(container.getElementsByClassName(classes.nativeInput)[0]).to.toHaveComputedStyle(
      nativeInputStyle,
    );
    expect(container.getElementsByClassName(classes.select)[0]).to.toHaveComputedStyle(selectStyle);
  });

  describe('theme styleOverrides:', () => {
    it('should override with error style when `native select` has `error` state', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const iconStyle = { color: 'rgb(255, 0, 0)' };

      const theme = createTheme({
        components: {
          MuiNativeSelect: {
            styleOverrides: {
              icon: (props) => ({
                ...(props.ownerState.error && iconStyle),
              }),
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <Select value="first" error IconComponent="div" native>
            <option value="first">first</option>
          </Select>
        </ThemeProvider>,
      );

      expect(container.querySelector(`.${nativeSelectClasses.icon}`)).toHaveComputedStyle(
        iconStyle,
      );
    });

    it('should override with error style when `select` has `error` state', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      const iconStyle = { color: 'rgb(255, 0, 0)' };
      const selectStyle = { color: 'rgb(255, 192, 203)' };

      const theme = createTheme({
        components: {
          MuiSelect: {
            styleOverrides: {
              icon: (props) => ({
                ...(props.ownerState.error && iconStyle),
              }),
              select: (props) => ({
                ...(props.ownerState.error && selectStyle),
              }),
            },
          },
        },
      });

      const { container } = render(
        <ThemeProvider theme={theme}>
          <Select value="" error IconComponent="div" />
        </ThemeProvider>,
      );
      expect(container.querySelector(`.${classes.select}`)).toHaveComputedStyle(selectStyle);
      expect(container.querySelector(`.${classes.icon}`)).toHaveComputedStyle(iconStyle);
    });
  });

  ['standard', 'outlined', 'filled'].forEach((variant) => {
    it(`variant overrides should work for "${variant}" variant`, function test() {
      const theme = createTheme({
        components: {
          MuiSelect: {
            variants: [
              {
                props: {
                  variant,
                },
                style: {
                  fontWeight: '200',
                },
              },
            ],
          },
        },
      });

      const { getByTestId } = render(
        <ThemeProvider theme={theme}>
          <Select variant={variant} value="first" data-testid="input">
            <Option value="first" />
            <Option value="second" />
          </Select>
        </ThemeProvider>,
      );

      expect(getByTestId('input')).to.toHaveComputedStyle({
        fontWeight: '200',
      });
    });
  });

  describe('prop: input', () => {
    it('merges `ref` of `Select` and `input`', () => {
      const Input = React.forwardRef(function Input(props, ref) {
        const { inputProps, inputComponent: Component, ...other } = props;

        React.useImperativeHandle(ref, () => {
          return { refToInput: true };
        });

        return <Component {...inputProps} {...other} ref={ref} />;
      });
      const inputRef = React.createRef();
      const selectRef = React.createRef();
      render(
        <Select input={<Input data-testid="input" ref={inputRef} value="" />} ref={selectRef} />,
      );

      expect(inputRef).to.deep.equal({ current: { refToInput: true } });
      expect(selectRef).to.deep.equal({ current: { refToInput: true } });
    });

    it('should merge the class names', () => {
      const { getByTestId } = render(
        <Select
          className="foo"
          input={<OutlinedInput data-testid="root" className="bar" />}
          value=""
        />,
      );
      expect(getByTestId('root')).to.have.class('foo');
      expect(getByTestId('root')).to.have.class('bar');
    });
  });

  it('should not focus select when clicking an arbitrary element with id="undefined"', () => {
    const { getByRole, getByTestId } = render(
      <React.Fragment>
        <div id="undefined" data-testid="test-element" />
        <Select value="" />
      </React.Fragment>,
    );

    fireEvent.click(getByTestId('test-element'));

    expect(getByRole('combobox')).not.toHaveFocus();
  });
});
