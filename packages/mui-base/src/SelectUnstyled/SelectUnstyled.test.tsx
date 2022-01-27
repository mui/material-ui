import * as React from 'react';
import { expect } from 'chai';
import SelectUnstyled, { selectUnstyledClasses } from '@mui/base/SelectUnstyled';
import OptionUnstyled from '@mui/base/OptionUnstyled';
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
    ['Enter', ' ', 'ArrowDown', 'ArrowUp'].forEach((key) => {
      it(`opens the dropdown when the "${key}" key is pressed on the button`, () => {
        // can't use the default native `button` as it doesn't treat enter or space press as a click
        const { getByRole } = render(<SelectUnstyled components={{ Root: 'div' }} />);
        const button = getByRole('button');
        act(() => {
          button.focus();
        });
        userEvent.keyPress(button, { key });

        expect(button).to.have.attribute('aria-expanded', 'true');
        expect(getByRole('listbox')).not.to.equal(null);
        expect(document.activeElement).to.equal(getByRole('listbox'));
      });
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
