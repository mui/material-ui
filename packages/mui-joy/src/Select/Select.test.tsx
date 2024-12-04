import * as React from 'react';
import { expect } from 'chai';
import { spy, stub } from 'sinon';
import { act, createRenderer, fireEvent, screen } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import Select, { selectClasses as classes, SelectOption } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListDivider from '@mui/joy/ListDivider';
import describeConformance from '../../test/describeConformance';

describe('Joy <Select />', () => {
  const { render } = createRenderer({ clock: 'fake' });

  describeConformance(<Select startDecorator="1" endDecorator="1" />, () => ({
    render,
    inheritComponent: 'div',
    classes,
    ThemeProvider,
    refInstanceof: window.HTMLDivElement,
    muiName: 'JoySelect',
    testDeepOverrides: { slotName: 'button', slotClassName: classes.button },
    testVariantProps: { variant: 'soft' },
    slots: {
      root: { expectedClassName: classes.root },
      button: { expectedClassName: classes.button },
      listbox: {
        testWithComponent: React.forwardRef<HTMLUListElement>((props, ref) => {
          const excludePopperProps = <T extends Record<string, any>>({
            anchorEl,
            direction,
            disablePortal,
            keepMounted,
            modifiers,
            open,
            placement,
            popperOptions,
            popperRef,
            TransitionProps,
            ownerState,
            ...other
          }: T) => other;
          return <ul ref={ref} {...excludePopperProps(props)} data-testid="custom" />;
        }),
        testWithElement: null,
        expectedClassName: classes.listbox,
      },
      startDecorator: { expectedClassName: classes.startDecorator },
      endDecorator: { expectedClassName: classes.endDecorator },
    },
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

    expect(screen.getByRole('combobox')).to.have.text('Ten');
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
        name="blur-testing"
        slotProps={{
          button: {
            onBlur: handleBlur,
          },
        }}
        value=""
      >
        <Option value="">none</Option>
      </Select>,
    );
    const select = getByRole('combobox');
    act(() => {
      select.focus();
    });

    act(() => {
      select.blur();
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

  it('should focus the trigger button if no selection', () => {
    const { getByRole } = render(<Select value="" autoFocus />);

    fireEvent.keyDown(getByRole('combobox'), { key: 'ArrowDown' });

    expect(getByRole('combobox')).toHaveFocus();
  });

  describe('prop: onChange', () => {
    it('should get selected value from the 2nd argument', () => {
      const onChangeHandler = spy();
      const { getAllByRole, getByRole } = render(
        <Select onChange={onChangeHandler} value="0">
          <Option value="0" />
          <Option value="1" />
          <Option value="2" />
        </Select>,
      );
      fireEvent.click(getByRole('combobox'));
      act(() => {
        getAllByRole('option')[1].click();
      });

      expect(onChangeHandler.calledOnce).to.equal(true);
      expect(onChangeHandler.args[0][1]).to.equal('1');
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
      const { getByRole } = render(<Select defaultListboxOpen value="" />);
      expect(getByRole('combobox', { hidden: true })).to.have.attribute('aria-expanded', 'true');
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

      expect(getByRole('combobox')).to.have.text('Twenty');
    });
  });

  describe('SVG icon', () => {
    it('should present an SVG icon', () => {
      const { container } = render(
        <Select value={1}>
          <option value={0}>Zero</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
        </Select>,
      );
      expect(container.querySelector('svg')).toBeVisible();
    });

    it('should be able to customize SVG icon', () => {
      render(
        <Select value={1} indicator={<span data-testid="foo" />}>
          <option value={0}>Zero</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
        </Select>,
      );
      expect(screen.getByTestId('foo')).toBeVisible();
    });

    it('should remove SVG icon', () => {
      const { container } = render(
        <Select value={1} indicator={null}>
          <option value={0}>Zero</option>
          <option value={1}>One</option>
          <option value={2}>Two</option>
        </Select>,
      );
      expect(container.querySelector('svg')).to.equal(null);
    });
  });

  describe('accessibility', () => {
    it('associated with a label', () => {
      render(
        <div>
          <label htmlFor="foo-bar">label</label>
          <Select id="foo-bar" />
        </div>,
      );
      fireEvent.click(screen.getByLabelText('label'));
      expect(screen.getByRole('listbox')).toBeVisible();
    });

    it('sets aria-expanded="true" when the listbox is displayed', () => {
      // since we make the rest of the UI inaccessible when open this doesn't
      // technically matter. This is only here in case we keep the rest accessible
      const { getByRole } = render(<Select defaultListboxOpen value="" />);

      expect(getByRole('combobox', { hidden: true })).to.have.attribute('aria-expanded', 'true');
    });

    specify('ARIA 1.2: aria-expanded="false" if the listbox isn\'t displayed', () => {
      const { getByRole } = render(<Select value="" />);

      expect(getByRole('combobox')).to.have.attribute('aria-expanded', 'false');
    });

    // TODO: need to make this work
    // aria-disabled is better then disabled. https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled
    // it('sets aria-disabled="true" when component is disabled', () => {
    //   const { getByRole } = render(<Select disabled value="" />);
    //   expect(getByRole('combobox')).to.have.attribute('aria-disabled', 'true');
    // });

    specify('aria-disabled is not present if component is not disabled', () => {
      const { getByRole } = render(<Select disabled={false} value="" />);

      expect(getByRole('combobox')).not.to.have.attribute('aria-disabled');
    });

    it('renders an element with listbox behavior', () => {
      const { getByRole } = render(<Select defaultListboxOpen value="" />);

      expect(getByRole('listbox')).toBeVisible();
    });

    it('identifies each selectable element containing an option', () => {
      const { getAllByRole } = render(
        <Select defaultListboxOpen value="">
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
        <Select defaultListboxOpen value="2">
          <Option value="1">First</Option>
          <Option value="2">Second</Option>
        </Select>,
      );

      expect(getAllByRole('option')[1]).to.have.attribute('aria-selected', 'true');
    });

    describe('Grouped options', () => {
      it('first selectable option is focused to use the arrow', () => {
        const { getByRole, getAllByRole } = render(
          <Select autoFocus defaultValue="" slotProps={{ listbox: { component: 'div' } }}>
            <List role="group">
              <ListItem role="presentation">Category 1</ListItem>
              <Option value={1}>Option 1</Option>
              <Option value={2}>Option 2</Option>
            </List>
            <List role="group">
              <ListItem role="presentation">Category 2</ListItem>
              <Option value={3}>Option 3</Option>
              <Option value={4}>Option 4</Option>
            </List>
          </Select>,
        );

        const combobox = getByRole('combobox');
        fireEvent.keyDown(combobox, { key: 'ArrowDown' }); // open listbox

        const options = getAllByRole('option');
        fireEvent.keyDown(options[0], { key: 'ArrowDown' }); // move focus to Option 2
        fireEvent.keyDown(options[1], { key: 'Enter' }); // select Option 2

        expect(options[1]).to.have.attribute('aria-selected', 'true');
      });
    });

    it('it will fallback to its content for the accessible name when it has no name', () => {
      const { getByRole } = render(<Select value="" />);

      expect(getByRole('combobox')).not.to.have.attribute('aria-labelledby');
    });

    specify('the list of options is not labelled by default', () => {
      const { getByRole } = render(<Select defaultListboxOpen value="" />);

      expect(getByRole('listbox')).not.to.have.attribute('aria-labelledby');
    });

    it('should have appropriate accessible description when provided in props', () => {
      const { getByRole } = render(
        <React.Fragment>
          <Select value="" aria-describedby="select-helper-text" />
          <span id="select-helper-text">Helper text content</span>
        </React.Fragment>,
      );

      const target = getByRole('combobox');
      expect(target).to.have.attribute('aria-describedby', 'select-helper-text');
      expect(target).toHaveAccessibleDescription('Helper text content');
    });
  });

  describe('prop: renderValue', () => {
    it('should use the prop to render the value', () => {
      const renderValue = (x: { value: number } | null) => `0b${x?.value.toString(2)}`;
      const { getByRole } = render(
        <Select renderValue={renderValue} value={4}>
          <Option value={2}>2</Option>
          <Option value={4}>4</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.text('0b100');
    });
  });

  describe('prop: name', () => {
    it('should have no id when name is not provided', () => {
      const { getByRole } = render(<Select value="" />);

      expect(getByRole('combobox')).not.to.have.attribute('id');
    });
  });

  it('should pass onClick prop to Option', () => {
    const onClick = spy();
    const { getAllByRole } = render(
      <Select defaultListboxOpen value="30">
        <Option onClick={onClick} value={30}>
          Thirty
        </Option>
      </Select>,
    );

    const options = getAllByRole('option');
    fireEvent.click(options[0]);

    expect(onClick.callCount).to.equal(1);
  });

  it('should not override the event.target on mouse events', () => {
    const handleChange = spy();
    const handleClick = spy();
    render(
      <div onClick={handleClick}>
        <Select defaultListboxOpen onChange={handleChange} value="second">
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
      <Select defaultListboxOpen onChange={handleChange} value="second">
        <Option value="first" />
        <ListDivider />
        <Option value="second" />
      </Select>,
    );

    const divider = screen.getByRole('separator');
    act(() => {
      divider.click();
    });
    expect(handleChange.callCount).to.equal(0);
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

  describe('form submission', () => {
    it('includes the Select value in the submitted form data when the `name` attribute is provided', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // FormData is not available in JSDOM
        this.skip();
      }

      let isEventHandled = false;

      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        expect(formData.get('test-select')).to.equal('2');
        isEventHandled = true;
      };

      const { getByText } = render(
        <form onSubmit={handleSubmit}>
          <Select defaultValue={2} name="test-select">
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
          </Select>
          <button type="submit">Submit</button>
        </form>,
      );

      const button = getByText('Submit');
      act(() => {
        button.click();
      });

      expect(isEventHandled).to.equal(true);
    });

    it('transforms the selected value before posting using the getSerializedValue prop, if provided', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // FormData is not available in JSDOM
        this.skip();
      }

      let isEventHandled = false;

      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        expect(formData.get('test-select')).to.equal('option 2');
        isEventHandled = true;
      };

      const customFormValueProvider = (option: SelectOption<number> | null) =>
        option != null ? `option ${option.value}` : '';

      const { getByText } = render(
        <form onSubmit={handleSubmit}>
          <Select defaultValue={2} name="test-select" getSerializedValue={customFormValueProvider}>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
          </Select>
          <button type="submit">Submit</button>
        </form>,
      );

      const button = getByText('Submit');
      act(() => {
        button.click();
      });

      expect(isEventHandled).to.equal(true);
    });

    it('formats the object values as JSON before posting', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // FormData is not available in JSDOM
        this.skip();
      }

      let isEventHandled = false;

      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        expect(formData.get('test-select')).to.equal('{"firstName":"Olivia"}');
        isEventHandled = true;
      };

      const options = [
        { value: { firstName: 'Alice' }, label: 'Alice' },
        { value: { firstName: 'Olivia' }, label: 'Olivia' },
      ];

      const { getByText } = render(
        <form onSubmit={handleSubmit}>
          <Select defaultValue={options[1].value} name="test-select">
            {options.map((o) => (
              <Option key={o.value.firstName} value={o.value}>
                {o.label}
              </Option>
            ))}
          </Select>
          <button type="submit">Submit</button>
        </form>,
      );

      const button = getByText('Submit');
      act(() => {
        button.click();
      });

      expect(isEventHandled).to.equal(true);
    });
  });

  it('should show dropdown if the children of the select button is clicked', () => {
    const { getByTestId, getByRole } = render(
      <Select
        defaultValue="1"
        renderValue={(option) => <span data-testid="test-element">{option?.label}</span>}
      >
        <Option value="1">Eric</Option>
      </Select>,
    );
    // Fire Click of the avatar
    act(() => {
      fireEvent.click(getByTestId('test-element'));
    });

    expect(getByRole('combobox', { hidden: true })).to.have.attribute('aria-expanded', 'true');

    // click again should close
    act(() => {
      fireEvent.click(getByTestId('test-element'));
    });
    expect(getByRole('combobox', { hidden: true })).to.have.attribute('aria-expanded', 'false');
  });

  describe('prop: multiple', () => {
    it('renders the selected values (multiple) using the renderValue prop', () => {
      const { getByRole } = render(
        <Select
          multiple
          defaultValue={[1, 2]}
          renderValue={(values) => values.map((v) => `${v.label} (${v.value})`).join(', ')}
        >
          <Option value={1}>One</Option>
          <Option value={2}>Two</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.text('One (1), Two (2)');
    });

    it('renders the selected values (multiple) as comma-separated list of labels if renderValue is not provided', () => {
      const { getByRole } = render(
        <Select multiple defaultValue={[1, 2]}>
          <Option value={1}>One</Option>
          <Option value={2}>Two</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.text('One, Two');
    });

    it('should render placeholder when options are not selected', () => {
      const { getByRole } = render(
        <Select multiple defaultValue={[]} placeholder="hello">
          <Option value={1}>One</Option>
          <Option value={2}>Two</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.text('hello');
    });

    it('renders the selected values inplace of placeholder', () => {
      const { getByRole } = render(
        <Select multiple defaultValue={[1, 2]} placeholder="hello">
          <Option value={1}>One</Option>
          <Option value={2}>Two</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.text('One, Two');
      expect(getByRole('combobox')).not.to.have.text('hello');
    });
  });
});
