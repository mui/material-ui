import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import {
  createRenderer,
  fireEvent,
  act,
  screen,
  MuiRenderResult,
  RenderOptions,
  flushMicrotasks,
} from '@mui/internal-test-utils';
import userEvent from '@testing-library/user-event';
import { Select, SelectListboxSlotProps, selectClasses } from '@mui/base/Select';
import { SelectOption } from '@mui/base/useOption';
import { Option, OptionProps, OptionRootSlotProps, optionClasses } from '@mui/base/Option';
import { OptionGroup } from '@mui/base/OptionGroup';
import { describeConformanceUnstyled } from '../../test/describeConformanceUnstyled';

// TODO v6: initialize @testing-library/user-event using userEvent.setup() instead of directly calling methods e.g. userEvent.click() for all related tests in this file
// currently the setup() method uses the ClipboardEvent constructor which is incompatible with our lowest supported version of iOS Safari (12.2) https://github.com/mui/material-ui/blob/master/.browserslistrc#L44
// userEvent.setup() requires Safari 14 or up to work

describe('<Select />', () => {
  const { render: internalRender } = createRenderer();

  async function render(
    element: React.ReactElement<any, string | React.JSXElementConstructor<any>>,
    options?: RenderOptions,
  ): Promise<MuiRenderResult> {
    const rendered = internalRender(element, options);
    await flushMicrotasks();
    return rendered;
  }

  const componentToTest = (
    <Select defaultListboxOpen defaultValue={1}>
      <OptionGroup label="Group">
        <Option value={1}>1</Option>
      </OptionGroup>
    </Select>
  );

  describeConformanceUnstyled(componentToTest, () => ({
    inheritComponent: 'button',
    render,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'span',
    slots: {
      root: {
        expectedClassName: selectClasses.root,
      },
      listbox: {
        expectedClassName: selectClasses.listbox,
        testWithElement: 'ul',
      },
      popup: {
        expectedClassName: selectClasses.popup,
        testWithElement: 'span',
      },
    },
    skip: ['componentProp'],
  }));

  describe('selected option rendering', () => {
    it('renders the selected option when it is specified as an only child', async () => {
      const markup = (
        <Select defaultValue="1">
          <Option value="1">One</Option>
        </Select>
      );

      const { getByRole } = await render(markup);
      const select = getByRole('combobox');

      expect(select).to.have.text('One');
    });

    it('renders the selected option when it is specified among many children', async () => {
      const markup = (
        <Select defaultValue="1">
          <Option value="1">
            <img src="one.png" alt="One" /> One
          </Option>
        </Select>
      );

      const { getByRole } = await render(markup);
      const select = getByRole('combobox');

      expect(select).to.have.text('One');
    });

    it('renders the selected option when it is specified in the label prop', async () => {
      const markup = (
        <Select defaultValue="1">
          <Option value="1" label="One">
            <img src="one.png" alt="One" />
          </Option>
        </Select>
      );

      const { getByRole } = await render(markup);
      const select = getByRole('combobox');

      expect(select).to.have.text('One');
    });
  });

  describe('keyboard navigation', () => {
    [<Select />, <Select slots={{ root: 'span' }} />].forEach((selectComponent) => {
      const triggerType = selectComponent.props.slots?.root ? 'non-native' : 'native';
      ['Enter', 'ArrowDown', 'ArrowUp', ' '].forEach((key) => {
        it(`opens the dropdown when the "${key}" key is pressed on a ${triggerType} button trigger`, async () => {
          const { getByRole } = await render(selectComponent);
          const select = getByRole('combobox');
          act(() => {
            select.focus();
          });

          await userEvent.keyboard(`{${key}}`);

          expect(select).to.have.attribute('aria-expanded', 'true');
          expect(getByRole('listbox')).not.to.equal(null);
        });
      });
    });

    ['Enter', ' ', 'Escape'].forEach((key) => {
      it(`closes the dropdown when the "${key}" key is pressed`, async () => {
        const { getByRole } = await render(
          <Select>
            <Option value={1}>1</Option>
          </Select>,
        );
        const select = getByRole('combobox');
        act(() => {
          select.click();
        });

        const listbox = getByRole('listbox');
        await userEvent.keyboard(`{${key}}`);

        expect(select).to.have.attribute('aria-expanded', 'false');
        expect(listbox).toBeHidden();
      });
    });

    ['Enter', ' '].forEach((key) => {
      it(`does not close the multiselect dropdown when the "${key}" key is pressed`, async () => {
        const { getByRole, queryByRole } = await render(
          <Select multiple>
            <Option value={1}>1</Option>
          </Select>,
        );
        const select = getByRole('combobox');
        act(() => {
          select.click();
        });

        await userEvent.keyboard(`{${key}}`);

        expect(select).to.have.attribute('aria-expanded', 'true');
        expect(queryByRole('listbox')).not.to.equal(null);
      });
    });

    describe('item selection', () => {
      ['Enter', ' '].forEach((key) =>
        it(`selects a highlighted item using the "${key}" key in single mode`, async () => {
          const { getByRole } = await render(
            <Select>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
            </Select>,
          );

          const select = getByRole('combobox');

          await userEvent.pointer({ target: select, keys: '[MouseLeft]' });
          await userEvent.keyboard('{ArrowDown}');
          await userEvent.keyboard(`{${key}}`);

          expect(select).to.have.text('2');
        }),
      );

      ['Enter', ' '].forEach((key) =>
        it(`selects a highlighted item using the "${key}" key in multiple mode`, async () => {
          const { getByRole } = await render(
            <Select multiple>
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
            </Select>,
          );

          const select = getByRole('combobox');

          await userEvent.pointer({ target: select, keys: '[MouseLeft]' });
          await userEvent.keyboard(`{${key}}`);
          await userEvent.keyboard('{ArrowDown}');
          await userEvent.keyboard(`{${key}}`);

          expect(select).to.have.text('1, 2');
        }),
      );
    });

    describe('text navigation', () => {
      it('navigate to matched key', async () => {
        const { getByRole, getByText } = await render(
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

        await userEvent.keyboard('d');
        expect(getByText('Dragon Fruit')).to.have.class(optionClasses.highlighted);
        await userEvent.keyboard('r');
        expect(getByText('Dragon Fruit')).to.have.class(optionClasses.highlighted);
        await userEvent.keyboard('z');
        expect(getByText('Dragon Fruit')).to.have.class(optionClasses.highlighted);
      });

      it('navigate to next element with same starting character on repeated keys', async () => {
        const { getByRole, getByText } = await render(
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

        await userEvent.keyboard('c');
        expect(getByText('Cherry')).to.have.class(optionClasses.highlighted);
        await userEvent.keyboard('c');
        expect(getByText('Calamondin')).to.have.class(optionClasses.highlighted);
        await userEvent.keyboard('c');
        expect(getByText('Cherry')).to.have.class(optionClasses.highlighted);
      });

      it('navigate using the label prop', async () => {
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

        const { getByRole, getByTestId } = await render(
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

        await userEvent.keyboard('d');
        expect(getByTestId('5')).to.have.class(optionClasses.highlighted);
        await userEvent.keyboard('r');
        expect(getByTestId('5')).to.have.class(optionClasses.highlighted);
        await userEvent.keyboard('z');
        expect(getByTestId('5')).to.have.class(optionClasses.highlighted);
      });

      it('skips the non-stringifiable options', async () => {
        const { getByRole, getByText } = await render(
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

        await userEvent.keyboard('c');
        expect(getByText('Cherry')).to.have.class(optionClasses.highlighted);
        await userEvent.keyboard('c');
        expect(getByText('Calamondin')).to.have.class(optionClasses.highlighted);
        await userEvent.keyboard('c');
        expect(getByText('Cherry')).to.have.class(optionClasses.highlighted);
      });

      it('navigate to options with diacritic characters', async () => {
        const { getByRole, getByText } = await render(
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

        await userEvent.keyboard('b');
        expect(getByText('Ba')).to.have.class(optionClasses.highlighted);

        await userEvent.keyboard('{Control>}{Alt>}ą{/Alt}{/Control}');
        expect(getByText('Bą')).to.have.class(optionClasses.highlighted);
      });

      it('navigate to next options with beginning diacritic characters', async () => {
        const { getByRole, getByText } = await render(
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

        await userEvent.keyboard('{Control>}{Alt>}ą{/Alt}{/Control}');
        expect(getByText('ąa')).to.have.class(optionClasses.highlighted);

        await userEvent.keyboard('{Alt>}{Control>}ą{/Control}{/Alt}');
        expect(getByText('ąb')).to.have.class(optionClasses.highlighted);

        await userEvent.keyboard('{Control>}{AltGraph>}ą{/AltGraph}{/Control}');
        expect(getByText('ąc')).to.have.class(optionClasses.highlighted);
      });
    });

    it('closes the listbox without selecting an option when "Escape" is pressed', async () => {
      const { getByRole, queryByRole } = await render(
        <Select defaultValue={1}>
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
        </Select>,
      );

      const select = getByRole('combobox');

      act(() => {
        select.click();
      });

      await userEvent.keyboard('{ArrowDown}'); // highlights '2'
      await userEvent.keyboard('{Escape}');

      expect(select).to.have.attribute('aria-expanded', 'false');
      expect(select).to.have.text('1');
      expect(queryByRole('listbox', { hidden: true })).toBeHidden();
    });

    it('closes the listbox after selecting with keyboard', async () => {
      const { getByRole, queryByRole } = await render(
        <Select defaultValue={1}>
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
        </Select>,
      );

      const select = getByRole('combobox');

      await userEvent.pointer({ target: select, keys: '[MouseLeft]' });
      await userEvent.keyboard('{ArrowDown}'); // highlights '2'
      await userEvent.keyboard('{Enter}');

      expect(select).to.have.attribute('aria-expanded', 'false');
      expect(select).to.have.text('2');
      expect(queryByRole('listbox', { hidden: true })).toBeHidden();
    });

    it('scrolls to highlighted option so it is visible', async function test() {
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

      const { getByRole } = await render(
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

      await userEvent.keyboard('{ArrowDown}'); // opens the listbox and highlights 1

      const listbox = getByRole('listbox');

      await userEvent.keyboard('{ArrowDown}'); // highlights 2
      expect(listbox.scrollTop).to.equal(0);

      await userEvent.keyboard('{ArrowDown}'); // highlights 3
      expect(listbox.scrollTop).to.equal(50);

      await userEvent.keyboard('{ArrowDown}'); // highlights 4
      expect(listbox.scrollTop).to.equal(100);

      await userEvent.keyboard('{ArrowUp}'); // highlights 3
      expect(listbox.scrollTop).to.equal(100);

      await userEvent.keyboard('{ArrowUp}'); // highlights 2
      expect(listbox.scrollTop).to.equal(50);
    });
  });

  describe('form submission', () => {
    describe('using single-select mode', () => {
      it('includes the Select value in the submitted form data when the `name` attribute is provided', async function test() {
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

        const { getByText } = await render(
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

      it('transforms the selected value before posting using the getSerializedValue prop, if provided', async function test() {
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

        const { getByText } = await render(
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

      it('formats the object values as JSON before posting', async function test() {
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

        const { getByText } = await render(
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
      it('includes the Select value in the submitted form data when the `name` attribute is provided', async function test() {
        if (/jsdom/.test(window.navigator.userAgent)) {
          // FormData is not available in JSDOM
          this.skip();
        }

        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          expect(formData.get('test-select')).to.equal('[2,3]');
        };

        const { getByText } = await render(
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

      it('transforms the selected value before posting using the getSerializedValue prop, if provided', async function test() {
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

        const { getByText } = await render(
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

      it('formats the object values as JSON before posting', async function test() {
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

        const { getByText } = await render(
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
    it('is called when the Select value changes', async () => {
      const handleChange = spy();

      const { getByRole, getByText } = await render(
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

      await flushMicrotasks();

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][0]).to.haveOwnProperty('type', 'click');
      expect(handleChange.args[0][0]).to.haveOwnProperty('target', optionTwo);
      expect(handleChange.args[0][1]).to.equal(2);
    });

    it('is not called if `value` is modified externally', async () => {
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
      const { getByText } = await render(<TestComponent onChange={onChange} />);

      const button = getByText('Update value');
      act(() => button.click());
      expect(onChange.notCalled).to.equal(true);
    });

    it('is not called after initial render when when controlled value is set to null', async () => {
      function TestComponent({ onChange }: { onChange: (value: string | null) => void }) {
        const [value, setValue] = React.useState<string | null>(null);
        const handleChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
          setValue(newValue);
          onChange(newValue);
        };

        return (
          <Select value={value} onChange={handleChange}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        );
      }

      const onChange = spy();
      await render(<TestComponent onChange={onChange} />);

      expect(onChange.notCalled).to.equal(true);
    });

    it('is not called after initial render when when the default uncontrolled value is set to null', async () => {
      function TestComponent({ onChange }: { onChange: (value: string | null) => void }) {
        const handleChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
          onChange(newValue);
        };

        return (
          <Select defaultValue={null as string | null} onChange={handleChange}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        );
      }

      const onChange = spy();
      await render(<TestComponent onChange={onChange} />);

      expect(onChange.notCalled).to.equal(true);
    });

    it('is not called after initial render when the controlled value is set to a valid option', async () => {
      function TestComponent({ onChange }: { onChange: (value: string | null) => void }) {
        const [value, setValue] = React.useState<string | null>('1');
        const handleChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
          setValue(newValue);
          onChange(newValue);
        };

        return (
          <Select value={value} onChange={handleChange}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        );
      }

      const onChange = spy();
      await render(<TestComponent onChange={onChange} />);

      expect(onChange.notCalled).to.equal(true);
    });

    it('is not called after initial render when when the default uncontrolled value is set to a valid option', async () => {
      function TestComponent({ onChange }: { onChange: (value: string | null) => void }) {
        const handleChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
          onChange(newValue);
        };

        return (
          <Select defaultValue="1" onChange={handleChange}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        );
      }

      const onChange = spy();
      await render(<TestComponent onChange={onChange} />);

      expect(onChange.notCalled).to.equal(true);
    });

    it('is called after initial render with `null` when the controlled value is set to a nonexistent option', async () => {
      function TestComponent({ onChange }: { onChange: (value: string | null) => void }) {
        const [value, setValue] = React.useState<string | null>('42');
        const handleChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
          setValue(newValue);
          onChange(newValue);
        };

        return (
          <Select value={value} onChange={handleChange}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        );
      }

      const onChange = spy();
      await render(<TestComponent onChange={onChange} />);

      expect(onChange.called).to.equal(true);
      expect(onChange.args[0][0]).to.equal(null);
    });

    it('is called after initial render when when the default uncontrolled value is set to a nonexistent option', async () => {
      function TestComponent({ onChange }: { onChange: (value: string | null) => void }) {
        const handleChange = (event: React.SyntheticEvent | null, newValue: string | null) => {
          onChange(newValue);
        };

        return (
          <Select defaultValue="42" onChange={handleChange}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
          </Select>
        );
      }

      const onChange = spy();
      await render(<TestComponent onChange={onChange} />);

      expect(onChange.called).to.equal(true);
      expect(onChange.args[0][0]).to.equal(null);
    });
  });

  describe('prop: placeholder', () => {
    it('renders when no value is selected ', async () => {
      const { getByRole } = await render(
        <Select placeholder="Placeholder text">
          <Option value={1}>One</Option>
          <Option value={2}>Two</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.text('Placeholder text');
    });
  });

  describe('prop: renderValue', () => {
    it('renders the selected value using the renderValue prop', async () => {
      const { getByRole } = await render(
        <Select defaultValue={1} renderValue={(value) => `${value?.label} (${value?.value})`}>
          <Option value={1}>One</Option>
          <Option value={2}>Two</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.text('One (1)');
    });

    it('renders the selected value as a label if renderValue is not provided', async () => {
      const { getByRole } = await render(
        <Select defaultValue={1}>
          <Option value={1}>One</Option>
          <Option value={2}>Two</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.text('One');
    });

    it('renders a zero-width space when there is no selected value nor placeholder and renderValue is not provided', async () => {
      const { getByRole } = await render(
        <Select>
          <Option value={1}>One</Option>
          <Option value={2}>Two</Option>
        </Select>,
      );

      const select = getByRole('combobox');
      const zws = select.querySelector('.notranslate');

      expect(zws).not.to.equal(null);
    });

    it('renders the selected values (multiple) using the renderValue prop', async () => {
      const { getByRole } = await render(
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

    it('renders the selected values (multiple) as comma-separated list of labels if renderValue is not provided', async () => {
      const { getByRole } = await render(
        <Select multiple defaultValue={[1, 2]}>
          <Option value={1}>One</Option>
          <Option value={2}>Two</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.text('One, Two');
    });
  });

  describe('prop: areOptionsEqual', () => {
    it('should use the `areOptionsEqual` prop to determine if an option is selected', async () => {
      interface TestValue {
        id: string;
      }

      const areOptionsEqual = (a: TestValue, b: TestValue) => a.id === b.id;
      const { getByRole } = await render(
        <Select defaultValue={{ id: '1' }} areOptionsEqual={areOptionsEqual}>
          <Option value={{ id: '1' }}>One</Option>
          <Option value={{ id: '2' }}>Two</Option>
        </Select>,
      );

      expect(getByRole('combobox')).to.have.text('One');
    });
  });

  // according to WAI-ARIA 1.2 (https://www.w3.org/TR/wai-aria-1.2/#combobox)
  describe('a11y attributes', () => {
    it('should have the `combobox` role', async () => {
      await render(
        <Select>
          <Option value={1}>One</Option>
        </Select>,
      );

      expect(screen.queryByRole('combobox')).not.to.equal(null);
    });

    it('should have the aria-expanded attribute', async () => {
      await render(
        <Select>
          <Option value={1}>One</Option>
        </Select>,
      );

      expect(screen.getByRole('combobox')).to.have.attribute('aria-expanded', 'false');
    });

    it('should have the aria-expanded attribute set to true when the listbox is open', async () => {
      await render(
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

    it('should have the aria-controls attribute', async () => {
      await render(
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

    it('should have the correct tabindex attribute', async () => {
      await render(
        <Select>
          <Option value={1}>One</Option>
        </Select>,
      );

      const select = screen.getByRole('combobox');
      act(() => {
        select.click();
      });

      const options = screen.getAllByRole('option');

      expect(select).not.to.have.attribute('tabindex');
      expect(options[0]).to.have.attribute('tabindex', '0');
    });
  });

  describe('open/close behavior', () => {
    it('opens the listbox when the select is clicked', async () => {
      const { getByRole } = await render(
        <Select>
          <Option value={1}>One</Option>
        </Select>,
      );

      const select = getByRole('combobox');
      act(() => {
        select.click();
      });

      await flushMicrotasks();

      expect(select).to.have.attribute('aria-expanded', 'true');
    });

    it('closes the listbox when the select is clicked again', async () => {
      const { getByRole } = await render(
        <Select>
          <Option value={1}>One</Option>
        </Select>,
      );

      const select = getByRole('combobox');

      await userEvent.pointer({ keys: '[MouseLeft]', target: select });

      expect(select).to.have.attribute('aria-expanded', 'true');

      await userEvent.pointer({ keys: '[MouseLeft]', target: select });

      expect(select).to.have.attribute('aria-expanded', 'false');
    });

    it('closes the listbox without selecting an option when focus is lost', async () => {
      const { getByRole, getByTestId } = await render(
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
      await userEvent.keyboard('{ArrowDown}'); // highlights '2'

      const focusTarget = getByTestId('focus-target');
      act(() => {
        focusTarget.focus();
      });

      expect(select).to.have.attribute('aria-expanded', 'false');
      expect(select).to.have.text('1');
      expect(listbox).toBeHidden();
    });

    it('closes the listbox when already selected option is selected again with a click', async () => {
      const { getByRole, getByTestId } = await render(
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

      act(() => {
        selectedOption.click();
      });

      await flushMicrotasks();

      expect(select).to.have.attribute('aria-expanded', 'false');
      expect(select).to.have.text('1');
    });

    it('does not steal focus from other elements on page when it is open on mount', async () => {
      const { getAllByRole } = await render(
        <div>
          <input autoFocus />
          <Select defaultListboxOpen>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
          </Select>
        </div>,
      );

      const input = getAllByRole('textbox')[0];
      expect(document.activeElement).to.equal(input);
    });

    it('scrolls to initially highlighted option after opening', async function test() {
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

      const { getByRole } = await render(
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

  describe('prop: autoFocus', () => {
    it('should focus the select after mounting', async () => {
      const { getByRole } = await render(
        <div>
          <input />
          <Select autoFocus>
            <Option value={1}>1</Option>
            <Option value={2}>2</Option>
          </Select>
        </div>,
      );

      const select = getByRole('combobox');
      expect(document.activeElement).to.equal(select);
    });
  });

  it('sets a value correctly when interacted by a user and external code', async () => {
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

    const { getByTestId, getByText } = await render(<TestComponent />);
    const updateButton = getByTestId('update-externally');
    const selectButton = getByTestId('select');

    act(() => updateButton.click());
    act(() => selectButton.click());

    const option2 = getByText('2');
    act(() => option2.click());

    expect(selectButton).to.have.text('1, 2');
  });

  it('perf: does not rerender options unnecessarily', async function test() {
    if (/jsdom/.test(window.navigator.userAgent)) {
      // JSDOM doesn't support :focus-visible
      this.skip();
    }

    const renderOption1Spy = spy();
    const renderOption2Spy = spy();
    const renderOption3Spy = spy();
    const renderOption4Spy = spy();

    const LoggingRoot = React.forwardRef(function LoggingRoot(
      props: OptionRootSlotProps<number> & { renderSpy: () => void },
      ref: React.ForwardedRef<HTMLLIElement>,
    ) {
      const { renderSpy, ownerState, ...other } = props;
      renderSpy();

      return <li {...other} ref={ref} />;
    });

    const { getByRole } = await render(
      <Select>
        <Option
          slots={{ root: LoggingRoot }}
          slotProps={{ root: { renderSpy: renderOption1Spy } as any }}
          value={1}
        >
          1
        </Option>
        <Option
          slots={{ root: LoggingRoot }}
          slotProps={{ root: { renderSpy: renderOption2Spy } as any }}
          value={2}
        >
          2
        </Option>
        <Option
          slots={{ root: LoggingRoot }}
          slotProps={{ root: { renderSpy: renderOption3Spy } as any }}
          value={3}
        >
          3
        </Option>
        <Option
          slots={{ root: LoggingRoot }}
          slotProps={{ root: { renderSpy: renderOption4Spy } as any }}
          value={4}
        >
          4
        </Option>
      </Select>,
    );

    renderOption1Spy.resetHistory();
    renderOption2Spy.resetHistory();
    renderOption3Spy.resetHistory();
    renderOption4Spy.resetHistory();

    const select = getByRole('combobox');
    act(() => {
      select.click(); // opens the listbox
    });

    // React renders twice in strict mode, so we expect twice the number of spy calls
    expect(renderOption1Spy.callCount).to.equal(2); // '1' as focusVisible becomes true

    await userEvent.keyboard('{ArrowDown}'); // highlights '2'
    expect(renderOption1Spy.callCount).to.equal(6); // '1' rerenders as it loses highlight
    expect(renderOption2Spy.callCount).to.equal(4); // '2' rerenders as it receives highlight

    await userEvent.keyboard('{Enter}'); // selects '2'
    expect(renderOption1Spy.callCount).to.equal(6);
    expect(renderOption2Spy.callCount).to.equal(8);

    // neither the highlighted nor the selected state of these options changed,
    // so they don't need to rerender:
    expect(renderOption3Spy.callCount).to.equal(0);
    expect(renderOption4Spy.callCount).to.equal(0);
  });

  describe('browser autofill', () => {
    it('sets value and calls external onChange when browser autofills', async () => {
      const onChangeHandler = spy();
      const { container } = await render(
        <Select onChange={onChangeHandler} defaultValue="germany" autoComplete="country">
          <Option value="france">France</Option>
          <Option value="germany">Germany</Option>
          <Option value="china">China</Option>
        </Select>,
      );

      const hiddenInput = container.querySelector('[autocomplete="country"]');

      expect(hiddenInput).not.to.eq(null);
      expect(hiddenInput).to.have.value('germany');

      fireEvent.change(hiddenInput!, {
        target: {
          value: 'france',
        },
      });

      expect(onChangeHandler.calledOnce).to.equal(true);
      expect(onChangeHandler.firstCall.args[1]).to.equal('france');
      expect(hiddenInput).to.have.value('france');
    });

    it('does not set value when browser autofills invalid value', async () => {
      const onChangeHandler = spy();
      const { container } = await render(
        <Select onChange={onChangeHandler} defaultValue="germany" autoComplete="country">
          <Option value="france">France</Option>
          <Option value="germany">Germany</Option>
          <Option value="china">China</Option>
        </Select>,
      );

      const hiddenInput = container.querySelector('[autocomplete="country"]');

      expect(hiddenInput).not.to.eq(null);
      expect(hiddenInput).to.have.value('germany');

      fireEvent.change(hiddenInput!, {
        target: {
          value: 'portugal',
        },
      });

      expect(onChangeHandler.called).to.equal(false);
      expect(hiddenInput).to.have.value('germany');
    });

    it('clears value and calls external onChange when browser clears autofill', async () => {
      const onChangeHandler = spy();
      const { container } = await render(
        <Select onChange={onChangeHandler} defaultValue="germany" autoComplete="country">
          <Option value="france">France</Option>
          <Option value="germany">Germany</Option>
          <Option value="china">China</Option>
        </Select>,
      );

      const hiddenInput = container.querySelector('[autocomplete="country"]');

      expect(hiddenInput).not.to.eq(null);
      expect(hiddenInput).to.have.value('germany');

      fireEvent.change(hiddenInput!, {
        target: {
          value: '',
        },
      });

      expect(onChangeHandler.calledOnce).to.equal(true);
      expect(onChangeHandler.firstCall.args[1]).to.equal(null);
      expect(hiddenInput).to.have.value('');
    });
  });

  describe('warnings', () => {
    it('should warn when switching from controlled to uncontrolled', async () => {
      const { setProps } = await render(
        <Select value={1}>
          <Option value={1}>One</Option>
          <Option value={2}>Two</Option>
        </Select>,
      );

      expect(() => {
        setProps({ value: undefined });
      }).toErrorDev(
        'useControllableReducer: The Select component is changing a controlled prop to be uncontrolled: selectedValues',
      );
    });

    it('should warn when switching between uncontrolled to controlled', async () => {
      const { setProps } = await render(
        <Select>
          <Option value={1}>One</Option>
          <Option value={2}>Two</Option>
        </Select>,
      );

      expect(() => {
        setProps({ value: 1 });
      }).toErrorDev(
        'useControllableReducer: The Select component is changing an uncontrolled prop to be controlled: selectedValues',
      );
    });
  });
});
