import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import MultiSelectUnstyled from '@mui/base/MultiSelectUnstyled';
import { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import { SelectOption } from '@mui/base/useSelect';
import OptionUnstyled from '@mui/base/OptionUnstyled';
import OptionGroupUnstyled from '@mui/base/OptionGroupUnstyled';
import {
  createMount,
  createRenderer,
  describeConformanceUnstyled,
  userEvent,
  act,
  fireEvent,
} from 'test/utils';

describe('MultiSelectUnstyled', () => {
  const mount = createMount();
  const { render } = createRenderer();

  const componentToTest = (
    <MultiSelectUnstyled defaultListboxOpen>
      <OptionGroupUnstyled label="Group">
        <OptionUnstyled value={1}>1</OptionUnstyled>
      </OptionGroupUnstyled>
    </MultiSelectUnstyled>
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
        expectedClassName: selectUnstyledClasses.root,
      },
      listbox: {
        expectedClassName: selectUnstyledClasses.listbox,
        testWithElement: 'ul',
      },
      popper: {
        expectedClassName: selectUnstyledClasses.popper,
        testWithElement: null,
      },
    },
  }));

  describe('keyboard navigation', () => {
    ['Enter', 'ArrowDown', 'ArrowUp'].forEach((key) => {
      it(`opens the dropdown when the "${key}" key is down on the button`, () => {
        // can't use the default native `button` as it doesn't treat enter or space press as a click
        const { getByRole } = render(<MultiSelectUnstyled components={{ Root: 'div' }} />);
        const button = getByRole('button');
        act(() => {
          button.focus();
        });
        fireEvent.keyDown(button, { key });

        expect(button).to.have.attribute('aria-expanded', 'true');
        expect(getByRole('listbox')).not.to.equal(null);
        expect(document.activeElement).to.equal(getByRole('listbox'));
      });
    });

    it(`opens the dropdown when the " " key is let go on the button`, () => {
      // can't use the default native `button` as it doesn't treat enter or space press as a click
      const { getByRole } = render(<MultiSelectUnstyled components={{ Root: 'div' }} />);
      const button = getByRole('button');
      act(() => {
        button.focus();
      });
      fireEvent.keyUp(button, { key: ' ' });

      expect(button).to.have.attribute('aria-expanded', 'true');
      expect(getByRole('listbox')).not.to.equal(null);
      expect(document.activeElement).to.equal(getByRole('listbox'));
    });

    describe('item selection', () => {
      ['Enter', ' '].forEach((key) =>
        it(`selects a highlighted item using the "${key}" key`, () => {
          const { getByRole } = render(
            <MultiSelectUnstyled>
              <OptionUnstyled value={1}>1</OptionUnstyled>
              <OptionUnstyled value={2}>2</OptionUnstyled>
            </MultiSelectUnstyled>,
          );

          const button = getByRole('button');
          act(() => {
            button.click();
          });

          const listbox = getByRole('listbox');

          userEvent.keyPress(listbox, { key: 'ArrowDown' }); // highlights '1'
          userEvent.keyPress(listbox, { key: 'ArrowDown' }); // highlights '2'
          userEvent.keyPress(listbox, { key });

          expect(button).to.have.text('2');
        }),
      );
    });

    it('closes the listbox without selecting an option when "Escape" is pressed', () => {
      const { getByRole, queryByRole } = render(
        <MultiSelectUnstyled defaultValue={[1]}>
          <OptionUnstyled value={1}>1</OptionUnstyled>
          <OptionUnstyled value={2}>2</OptionUnstyled>
        </MultiSelectUnstyled>,
      );

      const button = getByRole('button');

      act(() => {
        button.click();
      });

      const listbox = getByRole('listbox');
      userEvent.keyPress(listbox, { key: 'ArrowDown' }); // highlights '2'
      userEvent.keyPress(listbox, { key: 'Escape' });

      expect(button).to.have.attribute('aria-expanded', 'false');
      expect(button).to.have.text('1');
      expect(queryByRole('listbox')).to.equal(null);
    });
  });

  describe('form submission', () => {
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
          <MultiSelectUnstyled defaultValue={[2, 3]} name="test-select">
            <OptionUnstyled value={1}>1</OptionUnstyled>
            <OptionUnstyled value={2}>2</OptionUnstyled>
            <OptionUnstyled value={3}>3</OptionUnstyled>
          </MultiSelectUnstyled>
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
          <MultiSelectUnstyled
            defaultValue={[2, 3]}
            name="test-select"
            getSerializedValue={customFormValueProvider}
          >
            <OptionUnstyled value={1}>1</OptionUnstyled>
            <OptionUnstyled value={2}>2</OptionUnstyled>
            <OptionUnstyled value={3}>3</OptionUnstyled>
          </MultiSelectUnstyled>
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
          <MultiSelectUnstyled defaultValue={[options[1].value]} name="test-select">
            {options.map((o) => (
              <OptionUnstyled key={o.value.firstName} value={o.value}>
                {o.label}
              </OptionUnstyled>
            ))}
          </MultiSelectUnstyled>
          <button type="submit">Submit</button>
        </form>,
      );

      const button = getByText('Submit');
      act(() => {
        button.click();
      });
    });
  });

  describe('prop: onChange', () => {
    it('is called when the Select value changes', () => {
      const handleChange = spy();

      const { getByRole, getByText } = render(
        <MultiSelectUnstyled defaultValue={[1]} onChange={handleChange}>
          <OptionUnstyled value={1}>One</OptionUnstyled>
          <OptionUnstyled value={2}>Two</OptionUnstyled>
        </MultiSelectUnstyled>,
      );

      const button = getByRole('button');
      act(() => {
        button.click();
      });

      const optionTwo = getByText('Two');
      act(() => {
        optionTwo.click();
      });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][0]).to.haveOwnProperty('type', 'click');
      expect(handleChange.args[0][0]).to.haveOwnProperty('target', optionTwo);
      expect(handleChange.args[0][1]).to.deep.equal([1, 2]);
    });
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
          <MultiSelectUnstyled value={value} onChange={handleChange}>
            <OptionUnstyled value={1}>1</OptionUnstyled>
            <OptionUnstyled value={2}>2</OptionUnstyled>
          </MultiSelectUnstyled>
        </div>
      );
    }

    const onChange = spy();
    const { getByText } = render(<TestComponent onChange={onChange} />);

    const button = getByText('Update value');
    act(() => button.click());
    expect(onChange.notCalled).to.equal(true);
  });

  it('sets a value correctly when interacted by a user and external code', () => {
    function TestComponent() {
      const [value, setValue] = React.useState<number[]>([]);

      return (
        <div>
          <button data-testid="update-externally" onClick={() => setValue([1])}>
            Update value
          </button>
          <MultiSelectUnstyled
            value={value}
            onChange={(_, v) => setValue(v)}
            componentsProps={{
              root: {
                'data-testid': 'select',
              } as any,
            }}
          >
            <OptionUnstyled value={1}>1</OptionUnstyled>
            <OptionUnstyled value={2}>2</OptionUnstyled>
          </MultiSelectUnstyled>
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

  it('closes the listbox without selecting an option when focus is lost', () => {
    const { getByRole, getByTestId } = render(
      <div>
        <MultiSelectUnstyled defaultValue={[1]}>
          <OptionUnstyled value={1}>1</OptionUnstyled>
          <OptionUnstyled value={2}>2</OptionUnstyled>
        </MultiSelectUnstyled>
        <p data-testid="focus-target" tabIndex={0}>
          focus target
        </p>
      </div>,
    );

    const button = getByRole('button');

    act(() => {
      button.click();
    });

    const listbox = getByRole('listbox');
    userEvent.keyPress(listbox, { key: 'ArrowDown' }); // highlights '2'

    const focusTarget = getByTestId('focus-target');
    act(() => {
      focusTarget.focus();
    });

    expect(button).to.have.attribute('aria-expanded', 'false');
    expect(button).to.have.text('1');
  });

  it('focuses the listbox after it is opened', () => {
    const { getByRole } = render(
      <MultiSelectUnstyled>
        <OptionUnstyled value={1}>1</OptionUnstyled>
      </MultiSelectUnstyled>,
    );

    const button = getByRole('button');
    act(() => {
      button.click();
    });

    expect(document.activeElement).to.equal(getByRole('listbox'));
  });
});
