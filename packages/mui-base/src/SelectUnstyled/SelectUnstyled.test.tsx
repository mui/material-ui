import * as React from 'react';
import { expect } from 'chai';
import SelectUnstyled, { SelectOption, selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled, { OptionUnstyledProps } from '@mui/base/OptionUnstyled';
import OptionGroupUnstyled from '@mui/base/OptionGroupUnstyled';
import {
  createMount,
  createRenderer,
  describeConformanceUnstyled,
  fireEvent,
  userEvent,
  act,
} from 'test/utils';

describe('SelectUnstyled', () => {
  const mount = createMount();
  const { render } = createRenderer();

  const componentToTest = (
    <SelectUnstyled defaultListboxOpen>
      <OptionGroupUnstyled label="Group">
        <OptionUnstyled value={1}>1</OptionUnstyled>
      </OptionGroupUnstyled>
    </SelectUnstyled>
  );

  describeConformanceUnstyled(componentToTest, () => ({
    inheritComponent: 'button',
    render,
    mount,
    refInstanceof: window.HTMLButtonElement,
    testComponentPropWith: 'span',
    muiName: 'MuiSelectUnstyled',
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
        const { getByRole } = render(<SelectUnstyled components={{ Root: 'div' }} />);
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
      const { getByRole } = render(<SelectUnstyled components={{ Root: 'div' }} />);
      const button = getByRole('button');
      act(() => {
        button.focus();
      });
      fireEvent.keyUp(button, { key: ' ' });

      expect(button).to.have.attribute('aria-expanded', 'true');
      expect(getByRole('listbox')).not.to.equal(null);
      expect(document.activeElement).to.equal(getByRole('listbox'));
    });

    ['Enter', ' ', 'Escape'].forEach((key) => {
      it(`closes the dropdown when the "${key}" key is pressed`, () => {
        const { getByRole, queryByRole } = render(
          <SelectUnstyled>
            <OptionUnstyled value={1}>1</OptionUnstyled>
          </SelectUnstyled>,
        );
        const button = getByRole('button');
        act(() => {
          button.click();
        });

        const listbox = getByRole('listbox');
        userEvent.keyPress(listbox, { key });

        expect(button).to.have.attribute('aria-expanded', 'false');
        expect(queryByRole('listbox')).to.equal(null);
      });
    });

    describe('item selection', () => {
      ['Enter', ' '].forEach((key) =>
        it(`selects a highlighted item using the "${key}" key`, () => {
          const { getByRole } = render(
            <SelectUnstyled>
              <OptionUnstyled value={1}>1</OptionUnstyled>
              <OptionUnstyled value={2}>2</OptionUnstyled>
            </SelectUnstyled>,
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

    describe('text navigation', () => {
      it('navigate to matched key', () => {
        const { getByRole, getByText } = render(
          <SelectUnstyled>
            <OptionUnstyled value={1}>Apple</OptionUnstyled>
            <OptionUnstyled value={2}>Banana</OptionUnstyled>
            <OptionUnstyled value={3}>Cherry</OptionUnstyled>
            <OptionUnstyled value={4}>Calamondin</OptionUnstyled>
            <OptionUnstyled value={5}>Dragon Fruit</OptionUnstyled>
            <OptionUnstyled value={6}>Grapes</OptionUnstyled>
          </SelectUnstyled>,
        );

        const button = getByRole('button');
        act(() => {
          button.click();
        });

        const listbox = getByRole('listbox');

        userEvent.keyPress(listbox, { key: 'd' });
        expect(getByText('Dragon Fruit')).to.have.class('MuiOptionUnstyled-highlighted');
        userEvent.keyPress(listbox, { key: 'r' });
        expect(getByText('Dragon Fruit')).to.have.class('MuiOptionUnstyled-highlighted');
        userEvent.keyPress(listbox, { key: 'z' });
        expect(getByText('Dragon Fruit')).to.have.class('MuiOptionUnstyled-highlighted');
      });

      it('navigate to next element with same starting character on repeated keys', () => {
        const { getByRole, getByText } = render(
          <SelectUnstyled>
            <OptionUnstyled value={1}>Apple</OptionUnstyled>
            <OptionUnstyled value={2}>Banana</OptionUnstyled>
            <OptionUnstyled value={3}>Cherry</OptionUnstyled>
            <OptionUnstyled value={4}>Calamondin</OptionUnstyled>
            <OptionUnstyled value={5}>Dragon Fruit</OptionUnstyled>
            <OptionUnstyled value={6}>Grapes</OptionUnstyled>
          </SelectUnstyled>,
        );

        const button = getByRole('button');
        act(() => {
          button.click();
        });

        const listbox = getByRole('listbox');

        userEvent.keyPress(listbox, { key: 'c' });
        expect(getByText('Cherry')).to.have.class('MuiOptionUnstyled-highlighted');
        userEvent.keyPress(listbox, { key: 'c' });
        expect(getByText('Calamondin')).to.have.class('MuiOptionUnstyled-highlighted');
        userEvent.keyPress(listbox, { key: 'c' });
        expect(getByText('Cherry')).to.have.class('MuiOptionUnstyled-highlighted');
      });

      it('navigate using the label prop', () => {
        const RichOption = (props: OptionUnstyledProps<number>) => (
          <OptionUnstyled {...props}>
            <div>
              Option Title
              <div>
                Nested information
                <p>{props.label || props.value}</p>
              </div>
            </div>
          </OptionUnstyled>
        );

        const { getByRole, getByTestId } = render(
          <SelectUnstyled>
            <RichOption data-testid="1" value={1} label="Apple" />
            <RichOption data-testid="2" value={2} label="Banana" />
            <RichOption data-testid="3" value={3} label="Cherry" />
            <RichOption data-testid="4" value={4} label="Calamondin" />
            <RichOption data-testid="5" value={5} label="Dragon Fruit" />
            <RichOption data-testid="6" value={6} label="Grapes" />
          </SelectUnstyled>,
        );

        const button = getByRole('button');
        act(() => {
          button.click();
        });

        const listbox = getByRole('listbox');

        userEvent.keyPress(listbox, { key: 'd' });
        expect(getByTestId('5')).to.have.class('MuiOptionUnstyled-highlighted');
        userEvent.keyPress(listbox, { key: 'r' });
        expect(getByTestId('5')).to.have.class('MuiOptionUnstyled-highlighted');
        userEvent.keyPress(listbox, { key: 'z' });
        expect(getByTestId('5')).to.have.class('MuiOptionUnstyled-highlighted');
      });

      it('skips the non-stringifiable options', () => {
        const { getByRole, getByText } = render(
          <SelectUnstyled>
            <OptionUnstyled value={{ key: 'Apple' }}>Apple</OptionUnstyled>
            <OptionUnstyled value={{ key: 'Banana' }}>Banana</OptionUnstyled>
            <OptionUnstyled value={{ key: 'Cherry' }}>Cherry</OptionUnstyled>
            <OptionUnstyled value={<div />} />
            <OptionUnstyled value={{ key: 'Cherry' }}>
              <div>Nested Content</div>
            </OptionUnstyled>{' '}
            <OptionUnstyled value={{}}>{null}</OptionUnstyled>
            <OptionUnstyled value={{ key: 'Calamondin' }}>Calamondin</OptionUnstyled>
          </SelectUnstyled>,
        );

        const button = getByRole('button');
        act(() => {
          button.click();
        });

        const listbox = getByRole('listbox');

        userEvent.keyPress(listbox, { key: 'c' });
        expect(getByText('Cherry')).to.have.class('MuiOptionUnstyled-highlighted');
        userEvent.keyPress(listbox, { key: 'c' });
        expect(getByText('Calamondin')).to.have.class('MuiOptionUnstyled-highlighted');
        userEvent.keyPress(listbox, { key: 'c' });
        expect(getByText('Cherry')).to.have.class('MuiOptionUnstyled-highlighted');
      });

      it('navigate to options with diacritic characters', () => {
        const { getByRole, getByText } = render(
          <SelectUnstyled>
            <OptionUnstyled value={{ key: 'Aa' }}>Aa</OptionUnstyled>
            <OptionUnstyled value={{ key: 'Ba' }}>Ba</OptionUnstyled>
            <OptionUnstyled value={{ key: 'Bb' }}>Bb</OptionUnstyled>
            <OptionUnstyled value={{ key: 'Bc' }}>Bc</OptionUnstyled>
            <OptionUnstyled value={{ key: 'Bą' }}>Bą</OptionUnstyled>
          </SelectUnstyled>,
        );

        const button = getByRole('button');
        act(() => {
          button.click();
        });

        const listbox = getByRole('listbox');

        userEvent.keyPress(listbox, { key: 'b' });
        expect(getByText('Ba')).to.have.class('MuiOptionUnstyled-highlighted');

        userEvent.keyPress(listbox, { key: 'Control' });
        userEvent.keyPress(listbox, { key: 'Alt' });
        userEvent.keyPress(listbox, { key: 'ą' });
        expect(getByText('Bą')).to.have.class('MuiOptionUnstyled-highlighted');
      });

      it('navigate to next options with beginning diacritic characters', () => {
        const { getByRole, getByText } = render(
          <SelectUnstyled>
            <OptionUnstyled value={{ key: 'Aa' }}>Aa</OptionUnstyled>
            <OptionUnstyled value={{ key: 'ąa' }}>ąa</OptionUnstyled>
            <OptionUnstyled value={{ key: 'ąb' }}>ąb</OptionUnstyled>
            <OptionUnstyled value={{ key: 'ąc' }}>ąc</OptionUnstyled>
          </SelectUnstyled>,
        );

        const button = getByRole('button');
        act(() => {
          button.click();
        });

        const listbox = getByRole('listbox');

        userEvent.keyPress(listbox, { key: 'Control' });
        userEvent.keyPress(listbox, { key: 'Alt' });
        userEvent.keyPress(listbox, { key: 'ą' });
        expect(getByText('ąa')).to.have.class('MuiOptionUnstyled-highlighted');

        userEvent.keyPress(listbox, { key: 'Alt' });
        userEvent.keyPress(listbox, { key: 'Control' });
        userEvent.keyPress(listbox, { key: 'ą' });
        expect(getByText('ąb')).to.have.class('MuiOptionUnstyled-highlighted');

        userEvent.keyPress(listbox, { key: 'Control' });
        userEvent.keyPress(listbox, { key: 'AltGraph' });
        userEvent.keyPress(listbox, { key: 'ą' });
        expect(getByText('ąc')).to.have.class('MuiOptionUnstyled-highlighted');
      });
    });

    it('closes the listbox without selecting an option when "Escape" is pressed', () => {
      const { getByRole } = render(
        <SelectUnstyled defaultValue={1}>
          <OptionUnstyled value={1}>1</OptionUnstyled>
          <OptionUnstyled value={2}>2</OptionUnstyled>
        </SelectUnstyled>,
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
    });
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
          <SelectUnstyled defaultValue={2} name="test-select">
            <OptionUnstyled value={1}>1</OptionUnstyled>
            <OptionUnstyled value={2}>2</OptionUnstyled>
          </SelectUnstyled>
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
          <SelectUnstyled
            defaultValue={2}
            name="test-select"
            getSerializedValue={customFormValueProvider}
          >
            <OptionUnstyled value={1}>1</OptionUnstyled>
            <OptionUnstyled value={2}>2</OptionUnstyled>
          </SelectUnstyled>
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
          <SelectUnstyled defaultValue={options[1].value} name="test-select">
            {options.map((o) => (
              <OptionUnstyled key={o.value.firstName} value={o.value}>
                {o.label}
              </OptionUnstyled>
            ))}
          </SelectUnstyled>
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

  it('closes the listbox without selecting an option when focus is lost', () => {
    const { getByRole, getByTestId } = render(
      <div>
        <SelectUnstyled defaultValue={1}>
          <OptionUnstyled value={1}>1</OptionUnstyled>
          <OptionUnstyled value={2}>2</OptionUnstyled>
        </SelectUnstyled>
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

  it('closes the listbox when already selected option is selected again with a click', () => {
    const { getByRole, getByTestId } = render(
      <SelectUnstyled defaultValue={1}>
        <OptionUnstyled data-testid="selected-option" value={1}>
          1
        </OptionUnstyled>
        <OptionUnstyled value={2}>2</OptionUnstyled>
      </SelectUnstyled>,
    );

    const button = getByRole('button');

    act(() => {
      button.click();
    });

    const selectedOption = getByTestId('selected-option');
    fireEvent.click(selectedOption);

    expect(button).to.have.attribute('aria-expanded', 'false');
    expect(button).to.have.text('1');
  });

  it('focuses the listbox after it is opened', () => {
    const { getByRole } = render(
      <SelectUnstyled>
        <OptionUnstyled value={1}>1</OptionUnstyled>
      </SelectUnstyled>,
    );

    const button = getByRole('button');
    act(() => {
      button.click();
    });

    expect(document.activeElement).to.equal(getByRole('listbox'));
  });
});
