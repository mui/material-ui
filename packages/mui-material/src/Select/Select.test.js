import * as React from 'react';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import {
  ErrorBoundary,
  act,
  createRenderer,
  fireEvent,
  screen,
  reactMajor,
} from '@mui/internal-test-utils';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import InputBase from '@mui/material/InputBase';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Divider from '@mui/material/Divider';
import { listClasses } from '@mui/material/List';
import classes from './selectClasses';
import { nativeSelectClasses } from '../NativeSelect';
import describeConformance from '../../test/describeConformance';

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
    render(
      <Select value="">
        <MenuItem value="">None</MenuItem>
      </Select>,
    );

    expect(screen.getByRole('combobox')).to.have.property('tabIndex', 0);
  });

  it('should accept null child', () => {
    render(
      <Select open value={10}>
        {null}
        <MenuItem value={10}>Ten</MenuItem>
      </Select>,
    );
  });

  ['', 0, false, undefined, NaN].forEach((value) =>
    it(`should support conditional rendering with "${value}"`, () => {
      render(
        <Select open value={2}>
          {value && <MenuItem value={1}>One</MenuItem>}
          <MenuItem value={2}>Two</MenuItem>
        </Select>,
      );
    }),
  );

  it('should have an input with [aria-hidden] by default', () => {
    const { container } = render(
      <Select value="10">
        <MenuItem value="10">Ten</MenuItem>
      </Select>,
    );

    expect(container.querySelector('input')).to.have.attribute('aria-hidden', 'true');
  });

  it('should ignore onBlur when the menu opens', async () => {
    // mousedown calls focus while click opens moving the focus to an item
    // this means the trigger is blurred immediately
    const handleBlur = spy();

    render(
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
        <MenuItem value="">none</MenuItem>
        <MenuItem value={10}>Ten</MenuItem>
      </Select>,
    );

    const trigger = screen.getByRole('combobox');

    fireEvent.mouseDown(trigger);

    expect(handleBlur.callCount).to.equal(0);
    expect(screen.getByRole('listbox')).not.to.equal(null);

    const options = screen.getAllByRole('option');
    fireEvent.mouseDown(options[0]);

    await act(async () => {
      options[0].click();
    });

    expect(handleBlur.callCount).to.equal(0);
    expect(screen.queryByRole('listbox', { hidden: false })).to.equal(null);
  });

  it('options should have a data-value attribute', () => {
    render(
      <Select open value={10}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>,
    );
    const options = screen.getAllByRole('option');

    expect(options[0]).to.have.attribute('data-value', '10');
    expect(options[1]).to.have.attribute('data-value', '20');
  });

  [' ', 'ArrowUp', 'ArrowDown', 'Enter'].forEach((key) => {
    it(`should open menu when pressed ${key} key on select`, async () => {
      render(
        <Select value="">
          <MenuItem value="">none</MenuItem>
        </Select>,
      );
      const trigger = screen.getByRole('combobox');
      await act(async () => {
        trigger.focus();
      });

      fireEvent.keyDown(trigger, { key });
      expect(screen.getByRole('listbox', { hidden: false })).not.to.equal(null);

      fireEvent.keyUp(screen.getAllByRole('option')[0], { key });
      expect(screen.getByRole('listbox', { hidden: false })).not.to.equal(null);
    });
  });

  it('should pass "name" as part of the event.target for onBlur', async () => {
    const handleBlur = stub().callsFake((event) => event.target.name);

    render(
      <Select onBlur={handleBlur} name="blur-testing" value="">
        <MenuItem value="">none</MenuItem>
      </Select>,
    );

    const button = screen.getByRole('combobox');
    await act(async () => {
      button.focus();
      button.blur();
    });

    expect(handleBlur.callCount).to.equal(1);
    expect(handleBlur.firstCall.returnValue).to.equal('blur-testing');
  });

  it('should call onClose when the backdrop is clicked', async () => {
    const handleClose = spy();

    render(
      <Select
        MenuProps={{ BackdropProps: { 'data-testid': 'backdrop' } }}
        onClose={handleClose}
        open
        value=""
      >
        <MenuItem value="">none</MenuItem>
      </Select>,
    );

    await act(async () => {
      screen.getByTestId('backdrop').click();
    });

    expect(handleClose.callCount).to.equal(1);
  });

  it('should call onClose when the same option is selected', () => {
    const handleChange = spy();
    const handleClose = spy();
    render(
      <Select open onChange={handleChange} onClose={handleClose} value="second">
        <MenuItem value="first" />
        <MenuItem value="second" />
      </Select>,
    );

    screen.getByRole('option', { selected: true }).click();

    expect(handleChange.callCount).to.equal(0);
    expect(handleClose.callCount).to.equal(1);
  });

  it('should focus select when its label is clicked', () => {
    render(
      <React.Fragment>
        <InputLabel id="my$label" data-testid="label" />
        <Select value="" labelId="my$label" />
      </React.Fragment>,
    );

    fireEvent.click(screen.getByTestId('label'));

    expect(screen.getByRole('combobox')).toHaveFocus();
  });

  it('should focus list if no selection', () => {
    render(<Select value="" autoFocus />);

    fireEvent.mouseDown(screen.getByRole('combobox'));

    // TODO not matching WAI-ARIA authoring practices. It should focus the first (or selected) item.
    expect(screen.getByRole('listbox')).toHaveFocus();
  });

  describe('prop: onChange', () => {
    it('should get selected element from arguments', async () => {
      const onChangeHandler = spy();

      render(
        <Select onChange={onChangeHandler} value="0">
          <MenuItem value="0" />
          <MenuItem value="1" />
          <MenuItem value="2" />
        </Select>,
      );

      fireEvent.mouseDown(screen.getByRole('combobox'));
      await act(async () => {
        screen.getAllByRole('option')[1].click();
      });

      expect(onChangeHandler.calledOnce).to.equal(true);
      const selected = onChangeHandler.args[0][1];
      expect(React.isValidElement(selected)).to.equal(true);
    });

    it('should call onChange before onClose', async () => {
      const eventLog = [];
      const onChangeHandler = spy(() => eventLog.push('CHANGE_EVENT'));
      const onCloseHandler = spy(() => eventLog.push('CLOSE_EVENT'));

      render(
        <Select onChange={onChangeHandler} onClose={onCloseHandler} value="0">
          <MenuItem value="0" />
          <MenuItem value="1" />
        </Select>,
      );

      fireEvent.mouseDown(screen.getByRole('combobox'));
      await act(async () => {
        screen.getAllByRole('option')[1].click();
      });

      expect(eventLog).to.deep.equal(['CHANGE_EVENT', 'CLOSE_EVENT']);
    });

    it('should not be called if selected element has the current value (value did not change)', async () => {
      const onChangeHandler = spy();

      render(
        <Select onChange={onChangeHandler} value="1">
          <MenuItem value="0" />
          <MenuItem value="1" />
          <MenuItem value="2" />
        </Select>,
      );

      fireEvent.mouseDown(screen.getByRole('combobox'));
      await act(async () => {
        screen.getAllByRole('option')[1].click();
      });

      expect(onChangeHandler.callCount).to.equal(0);
    });
  });

  describe('prop: defaultOpen', () => {
    it('should be open on mount', () => {
      render(<Select defaultOpen value="" />);
      expect(screen.getByRole('combobox', { hidden: true })).to.have.attribute(
        'aria-expanded',
        'true',
      );
    });
  });

  describe('prop: value', () => {
    it('should select the option based on the number value', () => {
      render(
        <Select open value={20}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
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
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
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
          <MenuItem value={obj1}>1</MenuItem>
          <MenuItem value={obj2}>2</MenuItem>
        </Select>,
      );
      const options = screen.getAllByRole('option');

      expect(options[0]).to.have.attribute('aria-selected', 'true');
      expect(options[1]).not.to.have.attribute('aria-selected', 'true');
    });

    it('should be able to use an object', () => {
      const value = {};

      render(
        <Select value={value}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={value}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );

      expect(screen.getByRole('combobox')).to.have.text('Twenty');
    });

    describe('warnings', () => {
      it('warns when the value is not present in any option', () => {
        const errorMessage =
          'MUI: You have provided an out-of-range value `20` for the select component.';

        let expectedOccurrences = 2;

        if (reactMajor >= 18) {
          expectedOccurrences = 3;
        }

        expect(() =>
          render(
            <Select value={20}>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>,
          ),
        ).toWarnDev(Array(expectedOccurrences).fill(errorMessage));
      });
    });
  });

  it('should not have the selectable option selected when inital value provided is empty string on Select with ListSubHeader item', () => {
    render(
      <Select open value="">
        <ListSubheader>Category 1</ListSubheader>
        <MenuItem value={10}>Ten</MenuItem>
        <ListSubheader>Category 2</ListSubheader>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>,
    );

    const options = screen.getAllByRole('option');
    expect(options[1]).not.to.have.class(menuItemClasses.selected);
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
      render(<Select open value="" />);

      expect(screen.getByRole('combobox', { hidden: true })).to.have.attribute(
        'aria-expanded',
        'true',
      );
    });

    specify('ARIA 1.2: aria-expanded="false" if the listbox isn\'t displayed', () => {
      render(<Select value="" />);

      expect(screen.getByRole('combobox')).to.have.attribute('aria-expanded', 'false');
    });

    it('sets aria-disabled="true" when component is disabled', () => {
      render(<Select disabled value="" />);

      expect(screen.getByRole('combobox')).to.have.attribute('aria-disabled', 'true');
    });

    it('sets disabled attribute in input when component is disabled', () => {
      const { container } = render(<Select disabled value="" />);

      expect(container.querySelector('input')).to.have.property('disabled', true);
    });

    specify('aria-disabled is not present if component is not disabled', () => {
      render(<Select disabled={false} value="" />);

      expect(screen.getByRole('combobox')).not.to.have.attribute('aria-disabled');
    });

    it('sets aria-required="true" when component is required', () => {
      render(<Select required value="" />);

      expect(screen.getByRole('combobox')).to.have.attribute('aria-required', 'true');
    });

    it('aria-required is not present if component is not required', () => {
      render(<Select required={false} value="" />);

      expect(screen.getByRole('combobox')).not.to.have.attribute('aria-required');
    });

    it('sets required attribute in input when component is required', () => {
      const { container } = render(<Select required value="" />);

      expect(container.querySelector('input')).to.have.property('required', true);
    });

    it('sets aria-invalid="true" when component is in the error state', () => {
      render(<Select error value="" />);

      expect(screen.getByRole('combobox')).to.have.attribute('aria-invalid', 'true');
    });

    it('aria-invalid is not present if component is not in an error state', () => {
      render(<Select value="" />);

      expect(screen.getByRole('combobox')).not.to.have.attribute('aria-invalid');
    });

    it('indicates that activating the button displays a listbox', () => {
      render(<Select value="" />);

      expect(screen.getByRole('combobox')).to.have.attribute('aria-haspopup', 'listbox');
    });

    it('renders an element with listbox behavior', () => {
      render(<Select open value="" />);

      expect(screen.getByRole('listbox')).toBeVisible();
    });

    it('indicates that input element has combobox role and aria-controls set to id of listbox', () => {
      render(<Select open value="" />);
      const listboxId = screen.getByRole('listbox').id;

      expect(screen.getByRole('combobox', { hidden: true })).to.have.attribute(
        'aria-controls',
        listboxId,
      );
    });

    it('does not set aria-controls when closed', () => {
      render(<Select open={false} value="" />);
      expect(screen.getByRole('combobox', { hidden: true })).to.not.have.attribute('aria-controls');
    });

    specify('the listbox is focusable', async () => {
      render(<Select open value="" />);

      await act(async () => {
        screen.getByRole('listbox').focus();
      });

      expect(screen.getByRole('listbox')).toHaveFocus();
    });

    it('identifies each selectable element containing an option', () => {
      render(
        <Select open value="">
          <MenuItem value="1">First</MenuItem>
          <MenuItem value="2">Second</MenuItem>
        </Select>,
      );

      const options = screen.getAllByRole('option');
      expect(options[0]).to.have.text('First');
      expect(options[1]).to.have.text('Second');
    });

    it('indicates the selected option', () => {
      render(
        <Select open value="2">
          <MenuItem value="1">First</MenuItem>
          <MenuItem value="2">Second</MenuItem>
        </Select>,
      );

      expect(screen.getAllByRole('option')[1]).to.have.attribute('aria-selected', 'true');
    });

    describe('when the first child is a ListSubheader', () => {
      it('first selectable option is focused to use the arrow', () => {
        render(
          <Select defaultValue="" open>
            <ListSubheader>Category 1</ListSubheader>
            <MenuItem value={1}>Option 1</MenuItem>
            <MenuItem value={2}>Option 2</MenuItem>
            <ListSubheader>Category 2</ListSubheader>
            <MenuItem value={3}>Option 3</MenuItem>
            <MenuItem value={4}>Option 4</MenuItem>
          </Select>,
        );

        const options = screen.getAllByRole('option');
        expect(options[1]).to.have.attribute('tabindex', '0');

        fireEvent.keyDown(options[1], { key: 'ArrowDown' });
        fireEvent.keyDown(options[2], { key: 'ArrowDown' });
        fireEvent.keyDown(options[4], { key: 'Enter' });

        expect(options[4]).to.have.attribute('aria-selected', 'true');
      });

      describe('when also the second child is a ListSubheader', () => {
        it('first selectable option is focused to use the arrow', () => {
          render(
            <Select defaultValue="" open>
              <ListSubheader>Empty category</ListSubheader>
              <ListSubheader>Category 1</ListSubheader>
              <MenuItem value={1}>Option 1</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <ListSubheader>Category 2</ListSubheader>
              <MenuItem value={3}>Option 3</MenuItem>
              <MenuItem value={4}>Option 4</MenuItem>
            </Select>,
          );

          const options = screen.getAllByRole('option');
          expect(options[2]).to.have.attribute('tabindex', '0');

          fireEvent.keyDown(options[2], { key: 'ArrowDown' });
          fireEvent.keyDown(options[3], { key: 'ArrowDown' });
          fireEvent.keyDown(options[5], { key: 'Enter' });

          expect(options[5]).to.have.attribute('aria-selected', 'true');
        });
      });

      describe('when the second child is null', () => {
        it('first selectable option is focused to use the arrow', () => {
          render(
            <Select defaultValue="" open>
              <ListSubheader>Category 1</ListSubheader>
              {null}
              <MenuItem value={1}>Option 1</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <ListSubheader>Category 2</ListSubheader>
              <MenuItem value={3}>Option 3</MenuItem>
              <MenuItem value={4}>Option 4</MenuItem>
            </Select>,
          );

          const options = screen.getAllByRole('option');
          expect(options[1]).to.have.attribute('tabindex', '0');

          fireEvent.keyDown(options[1], { key: 'ArrowDown' });
          fireEvent.keyDown(options[2], { key: 'ArrowDown' });
          fireEvent.keyDown(options[4], { key: 'Enter' });

          expect(options[4]).to.have.attribute('aria-selected', 'true');
        });
      });

      ['', 0, false, undefined, NaN].forEach((value) =>
        describe(`when the second child is conditionally rendering with "${value}"`, () => {
          it('first selectable option is focused to use the arrow', () => {
            render(
              <Select defaultValue="" open>
                <ListSubheader>Category 1</ListSubheader>
                {value && <MenuItem value={1}>One</MenuItem>}
                <MenuItem value={1}>Option 1</MenuItem>
                <MenuItem value={2}>Option 2</MenuItem>
                <ListSubheader>Category 2</ListSubheader>
                <MenuItem value={3}>Option 3</MenuItem>
                <MenuItem value={4}>Option 4</MenuItem>
              </Select>,
            );

            const options = screen.getAllByRole('option');
            expect(options[1]).to.have.attribute('tabindex', '0');

            fireEvent.keyDown(options[1], { key: 'ArrowDown' });
            fireEvent.keyDown(options[2], { key: 'ArrowDown' });
            fireEvent.keyDown(options[4], { key: 'Enter' });

            expect(options[4]).to.have.attribute('aria-selected', 'true');
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
          render(
            <Select defaultValue="" open>
              <WrappedListSubheader>Category 1</WrappedListSubheader>
              <MenuItem value={1}>Option 1</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <WrappedListSubheader>Category 2</WrappedListSubheader>
              <MenuItem value={3}>Option 3</MenuItem>
              <MenuItem value={4}>Option 4</MenuItem>
            </Select>,
          );

          const expectedHighlightedOption = screen.getByText('Option 1');
          expect(expectedHighlightedOption).to.have.attribute('tabindex', '0');
        });
      });

      describe('with the `muiSkipListHighlight` prop', () => {
        function WrappedListSubheader(props) {
          const { muiSkipListHighlight, ...other } = props;
          return <ListSubheader {...other} />;
        }

        it('highlights the first selectable option below the header', () => {
          render(
            <Select defaultValue="" open>
              <WrappedListSubheader muiSkipListHighlight>Category 1</WrappedListSubheader>
              <MenuItem value={1}>Option 1</MenuItem>
              <MenuItem value={2}>Option 2</MenuItem>
              <WrappedListSubheader muiSkipListHighlight>Category 2</WrappedListSubheader>
              <MenuItem value={3}>Option 3</MenuItem>
              <MenuItem value={4}>Option 4</MenuItem>
            </Select>,
          );

          const expectedHighlightedOption = screen.getByText('Option 1');
          expect(expectedHighlightedOption).to.have.attribute('tabindex', '0');
        });
      });
    });

    describe('when the first child is a MenuItem disabled', () => {
      it('highlights the first selectable option below the header', () => {
        render(
          <Select defaultValue="" open>
            <MenuItem value="" disabled>
              <em>None</em>
            </MenuItem>
            <ListSubheader>Category 1</ListSubheader>
            <MenuItem value={1}>Option 1</MenuItem>
            <MenuItem value={2}>Option 2</MenuItem>
            <ListSubheader>Category 2</ListSubheader>
            <MenuItem value={3}>Option 3</MenuItem>
            <MenuItem value={4}>Option 4</MenuItem>
          </Select>,
        );

        const options = screen.getAllByRole('option');
        expect(options[2]).to.have.attribute('tabindex', '0');

        fireEvent.keyDown(options[2], { key: 'ArrowDown' });
        fireEvent.keyDown(options[3], { key: 'ArrowDown' });
        fireEvent.keyDown(options[5], { key: 'Enter' });

        expect(options[5]).to.have.attribute('aria-selected', 'true');
      });
    });

    it('it will fallback to its content for the accessible name when it has no name', () => {
      render(<Select value="" />);

      // TODO what is the accessible name actually?
      expect(screen.getByRole('combobox')).not.to.have.attribute('aria-labelledby');
    });

    it('is labelled by itself when it has a name', () => {
      render(<Select name="select" value="" />);

      expect(screen.getByRole('combobox')).to.have.attribute(
        'aria-labelledby',
        screen.getByRole('combobox').getAttribute('id'),
      );
    });

    it('is labelled by itself when it has an id which is preferred over name', () => {
      render(
        <React.Fragment>
          <span id="select-1-label">Chose first option:</span>
          <Select id="select-1" labelId="select-1-label" name="select" value="" />
          <span id="select-2-label">Chose second option:</span>
          <Select id="select-2" labelId="select-2-label" name="select" value="" />
        </React.Fragment>,
      );

      const triggers = screen.getAllByRole('combobox');

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
      render(
        <React.Fragment>
          <span id="select-label">Choose one:</span>
          <Select labelId="select-label" name="select" value="" />
        </React.Fragment>,
      );

      expect(screen.getByRole('combobox')).to.have.attribute(
        'aria-labelledby',
        `select-label ${screen.getByRole('combobox').getAttribute('id')}`,
      );
    });

    specify('the list of options is not labelled by default', () => {
      render(<Select open value="" />);

      expect(screen.getByRole('listbox')).not.to.have.attribute('aria-labelledby');
    });

    specify('the list of options can be labelled by providing `labelId`', () => {
      render(
        <React.Fragment>
          <span id="select-label">Choose one:</span>
          <Select labelId="select-label" open value="" />
        </React.Fragment>,
      );

      expect(screen.getByRole('listbox')).to.have.attribute('aria-labelledby', 'select-label');
    });

    it('should have appropriate accessible description when provided in props', () => {
      render(
        <React.Fragment>
          <Select aria-describedby="select-helper-text" value="" />
          <span id="select-helper-text">Helper text content</span>
        </React.Fragment>,
      );

      const target = screen.getByRole('combobox');
      expect(target).to.have.attribute('aria-describedby', 'select-helper-text');
      expect(target).toHaveAccessibleDescription('Helper text content');
    });
  });

  describe('prop: readOnly', () => {
    it('should not trigger any event with readOnly', async () => {
      render(
        <Select readOnly value="10">
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
        </Select>,
      );
      const trigger = screen.getByRole('combobox');
      await act(async () => {
        trigger.focus();
      });

      fireEvent.keyDown(trigger, { key: 'ArrowDown' });
      expect(screen.queryByRole('listbox')).to.equal(null);

      fireEvent.keyUp(trigger, { key: 'ArrowDown' });
      expect(screen.queryByRole('listbox')).to.equal(null);
    });
  });

  describe('prop: MenuProps', () => {
    it('should apply additional props to the Menu component', () => {
      const onEntered = spy();

      render(
        <Select MenuProps={{ TransitionProps: { onEntered }, transitionDuration: 100 }} value="10">
          <MenuItem value="10">Ten</MenuItem>
        </Select>,
      );

      fireEvent.mouseDown(screen.getByRole('combobox'));
      clock.tick(99);

      expect(onEntered.callCount).to.equal(0);

      clock.tick(1);

      expect(onEntered.callCount).to.equal(1);
    });

    it('should be able to override PaperProps minWidth', () => {
      render(
        <Select
          MenuProps={{ PaperProps: { 'data-testid': 'paper', style: { minWidth: 12 } } }}
          open
          value="10"
        >
          <MenuItem value="10">Ten</MenuItem>
        </Select>,
      );

      expect(screen.getByTestId('paper').style).to.have.property('minWidth', '12px');
    });

    // https://github.com/mui/material-ui/issues/38700
    it('should merge `slotProps.paper` with the default Paper props', function test() {
      if (window.navigator.userAgent.includes('jsdom')) {
        this.skip();
      }

      render(
        <Select MenuProps={{ slotProps: { paper: { 'data-testid': 'paper' } } }} open value="10">
          <MenuItem value="10">Ten</MenuItem>
        </Select>,
      );

      const paper = screen.getByTestId('paper');
      const selectButton = screen.getByRole('combobox', { hidden: true });

      expect(paper.style).to.have.property('minWidth', `${selectButton.clientWidth}px`);
    });

    // https://github.com/mui/material-ui/issues/46273
    it('should merge `slotProps.list` with default List props', () => {
      render(
        <Select
          MenuProps={{
            slotProps: { list: { disablePadding: true } },
          }}
          open
          value="10"
        >
          <MenuItem value="10">Ten</MenuItem>
        </Select>,
      );

      const listbox = screen.getByRole('listbox');
      expect(listbox).not.to.have.class(listClasses.padding);
    });

    // https://github.com/mui/material-ui/issues/38949
    it('should forward `slotProps` to menu', function test() {
      render(
        <Select
          MenuProps={{
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
          <MenuItem value="10">Ten</MenuItem>
        </Select>,
      );

      const backdrop = screen.getByTestId('backdrop');

      expect(backdrop.style).to.have.property('backgroundColor', 'red');
    });
  });

  describe('prop: SelectDisplayProps', () => {
    it('should apply additional props to trigger element', () => {
      render(
        <Select SelectDisplayProps={{ 'data-test': 'SelectDisplay' }} value="10">
          <MenuItem value="10">Ten</MenuItem>
        </Select>,
      );

      expect(screen.getByRole('combobox')).to.have.attribute('data-test', 'SelectDisplay');
    });
  });

  describe('prop: displayEmpty', () => {
    it('should display the selected item even if its value is empty', () => {
      render(
        <Select value="" displayEmpty>
          <MenuItem value="">Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );

      expect(screen.getByRole('combobox')).to.have.text('Ten');
    });

    it('should notch the outline to accommodate the label when displayEmpty', function test() {
      if (window.navigator.userAgent.includes('jsdom')) {
        this.skip();
      }

      const { container } = render(
        <Select value="" label="Age" displayEmpty>
          <MenuItem value="">None</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
        </Select>,
      );

      expect(container.querySelector('legend')).toHaveComputedStyle({
        maxWidth: '100%',
      });
    });
  });

  describe('prop: renderValue', () => {
    it('should use the prop to render the value', () => {
      const renderValue = (x) => `0b${x.toString(2)}`;

      render(
        <Select renderValue={renderValue} value={4}>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>,
      );

      expect(screen.getByRole('combobox')).to.have.text('0b100');
    });
  });

  describe('prop: open (controlled)', () => {
    it('should not focus on close controlled select', async () => {
      function ControlledWrapper() {
        const [open, setOpen] = React.useState(false);

        return (
          <div>
            <button type="button" id="open-select" onClick={() => setOpen(true)}>
              Open select
            </button>
            <Select
              MenuProps={{ transitionDuration: 0 }}
              open={open}
              onClose={() => setOpen(false)}
              value=""
            >
              <MenuItem onClick={() => setOpen(false)}>close</MenuItem>
            </Select>
          </div>
        );
      }
      const { container } = render(<ControlledWrapper />);
      const openSelect = container.querySelector('#open-select');
      await act(async () => {
        openSelect.focus();
      });
      fireEvent.click(openSelect);

      const option = screen.getByRole('option');
      expect(option).toHaveFocus();
      fireEvent.click(option);

      expect(container.querySelectorAll(classes.focused).length).to.equal(0);
      expect(openSelect).toHaveFocus();
    });

    it('should allow to control closing by passing onClose props', async () => {
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
      render(<ControlledWrapper />);

      fireEvent.mouseDown(screen.getByRole('combobox'));
      expect(screen.getByRole('listbox')).not.to.equal(null);

      await act(async () => {
        screen.getByRole('option').click();
      });
      // react-transition-group uses one extra commit for exit to completely remove
      // it from the DOM. but it's at least immediately inaccessible.
      // It's desired that this fails one day. The additional tick required to remove
      // this from the DOM is not a feature
      expect(screen.getByRole('listbox', { hidden: true })).toBeInaccessible();
      clock.tick(0);

      expect(screen.queryByRole('listbox', { hidden: true })).to.equal(null);
    });

    it('should be open when initially true', () => {
      render(
        <Select open value="">
          <MenuItem>Hello</MenuItem>
        </Select>,
      );

      expect(screen.getByRole('listbox')).not.to.equal(null);
    });

    it('open only with the left mouse button click', () => {
      render(
        <Select value="">
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );

      const trigger = screen.getByRole('combobox');

      // If clicked by the right/middle mouse button, no options list should be opened
      fireEvent.mouseDown(trigger, { button: 1 });
      expect(screen.queryByRole('listbox')).to.equal(null);

      fireEvent.mouseDown(trigger, { button: 2 });
      expect(screen.queryByRole('listbox')).to.equal(null);
    });
  });

  describe('prop: autoWidth', () => {
    it('should take the trigger parent element width into account by default', () => {
      const { container } = render(
        <Select MenuProps={{ PaperProps: { 'data-testid': 'paper' } }} value="">
          <MenuItem>Only</MenuItem>
        </Select>,
      );
      const parentEl = container.querySelector('.MuiInputBase-root');
      const button = screen.getByRole('combobox');
      stub(parentEl, 'clientWidth').get(() => 14);

      fireEvent.mouseDown(button);
      expect(screen.getByTestId('paper').style).to.have.property('minWidth', '14px');
    });

    it('should not take the trigger parent element width into account when autoWidth is true', () => {
      const { container } = render(
        <Select autoWidth MenuProps={{ PaperProps: { 'data-testid': 'paper' } }} value="">
          <MenuItem>Only</MenuItem>
        </Select>,
      );
      const parentEl = container.querySelector('.MuiInputBase-root');
      const button = screen.getByRole('combobox');
      stub(parentEl, 'clientWidth').get(() => 14);

      fireEvent.mouseDown(button);
      expect(screen.getByTestId('paper').style).to.have.property('minWidth', '');
    });
  });

  describe('prop: multiple', () => {
    it('should serialize multiple select value', () => {
      const { container } = render(
        <Select multiple open value={[10, 30]}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );
      const options = screen.getAllByRole('option');

      expect(container.querySelector('input')).to.have.property('value', '10,30');
      expect(options[0]).to.have.attribute('aria-selected', 'true');
      expect(options[1]).not.to.have.attribute('aria-selected', 'true');
      expect(options[2]).to.have.attribute('aria-selected', 'true');
    });

    it('should have aria-multiselectable=true when multiple is true', () => {
      render(
        <Select multiple value={[10, 30]}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );

      fireEvent.mouseDown(screen.getByRole('combobox'));

      expect(screen.getByRole('listbox')).to.have.attribute('aria-multiselectable', 'true');
    });

    it('should serialize multiple select display value', () => {
      render(
        <Select multiple value={[10, 20, 30]}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>
            <strong>Twenty</strong>
          </MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );

      expect(screen.getByRole('combobox')).to.have.text('Ten, Twenty, Thirty');
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
      render(
        <Select multiple open value={['10', '20']}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );

      const options = screen.getAllByRole('option');

      expect(options[0]).to.have.attribute('aria-selected', 'true');
      expect(options[1]).to.have.attribute('aria-selected', 'true');
      expect(options[2]).not.to.have.attribute('aria-selected', 'true');
    });

    it("selects values based on strict equality if they're objects", () => {
      const obj1 = { id: 1 };
      const obj2 = { id: 2 };
      const obj3 = { id: 3 };

      render(
        <Select multiple open value={[obj1, obj3]}>
          <MenuItem value={obj1}>ID: 1</MenuItem>
          <MenuItem value={obj2}>ID: 2</MenuItem>
          <MenuItem value={obj3}>ID: 3</MenuItem>
        </Select>,
      );

      const options = screen.getAllByRole('option');

      expect(options[0]).to.have.attribute('aria-selected', 'true');
      expect(options[1]).not.to.have.attribute('aria-selected', 'true');
      expect(options[2]).to.have.attribute('aria-selected', 'true');
    });

    describe('errors', () => {
      it('should throw if non array', function test() {
        // TODO is this fixed?
        if (!window.navigator.userAgent.includes('jsdom')) {
          // can't catch render errors in the browser for unknown reason
          // tried try-catch + error boundary + window onError preventDefault
          this.skip();
        }

        const errorRef = React.createRef();
        expect(() => {
          render(
            <ErrorBoundary ref={errorRef}>
              <Select multiple value="10,20">
                <MenuItem value="10">Ten</MenuItem>
                <MenuItem value="20">Twenty</MenuItem>
                <MenuItem value="30">Thirty</MenuItem>
              </Select>
            </ErrorBoundary>,
          );
        }).toErrorDev([
          'MUI: The `value` prop must be an array',
          // React 18 Strict Effects run mount effects twice
          reactMajor === 18 && 'MUI: The `value` prop must be an array',
          reactMajor < 19 && 'The above error occurred in the <ForwardRef(SelectInput)> component',
        ]);
        const {
          current: { errors },
        } = errorRef;
        expect(errors).to.have.length(1);
        expect(errors[0].toString()).to.include('MUI: The `value` prop must be an array');
      });
    });

    describe('prop: onChange', () => {
      it('should call onChange when clicking an item', async () => {
        function ControlledSelectInput(props) {
          const { onChange } = props;
          const [values, clickedValue] = React.useReducer((currentValues, valueClicked) => {
            if (!currentValues.includes(valueClicked)) {
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
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Ten</MenuItem>
              <MenuItem value={30}>Ten</MenuItem>
            </Select>
          );
        }
        const onChange = stub().callsFake((event) => {
          return {
            name: event.target.name,
            value: event.target.value,
          };
        });
        render(<ControlledSelectInput onChange={onChange} />);

        fireEvent.mouseDown(screen.getByRole('combobox'));
        const options = screen.getAllByRole('option');
        fireEvent.click(options[2]);

        expect(onChange.callCount).to.equal(1);
        expect(onChange.firstCall.returnValue).to.deep.equal({ name: 'age', value: [30] });

        await act(async () => {
          options[0].click();
        });

        expect(onChange.callCount).to.equal(2);
        expect(onChange.secondCall.returnValue).to.deep.equal({ name: 'age', value: [30, 10] });
      });
    });

    it('should apply multiple class to `select` slot', () => {
      const { container } = render(
        <Select multiple open value={[10, 30]}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
      );

      expect(container.querySelector(`.${classes.select}`)).to.have.class(classes.multiple);
    });

    it('should be able to override `multiple` rule name in `select` slot', function test() {
      if (window.navigator.userAgent.includes('jsdom')) {
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
            <MenuItem value="first" />
            <MenuItem value="second" />
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
      render(<Select value="" autoFocus />);

      expect(screen.getByRole('combobox')).toHaveFocus();
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
    it('should be able focus the trigger imperatively', async () => {
      const ref = React.createRef();
      render(<Select inputRef={ref} value="" />);

      await act(async () => {
        ref.current.focus();
      });

      expect(screen.getByRole('combobox')).toHaveFocus();
    });
  });

  describe('prop: name', () => {
    it('should have no id when name is not provided', () => {
      render(<Select value="" />);

      expect(screen.getByRole('combobox')).not.to.have.attribute('id');
    });

    it('should have select-`name` id when name is provided', () => {
      render(<Select name="foo" value="" />);

      expect(screen.getByRole('combobox')).to.have.attribute('id', 'mui-component-select-foo');
    });
  });

  describe('prop: native', () => {
    it('renders a <select />', () => {
      const { container } = render(<Select native />);

      expect(container.querySelector('select')).not.to.equal(null);
    });

    it('can be labelled with a <label />', () => {
      render(
        <React.Fragment>
          <label htmlFor="select">A select</label>
          <Select id="select" native />
        </React.Fragment>,
      );

      expect(screen.getByRole('combobox', { name: 'A select' })).to.have.property(
        'tagName',
        'SELECT',
      );
    });
  });

  it('prevents the default when releasing Space on the children', () => {
    const keyUpSpy = spy();
    render(
      <Select value="one" open>
        <MenuItem onKeyUp={keyUpSpy} value="one">
          One
        </MenuItem>
      </Select>,
    );

    fireEvent.keyUp(screen.getAllByRole('option')[0], { key: ' ' });

    expect(keyUpSpy.callCount).to.equal(1);
    expect(keyUpSpy.firstCall.args[0]).to.have.property('defaultPrevented', true);
  });

  it('should pass onClick prop to MenuItem', () => {
    const onClick = spy();

    render(
      <Select open value="30">
        <MenuItem onClick={onClick} value={30}>
          Thirty
        </MenuItem>
      </Select>,
    );

    const options = screen.getAllByRole('option');
    fireEvent.click(options[0]);

    expect(onClick.callCount).to.equal(1);
  });

  // https://github.com/testing-library/react-testing-library/issues/322
  // https://x.com/devongovett/status/1248306411508916224
  it('should handle the browser autofill event and simple testing-library API', () => {
    const onChangeHandler = spy();
    const { container } = render(
      <Select onChange={onChangeHandler} defaultValue="germany" name="country">
        <MenuItem value="france">France</MenuItem>
        <MenuItem value="germany">Germany</MenuItem>
        <MenuItem value="china">China</MenuItem>
      </Select>,
    );
    fireEvent.change(container.querySelector('input[name="country"]'), {
      target: {
        value: 'france',
      },
    });

    expect(onChangeHandler.calledOnce).to.equal(true);
    expect(screen.getByRole('combobox')).to.have.text('France');
  });

  it('should support native form validation', function test() {
    if (window.navigator.userAgent.includes('jsdom')) {
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
            <MenuItem value="" />
            <MenuItem value="france">France</MenuItem>
            <MenuItem value="germany">Germany</MenuItem>
            <MenuItem value="china">China</MenuItem>
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
    render(
      <Select
        value={1}
        inputRef={(input) => {
          if (input !== null) {
            input.focus();
          }
        }}
      >
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
      </Select>,
    );

    expect(document.activeElement).to.equal(screen.getByRole('combobox'));
  });

  it('should not override the event.target on mouse events', () => {
    const handleChange = spy();
    const handleClick = spy();
    render(
      <div onClick={handleClick}>
        <Select open onChange={handleChange} value="second">
          <MenuItem value="first" />
          <MenuItem value="second" />
        </Select>
      </div>,
    );

    const options = screen.getAllByRole('option');
    options[0].click();

    expect(handleChange.callCount).to.equal(1);
    expect(handleClick.callCount).to.equal(1);
    expect(handleClick.firstCall.args[0]).to.have.property('target', options[0]);
  });

  it('should only select options', () => {
    const handleChange = spy();
    render(
      <Select open onChange={handleChange} value="second">
        <MenuItem value="first" />
        <Divider />
        <MenuItem value="second" />
      </Select>,
    );

    const divider = document.querySelector('hr');
    divider.click();
    expect(handleChange.callCount).to.equal(0);
  });

  it('slots overrides should work', function test() {
    if (window.navigator.userAgent.includes('jsdom')) {
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

    const { container } = render(
      <ThemeProvider theme={theme}>
        <Select open value="first" data-testid="select">
          <MenuItem value="first" />
          <MenuItem value="second" />
        </Select>
      </ThemeProvider>,
    );

    expect(screen.getByTestId('select')).toHaveComputedStyle(rootStyle);
    expect(container.getElementsByClassName(classes.icon)[0]).to.toHaveComputedStyle(iconStyle);
    expect(container.getElementsByClassName(classes.nativeInput)[0]).to.toHaveComputedStyle(
      nativeInputStyle,
    );
    expect(container.getElementsByClassName(classes.select)[0]).to.toHaveComputedStyle(selectStyle);
  });

  describe('form submission', () => {
    it('includes Select value in formData only if the `name` attribute is provided', async function test() {
      if (window.navigator.userAgent.includes('jsdom')) {
        // FormData is not available in JSDOM
        this.skip();
      }
      const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        expect(formData.get('select-one')).to.equal('2');

        const formDataAsObject = Object.fromEntries(formData);
        expect(Object.keys(formDataAsObject).length).to.equal(1);
      };

      render(
        <form onSubmit={handleSubmit}>
          <Select defaultValue={2} name="select-one">
            <MenuItem value={1} />
            <MenuItem value={2} />
          </Select>
          <Select defaultValue="a">
            <MenuItem value="a" />
            <MenuItem value="b" />
          </Select>
          <button type="submit">Submit</button>
        </form>,
      );

      const button = screen.getByText('Submit');
      await act(async () => {
        button.click();
      });
    });
  });

  describe('theme styleOverrides:', () => {
    it('should override with error style when `native select` has `error` state', function test() {
      if (window.navigator.userAgent.includes('jsdom')) {
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
      if (window.navigator.userAgent.includes('jsdom')) {
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

      render(
        <ThemeProvider theme={theme}>
          <Select variant={variant} value="first" data-testid="input">
            <MenuItem value="first" />
            <MenuItem value="second" />
          </Select>
        </ThemeProvider>,
      );

      expect(screen.getByTestId('input')).to.toHaveComputedStyle({
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

    it('should have root class', () => {
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

      expect(container.querySelector(`.${classes.root}`)).not.to.equal(null);
    });

    it('should merge the class names', () => {
      render(
        <Select
          className="foo"
          input={<InputBase data-testid="root" className="bar" />}
          value=""
        />,
      );

      expect(screen.getByTestId('root')).to.have.class('foo');
      expect(screen.getByTestId('root')).to.have.class('bar');
    });
  });

  it('should not focus select when clicking an arbitrary element with id="undefined"', () => {
    render(
      <React.Fragment>
        <div id="undefined" data-testid="test-element" />
        <Select value="" />
      </React.Fragment>,
    );

    fireEvent.click(screen.getByTestId('test-element'));

    expect(screen.getByRole('combobox')).not.toHaveFocus();
  });

  it('outlined icon should be selected from below css selectors', () => {
    const { container } = render(<Select value="" />);
    expect(container.querySelector('.MuiSelect-iconOutlined')).not.to.equal(null);
    expect(container.querySelector('.MuiSelect-outlined ~ .MuiSelect-icon')).not.to.equal(null);
  });

  it('standard icon should be selected from below css selectors', () => {
    const { container } = render(<Select value="" variant="standard" />);
    expect(container.querySelector('.MuiSelect-iconStandard')).not.to.equal(null);
    expect(container.querySelector('.MuiSelect-standard ~ .MuiSelect-icon')).not.to.equal(null);
  });

  it('filled icon should be selected from below css selectors', () => {
    const { container } = render(<Select value="" variant="filled" />);
    expect(container.querySelector('.MuiSelect-iconFilled')).not.to.equal(null);
    expect(container.querySelector('.MuiSelect-filled ~ .MuiSelect-icon')).not.to.equal(null);
  });

  it('should call onKeyDown when passed', async () => {
    const handleKeyDown = spy();

    render(
      <Select value="one" onKeyDown={handleKeyDown}>
        <MenuItem value="one">One</MenuItem>
        <MenuItem value="two">Two</MenuItem>
      </Select>,
    );

    const trigger = screen.getByRole('combobox');
    await act(async () => {
      trigger.focus();
    });

    fireEvent.keyDown(trigger, { key: 'a' });

    expect(handleKeyDown.callCount).to.equal(1);
    const event = handleKeyDown.firstCall.args[0];
    expect(event).to.have.property('key', 'a');
  });

  it('should call onMouseDown when passed', async () => {
    const handleMouseDown = spy();

    render(
      <Select value="one" onMouseDown={handleMouseDown}>
        <MenuItem value="one">One</MenuItem>
        <MenuItem value="two">Two</MenuItem>
      </Select>,
    );

    const trigger = screen.getByRole('combobox');
    await act(async () => {
      trigger.focus();
    });

    fireEvent.mouseDown(trigger);

    expect(handleMouseDown.callCount).to.equal(1);
    const event = handleMouseDown.firstCall.args[0];
    expect(event.button).to.equal(0);
  });

  describe('keyboard navigation in shadow DOM', () => {
    it('should navigate between options using arrow keys', async function test() {
      // reset fake timers
      clock.restore();

      if (window.navigator.userAgent.includes('jsdom')) {
        this.skip();
      }

      // Create a shadow container
      const shadowHost = document.createElement('div');
      document.body.appendChild(shadowHost);
      const shadowContainer = shadowHost.attachShadow({ mode: 'open' });

      // Render directly into shadow container
      const shadowRoot = document.createElement('div');
      shadowContainer.appendChild(shadowRoot);

      const { unmount, user } = render(
        <Select value="" MenuProps={{ container: shadowRoot }}>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>,
        { container: shadowRoot },
      );

      const trigger = shadowRoot.querySelector('[role="combobox"]');
      expect(trigger).not.to.equal(null);

      // Open Select
      await user.click(trigger);

      const options = shadowRoot.querySelectorAll('[role="option"]');
      expect(options.length).to.equal(3);

      expect(shadowContainer.activeElement).to.equal(options[0]);

      await user.keyboard('{ArrowDown}');

      expect(shadowContainer.activeElement).to.equal(options[1]);

      await user.keyboard('{ArrowUp}');

      expect(shadowContainer.activeElement).to.equal(options[0]);

      // Cleanup
      unmount();
      if (shadowHost.parentNode) {
        document.body.removeChild(shadowHost);
      }
    });
  });
});
