import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import Select, { SelectListboxSlotProps, selectClasses } from '@mui/base/Select';
import useOption, { SelectOption } from '@mui/base/useOption';
import Option, { OptionProps, optionClasses } from '@mui/base/Option';
import OptionGroup from '@mui/base/OptionGroup';
import {
  createMount,
  createRenderer,
  describeConformanceUnstyled,
  fireEvent,
  userEvent,
  act,
  screen,
} from 'test/utils';

describe('<Select />', () => {
  const mount = createMount();
  const { render } = createRenderer();

  const componentToTest = (
    <Select defaultListboxOpen slotProps={{ popper: { disablePortal: true } }}>
      <OptionGroup label="Group">
        <Option value={1}>1</Option>
      </OptionGroup>
    </Select>
  );

  describeConformanceUnstyled(componentToTest, () => ({
    inheritComponent: 'button',
    render,
    mount,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'span',
    muiName: 'MuiSelect',
    slots: {
      root: {
        expectedClassName: selectClasses.root,
      },
      listbox: {
        expectedClassName: selectClasses.listbox,
        testWithElement: 'ul',
      },
      popper: {
        expectedClassName: selectClasses.popper,
        testWithElement: null,
      },
    },
  }));

  describe('keyboard navigation', () => {
    ['Enter', 'ArrowDown', 'ArrowUp'].forEach((key) => {
      it(`opens the dropdown when the "${key}" key is down on the button`, () => {
        // can't use the default native `button` as it doesn't treat enter or space press as a click
        const { getByRole } = render(<Select slots={{ root: 'div' }} />);
        const select = getByRole('combobox');
        act(() => {
          select.focus();
        });
        fireEvent.keyDown(select, { key });

        expect(select).to.have.attribute('aria-expanded', 'true');
        expect(getByRole('listbox')).not.to.equal(null);
        expect(document.activeElement).to.equal(getByRole('listbox'));
      });
    });

    it(`opens the dropdown when the " " key is let go on the button`, () => {
      // can't use the default native `button` as it doesn't treat enter or space press as a click
      const { getByRole } = render(<Select slots={{ root: 'div' }} />);
      const select = getByRole('combobox');
      act(() => {
        select.focus();
      });
      fireEvent.keyUp(select, { key: ' ' });

      expect(select).to.have.attribute('aria-expanded', 'true');
      expect(getByRole('listbox')).not.to.equal(null);
      expect(document.activeElement).to.equal(getByRole('listbox'));
    });

    ['Enter', ' ', 'Escape'].forEach((key) => {
      it(`closes the dropdown when the "${key}" key is pressed`, () => {
        const { getByRole } = render(
          <Select>
            <Option value={1}>1</Option>
          </Select>,
        );
        const select = getByRole('combobox');
        act(() => {
          select.click();
        });

        const listbox = getByRole('listbox');
        fireEvent.keyDown(listbox, { key });

        expect(select).to.have.attribute('aria-expanded', 'false');
        expect(listbox).not.toBeVisible();
      });
    });

    ['Enter', ' '].forEach((key) => {
      it(`does not close the multiselect dropdown when the "${key}" key is pressed`, () => {
        const { getByRole, queryByRole } = render(
          <Select multiple>
            <Option value={1}>1</Option>
          </Select>,
        );
        const select = getByRole('combobox');
        act(() => {
          select.click();
        });

        const listbox = getByRole('listbox');
        userEvent.keyPress(listbox, { key });

        expect(select).to.have.attribute('aria-expanded', 'true');
        expect(queryByRole('listbox')).not.to.equal(null);
      });
    });

    describe('item selection', () => {
      ['Enter', ' '].forEach((key) =>
        it(`selects a highlighted item using the "${key}" key`, () => {
          const { getByRole } = render(
            <Select>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
            </Select>,
          );

          const select = getByRole('combobox');
          act(() => {
            select.click();
          });

          const listbox = getByRole('listbox');

          userEvent.keyPress(listbox, { key: 'ArrowDown' }); // highlights '2'
          fireEvent.keyDown(listbox, { key });

          expect(select).to.have.text('2');
        }),
      );
    });

    describe('text navigation', () => {
      it('navigate to matched key', () => {
        const { getByRole, getByText } = render(
          <Select>
            <Option value={1}>Apple</Option>
            <Option value={2}>Banana</Option>
            <Option value={3}>Cherry</Option>
            <Option value={4}>Calamondin</Option>
            <Option value={5}>Dragon Fruit</Option>
            <Option value={6}>Grapes</Option>
          </Select>,
        );

        const select = getByRole('combobox');
        act(() => {
          select.click();
        });

        const listbox = getByRole('listbox');

        userEvent.keyPress(listbox, { key: 'd' });
        expect(getByText('Dragon Fruit')).to.have.class(optionClasses.highlighted);
        userEvent.keyPress(listbox, { key: 'r' });
        expect(getByText('Dragon Fruit')).to.have.class(optionClasses.highlighted);
        userEvent.keyPress(listbox, { key: 'z' });
        expect(getByText('Dragon Fruit')).to.have.class(optionClasses.highlighted);
      });

      it('navigate to next element with same starting character on repeated keys', () => {
        const { getByRole, getByText } = render(
          <Select>
            <Option value={1}>Apple</Option>
            <Option value={2}>Banana</Option>
            <Option value={3}>Cherry</Option>
            <Option value={4}>Calamondin</Option>
            <Option value={5}>Dragon Fruit</Option>
            <Option value={6}>Grapes</Option>
          </Select>,
        );

        const select = getByRole('combobox');
        act(() => {
          select.click();
        });

        const listbox = getByRole('listbox');

        userEvent.keyPress(listbox, { key: 'c' });
        expect(getByText('Cherry')).to.have.class(optionClasses.highlighted);
        userEvent.keyPress(listbox, { key: 'c' });
        expect(getByText('Calamondin')).to.have.class(optionClasses.highlighted);
        userEvent.keyPress(listbox, { key: 'c' });
        expect(getByText('Cherry')).to.have.class(optionClasses.highlighted);
      });

      it('navigate using the label prop', () => {
        function RichOption(props: OptionProps<number>) {
          return (
            <Option {...props}>
              <div>
                Option Title
                <div>
                  Nested information
                  <p>{props.label || props.value}</p>
                </div>
              </div>
            </Option>
          );
        }

        const { getByRole, getByTestId } = render(
          <Select>
            <RichOption data-testid="1" value={1} label="Apple" />
            <RichOption data-testid="2" value={2} label="Banana" />
            <RichOption data-testid="3" value={3} label="Cherry" />
            <RichOption data-testid="4" value={4} label="Calamondin" />
            <RichOption data-testid="5" value={5} label="Dragon Fruit" />
            <RichOption data-testid="6" value={6} label="Grapes" />
          </Select>,
        );

        const select = getByRole('combobox');
        act(() => {
          select.click();
        });

        const listbox = getByRole('listbox');

        userEvent.keyPress(listbox, { key: 'd' });
        expect(getByTestId('5')).to.have.class(optionClasses.highlighted);
        userEvent.keyPress(listbox, { key: 'r' });
        expect(getByTestId('5')).to.have.class(optionClasses.highlighted);
        userEvent.keyPress(listbox, { key: 'z' });
        expect(getByTestId('5')).to.have.class(optionClasses.highlighted);
      });

      it('skips the non-stringifiable options', () => {
        const { getByRole, getByText } = render(
          <Select>
            <Option value={{ key: 'Apple' }}>Apple</Option>
            <Option value={{ key: 'Banana' }}>Banana</Option>
            <Option value={{ key: 'Cherry' }}>Cherry</Option>
            <Option value={<div />} />
            <Option value={{ key: 'Cherry' }}>
              <div>Nested Content</div>
            </Option>{' '}
            <Option value={{}}>{null}</Option>
            <Option value={{ key: 'Calamondin' }}>Calamondin</Option>
          </Select>,
        );

        const select = getByRole('combobox');
        act(() => {
          select.click();
        });

        const listbox = getByRole('listbox');

        userEvent.keyPress(listbox, { key: 'c' });
        expect(getByText('Cherry')).to.have.class(optionClasses.highlighted);
        userEvent.keyPress(listbox, { key: 'c' });
        expect(getByText('Calamondin')).to.have.class(optionClasses.highlighted);
        userEvent.keyPress(listbox, { key: 'c' });
        expect(getByText('Cherry')).to.have.class(optionClasses.highlighted);
      });

      it('navigate to options with diacritic characters', () => {
        const { getByRole, getByText } = render(
          <Select>
            <Option value={{ key: 'Aa' }}>Aa</Option>
            <Option value={{ key: 'Ba' }}>Ba</Option>
            <Option value={{ key: 'Bb' }}>Bb</Option>
            <Option value={{ key: 'Bc' }}>Bc</Option>
            <Option value={{ key: 'Bą' }}>Bą</Option>
          </Select>,
        );

        const select = getByRole('combobox');
        act(() => {
          select.click();
        });

        const listbox = getByRole('listbox');

        userEvent.keyPress(listbox, { key: 'b' });
        expect(getByText('Ba')).to.have.class(optionClasses.highlighted);

        userEvent.keyPress(listbox, { key: 'Control' });
        userEvent.keyPress(listbox, { key: 'Alt' });
        userEvent.keyPress(listbox, { key: 'ą' });
        expect(getByText('Bą')).to.have.class(optionClasses.highlighted);
      });

      it('navigate to next options with beginning diacritic characters', () => {
        const { getByRole, getByText } = render(
          <Select>
            <Option value={{ key: 'Aa' }}>Aa</Option>
            <Option value={{ key: 'ąa' }}>ąa</Option>
            <Option value={{ key: 'ąb' }}>ąb</Option>
            <Option value={{ key: 'ąc' }}>ąc</Option>
          </Select>,
        );

        const select = getByRole('combobox');
        act(() => {
          select.click();
        });

        const listbox = getByRole('listbox');

        userEvent.keyPress(listbox, { key: 'Control' });
        userEvent.keyPress(listbox, { key: 'Alt' });
        userEvent.keyPress(listbox, { key: 'ą' });
        expect(getByText('ąa')).to.have.class(optionClasses.highlighted);

        userEvent.keyPress(listbox, { key: 'Alt' });
        userEvent.keyPress(listbox, { key: 'Control' });
        userEvent.keyPress(listbox, { key: 'ą' });
        expect(getByText('ąb')).to.have.class(optionClasses.highlighted);

        userEvent.keyPress(listbox, { key: 'Control' });
        userEvent.keyPress(listbox, { key: 'AltGraph' });
        userEvent.keyPress(listbox, { key: 'ą' });
        expect(getByText('ąc')).to.have.class(optionClasses.highlighted);
      });
    });

    it('closes the listbox without selecting an option when "Escape" is pressed', () => {
      const { getByRole, queryByRole } = render(
        <Select defaultValue={1}>
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
        </Select>,
      );

      const select = getByRole('combobox');

      act(() => {
        select.click();
      });

      const listbox = getByRole('listbox');
      fireEvent.keyDown(listbox, { key: 'ArrowDown' }); // highlights '2'
      fireEvent.keyDown(listbox, { key: 'Escape' });

      expect(select).to.have.attribute('aria-expanded', 'false');
      expect(select).to.have.text('1');
      expect(queryByRole('listbox', { hidden: true })).not.toBeVisible();
    });

    it('scrolls to highlighted option so it is visible', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      // two options are visible at a time
      const SelectListbox = React.forwardRef(function SelectListbox(
        props: SelectListboxSlotProps<string, false>,
        ref: React.ForwardedRef<HTMLUListElement>,
      ) {
        const { ownerState, ...other } = props;
        return <ul {...other} ref={ref} style={{ maxHeight: '100px', overflow: 'auto' }} />;
      });

      const CustomOption = React.forwardRef(function CustomOption(
        props: { value: string; children?: React.ReactNode },
        ref: React.Ref<HTMLLIElement>,
      ) {
        return <Option {...props} ref={ref} slotProps={{ root: { style: { height: '50px' } } }} />;
      });

      const { getByRole } = render(
        <Select slots={{ listbox: SelectListbox }}>
          <CustomOption value="1">1</CustomOption>
          <CustomOption value="2">2</CustomOption>
          <CustomOption value="3">3</CustomOption>
          <CustomOption value="4">4</CustomOption>
          <CustomOption value="5">5</CustomOption>
          <CustomOption value="6">6</CustomOption>
        </Select>,
      );

      const select = getByRole('combobox');

      act(() => {
        select.focus();
      });

      fireEvent.keyDown(select, { key: 'ArrowDown' }); // opens the listbox and highlights 1

      const listbox = getByRole('listbox');

      fireEvent.keyDown(listbox, { key: 'ArrowDown' }); // highlights 2
      expect(listbox.scrollTop).to.equal(0);

      fireEvent.keyDown(listbox, { key: 'ArrowDown' }); // highlights 3
      expect(listbox.scrollTop).to.equal(50);

      fireEvent.keyDown(listbox, { key: 'ArrowDown' }); // highlights 4
      expect(listbox.scrollTop).to.equal(100);

      fireEvent.keyDown(listbox, { key: 'ArrowUp' }); // highlights 3
      expect(listbox.scrollTop).to.equal(100);

      fireEvent.keyDown(listbox, { key: 'ArrowUp' }); // highlights 2
      expect(listbox.scrollTop).to.equal(50);
    });
  });

  describe('form submission', () => {
    describe('using single-select mode', () => {
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
            <Select
              defaultValue={2}
              multiple={false}
              name="test-select"
              getSerializedValue={customFormValueProvider}
            >
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

    describe('using multi-select mode', () => {
      it('includes the Select value in the submitted form data when the `name` attribute is provided', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // FormData is not available in JSDOM
          this.skip();
        }

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          expect(formData.get('test-select')).to.equal('2,3');
        };

        const { getByText } = render(
          <form onSubmit={handleSubmit}>
            <Select multiple defaultValue={[2, 3]} name="test-select">
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
            </Select>
            <button type="submit">Submit</button>
          </form>,
        );

        const button = getByText('Submit');
        act(() => {
          button.click();
        });
      });

      it('transforms the selected value before posting using the getSerializedValue prop, if provided', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // FormData is not available in JSDOM
          this.skip();
        }

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          expect(formData.get('test-select')).to.equal('2; 3');
        };

        const customFormValueProvider = (options: SelectOption<number>[]) =>
          options.map((o) => o.value).join('; ');

        const { getByText } = render(
          <form onSubmit={handleSubmit}>
            <Select
              multiple
              defaultValue={[2, 3]}
              name="test-select"
              getSerializedValue={customFormValueProvider}
            >
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
            </Select>
            <button type="submit">Submit</button>
          </form>,
        );

        const button = getByText('Submit');
        act(() => {
          button.click();
        });
      });

      it('formats the object values as JSON before posting', function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // FormData is not available in JSDOM
          this.skip();
        }

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          expect(formData.get('test-select')).to.equal('[{"firstName":"Olivia"}]');
        };

        const options = [
          { value: { firstName: 'Alice' }, label: 'Alice' },
          { value: { firstName: 'Olivia' }, label: 'Olivia' },
        ];

        const { getByText } = render(
          <form onSubmit={handleSubmit}>
            <Select multiple defaultValue={[options[1].value]} name="test-select">
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
      });
    });
  });

  describe('prop: onChange', () => {
    it('is called when the Select value changes', () => {
      const handleChange = spy();

      const { getByRole, getByText } = render(
        <Select defaultValue={1} onChange={handleChange}>
          <Option value={1}>One</Option>
          <Option value={2}>Two</Option>
        </Select>,
      );

      const select = getByRole('combobox');
      act(() => {
        select.click();
      });

      const optionTwo = getByText('Two');
      act(() => {
        optionTwo.click();
      });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][0]).to.haveOwnProperty('type', 'click');
      expect(handleChange.args[0][0]).to.haveOwnProperty('target', optionTwo);
      expect(handleChange.args[0][1]).to.equal(2);
    });

    it('does not call onChange if `value` is modified externally', () => {
      function TestComponent({ onChange }: { onChange: (value: number[]) => void }) {
        const [value, setValue] = React.useState([1]);
        const handleChange = (ev: React.SyntheticEvent | null, newValue: number[]) => {
          setValue(newValue);
          onChange(newValue);
        };

        return (
          <div>
            <button onClick={() => setValue([1, 2])}>Update value</button>
            <Select value={value} multiple onChange={handleChange}>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
            </Select>
          </div>
        );
      }

      const onChange = spy();
      const { getByText } = render(<TestComponent onChange={onChange} />);

      const button = getByText('Update value');
      act(() => button.click());
      expect(onChange.notCalled).to.equal(true);
    });
  });

  describe('prop: renderValue', () => {
    it('renders the selected value using the renderValue prop', () => {
      const { getByRole } = render(
        <Select defaultValue={1} renderValue={(value) => `${value?.label} (${value?.value})`}>
          <Option value={1}>One</Option>
          <Option value={2}>Two</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.text('One (1)');
    });

    it('renders the selected value as a label if renderValue is not provided', () => {
      const { getByRole } = render(
        <Select defaultValue={1}>
          <Option value={1}>One</Option>
          <Option value={2}>Two</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.text('One');
    });

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
  });

  // according to WAI-ARIA 1.2 (https://www.w3.org/TR/wai-aria-1.2/#combobox)
  describe('a11y attributes', () => {
    it('should have the `combobox` role', () => {
      render(
        <Select>
          <Option value={1}>One</Option>
        </Select>,
      );

      expect(screen.queryByRole('combobox')).not.to.equal(null);
    });

    it('should have the aria-haspopup listbox', () => {
      render(
        <Select>
          <Option value={1}>One</Option>
        </Select>,
      );

      expect(screen.getByRole('combobox')).to.have.attribute('aria-haspopup', 'listbox');
    });

    it('should have the aria-expanded attribute', () => {
      render(
        <Select>
          <Option value={1}>One</Option>
        </Select>,
      );

      expect(screen.getByRole('combobox')).to.have.attribute('aria-expanded', 'false');
    });

    it('should have the aria-expanded attribute set to true when the listbox is open', () => {
      render(
        <Select>
          <Option value={1}>One</Option>
        </Select>,
      );

      const select = screen.getByRole('combobox');
      act(() => {
        select.click();
      });

      expect(select).to.have.attribute('aria-expanded', 'true');
    });

    it('should have the aria-controls attribute', () => {
      render(
        <Select>
          <Option value={1}>One</Option>
        </Select>,
      );

      const select = screen.getByRole('combobox');

      act(() => {
        select.click();
      });

      const listbox = screen.getByRole('listbox');
      const listboxId = listbox.getAttribute('id');
      expect(listboxId).not.to.equal(null);

      expect(select).to.have.attribute('aria-controls', listboxId!);
    });

    it('should have the aria-activedescendant attribute', () => {
      render(
        <Select>
          <Option value={1}>One</Option>
        </Select>,
      );

      const select = screen.getByRole('combobox');
      act(() => {
        select.click();
      });

      const listbox = screen.getByRole('listbox');
      fireEvent.keyDown(listbox, { key: 'ArrowDown' });

      const options = screen.getAllByRole('option');
      expect(listbox).to.have.attribute('aria-activedescendant', options[0].getAttribute('id')!);
    });
  });

  describe('open/close behavior', () => {
    it('closes the listbox without selecting an option when focus is lost', () => {
      const { getByRole, getByTestId } = render(
        <div>
          <Select defaultValue={1}>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
          </Select>
          <p data-testid="focus-target" tabIndex={0}>
            focus target
          </p>
        </div>,
      );

      const select = getByRole('combobox');

      act(() => {
        select.click();
      });

      const listbox = getByRole('listbox');
      userEvent.keyPress(listbox, { key: 'ArrowDown' }); // highlights '2'

      const focusTarget = getByTestId('focus-target');
      act(() => {
        focusTarget.focus();
      });

      expect(select).to.have.attribute('aria-expanded', 'false');
      expect(select).to.have.text('1');
      expect(listbox).not.toBeVisible();
    });

    it('closes the listbox when already selected option is selected again with a click', () => {
      const { getByRole, getByTestId } = render(
        <Select defaultValue={1}>
          <Option data-testid="selected-option" value={1}>
            1
          </Option>
          <Option value={2}>2</Option>
        </Select>,
      );

      const select = getByRole('combobox');

      act(() => {
        select.click();
      });

      const selectedOption = getByTestId('selected-option');
      fireEvent.click(selectedOption);

      expect(select).to.have.attribute('aria-expanded', 'false');
      expect(select).to.have.text('1');
    });

    it('focuses the listbox after it is opened', () => {
      const { getByRole } = render(
        <Select>
          <Option value={1}>1</Option>
        </Select>,
      );

      const select = getByRole('combobox');
      act(() => {
        select.click();
      });

      expect(document.activeElement).to.equal(getByRole('listbox'));
    });

    it('scrolls to initially highlighted option after opening', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        this.skip();
      }

      // two options are visible at a time
      const SelectListbox = React.forwardRef(function SelectListbox(
        props: SelectListboxSlotProps<string, false>,
        ref: React.ForwardedRef<HTMLUListElement>,
      ) {
        const { ownerState, ...other } = props;
        return <ul {...other} ref={ref} style={{ maxHeight: '100px', overflow: 'auto' }} />;
      });

      const CustomOption = React.forwardRef(function CustomOption(
        props: { value: string; children?: React.ReactNode },
        ref: React.Ref<HTMLLIElement>,
      ) {
        return <Option {...props} ref={ref} slotProps={{ root: { style: { height: '50px' } } }} />;
      });

      const { getByRole } = render(
        <Select slots={{ listbox: SelectListbox }} defaultValue={'4'}>
          <CustomOption value="1">1</CustomOption>
          <CustomOption value="2">2</CustomOption>
          <CustomOption value="3">3</CustomOption>
          <CustomOption value="4">4</CustomOption>
          <CustomOption value="5">5</CustomOption>
          <CustomOption value="6">6</CustomOption>
        </Select>,
      );

      const select = getByRole('combobox');

      act(() => {
        select.click();
      });

      const listbox = getByRole('listbox');
      expect(listbox.scrollTop).to.equal(100);
    });
  });

  it('sets a value correctly when interacted by a user and external code', () => {
    function TestComponent() {
      const [value, setValue] = React.useState<number[]>([]);

      return (
        <div>
          <button data-testid="update-externally" onClick={() => setValue([1])}>
            Update value
          </button>
          <Select
            multiple
            value={value}
            onChange={(_, v) => setValue(v)}
            slotProps={{
              root: {
                'data-testid': 'select',
              } as any,
            }}
          >
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
          </Select>
        </div>
      );
    }

    const { getByTestId, getByText } = render(<TestComponent />);
    const updateButton = getByTestId('update-externally');
    const selectButton = getByTestId('select');

    act(() => updateButton.click());
    act(() => selectButton.click());

    const option2 = getByText('2');
    act(() => option2.click());

    expect(selectButton).to.have.text('1, 2');
  });

  it('perf: does not rerender options unnecessarily', () => {
    const renderOption1Spy = spy();
    const renderOption2Spy = spy();
    const renderOption3Spy = spy();
    const renderOption4Spy = spy();

    function CustomOption(props: OptionProps<number> & { renderSpy?: () => void }) {
      const { renderSpy, value } = props;
      renderSpy?.();

      const { getRootProps } = useOption({
        value,
        label: value.toString(),
        disabled: false,
      });

      return <li {...getRootProps} />;
    }

    const { getByRole } = render(
      <Select>
        <CustomOption renderSpy={renderOption1Spy} value={1}>
          1
        </CustomOption>
        <CustomOption renderSpy={renderOption2Spy} value={2}>
          2
        </CustomOption>
        <CustomOption renderSpy={renderOption3Spy} value={3}>
          3
        </CustomOption>
        <CustomOption renderSpy={renderOption4Spy} value={4}>
          4
        </CustomOption>
      </Select>,
    );

    renderOption1Spy.resetHistory();
    renderOption2Spy.resetHistory();
    renderOption3Spy.resetHistory();
    renderOption4Spy.resetHistory();

    const select = getByRole('combobox');
    act(() => {
      select.click(); // opens and highlights '1'
    });

    // React renders twice in strict mode, so we expect twice the number of spy calls
    expect(renderOption1Spy.callCount).to.equal(2);

    const listbox = getByRole('listbox');
    fireEvent.keyDown(listbox, { key: 'ArrowDown' }); // highlights '2'
    expect(renderOption1Spy.callCount).to.equal(4); // '1' rerenders as it loses highlight
    expect(renderOption2Spy.callCount).to.equal(2); // '2' rerenders as it receives highlight

    fireEvent.keyDown(listbox, { key: 'Enter' }); // selects '2'
    expect(renderOption1Spy.callCount).to.equal(4);
    expect(renderOption2Spy.callCount).to.equal(4);

    // neither the highlighted nor the selected state of these options changed,
    // so they don't need to rerender:
    expect(renderOption3Spy.callCount).to.equal(0);
    expect(renderOption4Spy.callCount).to.equal(0);
  });
});
