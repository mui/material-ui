import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { createRenderer, fireEvent, flushMicrotasks, screen } from '@mui/internal-test-utils';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses as classes } from '@mui/material/Autocomplete';
import FloatingPopup from '@mui/material/FloatingPopup';

const options = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];

function checkHighlightIs(listbox: HTMLElement, expected: string | null) {
  const focused = listbox.querySelector(`.${classes.focused}`);
  if (expected) {
    expect(focused).to.have.text(expected);
  } else {
    expect(focused).to.equal(null);
  }
}

/**
 * Opens an Autocomplete via keyboard, then flushes microtasks so
 * FloatingPopup's async computePosition completes and visibility:hidden
 * is removed (making the popup accessible to getByRole).
 */
async function openAutocomplete(
  user: ReturnType<ReturnType<typeof createRenderer>['render']>['user'],
) {
  const input = screen.getByRole('combobox');
  await user.click(input);
  await flushMicrotasks();
  return input;
}

/**
 * Integration tests for Autocomplete with FloatingPopup as the popper slot.
 *
 * FloatingPopup uses async computePosition from floating-ui. Until positioning
 * completes, the popup has `visibility: hidden` which hides it from the
 * accessibility tree. Tests that query popup DOM call `await flushMicrotasks()`
 * after interactions that open the popup.
 */
describe('<Autocomplete slots={{ popper: FloatingPopup }} />', () => {
  const { render } = createRenderer();

  function renderAutocomplete(props: Record<string, any> = {}) {
    return render(
      <Autocomplete
        options={options}
        slots={{ popper: FloatingPopup }}
        renderInput={(params) => <TextField {...params} label="Test" />}
        {...props}
      />,
    );
  }

  // ──────────────────────────────────────────────
  // Opening and closing
  // ──────────────────────────────────────────────

  describe('opening and closing', () => {
    it('should open the listbox on click', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      expect(screen.getByRole('listbox')).not.to.equal(null);
    });

    it('should open the listbox on ArrowDown', async () => {
      const { user } = renderAutocomplete();
      await user.click(screen.getByRole('combobox'));
      await user.keyboard('{ArrowDown}');
      await flushMicrotasks();
      expect(screen.getByRole('listbox')).not.to.equal(null);
    });

    it('should close the listbox on Escape', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      expect(screen.getByRole('listbox')).not.to.equal(null);
      await user.keyboard('{Escape}');
      expect(screen.queryByRole('listbox')).to.equal(null);
    });

    it('should close the listbox when an option is selected', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      await user.click(screen.getAllByRole('option')[0]);
      expect(screen.queryByRole('listbox')).to.equal(null);
    });

    it('should close the listbox on blur', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      expect(screen.getByRole('listbox')).not.to.equal(null);
      await user.tab();
      expect(screen.queryByRole('listbox')).to.equal(null);
    });

    it('should not open on right click', async () => {
      const { user } = renderAutocomplete();
      await user.pointer({ keys: '[MouseRight]', target: screen.getByRole('combobox') });
      expect(screen.queryByRole('listbox')).to.equal(null);
    });
  });

  // ──────────────────────────────────────────────
  // Selection
  // ──────────────────────────────────────────────

  describe('selection', () => {
    it('should select an option by clicking', async () => {
      const onChange = spy();
      const { user } = renderAutocomplete({ onChange });
      await openAutocomplete(user);
      await user.click(screen.getAllByRole('option')[1]);
      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][1]).to.equal('Beta');
    });

    it('should select an option with Enter after keyboard navigation', async () => {
      const onChange = spy();
      const { user } = renderAutocomplete({ onChange });
      await openAutocomplete(user);
      await user.keyboard('{ArrowDown}{Enter}');
      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][1]).to.equal('Alpha');
    });

    it('should display selected value in the input', () => {
      renderAutocomplete({ defaultValue: 'Gamma' });
      expect(screen.getByRole('combobox')).to.have.value('Gamma');
    });

    it('should clear the value when the clear button is clicked', async () => {
      const onChange = spy();
      const { container, user } = renderAutocomplete({ defaultValue: 'Alpha', onChange });
      const clearButton = container.querySelector(`.${classes.clearIndicator}`) as HTMLElement;
      await user.click(clearButton);
      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][1]).to.equal(null);
      expect(screen.getByRole('combobox')).to.have.value('');
    });
  });

  // ──────────────────────────────────────────────
  // Keyboard navigation
  // ──────────────────────────────────────────────

  describe('keyboard navigation', () => {
    it('should highlight the first option on ArrowDown', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      await user.keyboard('{ArrowDown}');
      checkHighlightIs(screen.getByRole('listbox'), 'Alpha');
    });

    it('should highlight the last option on ArrowUp', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      await user.keyboard('{ArrowUp}');
      checkHighlightIs(screen.getByRole('listbox'), 'Epsilon');
    });

    it('should cycle through options with repeated ArrowDown', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');
      checkHighlightIs(screen.getByRole('listbox'), 'Gamma');
    });

    it('should set aria-activedescendant on the input', async () => {
      const { user } = renderAutocomplete();
      const input = await openAutocomplete(user);
      await user.keyboard('{ArrowDown}');
      const firstOption = screen.getAllByRole('option')[0];
      expect(input).to.have.attribute('aria-activedescendant', firstOption.id);
    });

    it('should clear input on blur when no option is selected', async () => {
      const { user } = renderAutocomplete();
      const input = screen.getByRole('combobox');
      await user.click(input);
      await user.keyboard('xyz');
      expect(input).to.have.value('xyz');
      await user.tab();
      expect(input).to.have.value('');
    });
  });

  // ──────────────────────────────────────────────
  // Filtering
  // ──────────────────────────────────────────────

  describe('filtering', () => {
    it('should filter options as the user types', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      await user.keyboard('Al');
      const renderedOptions = screen.getAllByRole('option');
      expect(renderedOptions).to.have.length(1);
      expect(renderedOptions[0]).to.have.text('Alpha');
    });

    it('should show "No options" when filter matches nothing', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      await user.keyboard('zzz');
      expect(screen.queryByRole('option')).to.equal(null);
      expect(screen.getByText('No options')).not.to.equal(null);
    });

    it('should restore full list when input is cleared', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      await user.keyboard('Al');
      expect(screen.getAllByRole('option')).to.have.length(1);
      await user.clear(screen.getByRole('combobox'));
      await flushMicrotasks();
      expect(screen.getAllByRole('option')).to.have.length(options.length);
    });
  });

  // ──────────────────────────────────────────────
  // Multiple selection
  // ──────────────────────────────────────────────

  describe('multiple', () => {
    it('should call onChange with accumulated values when selecting multiple', async () => {
      const onChange = spy();
      const { user } = renderAutocomplete({
        multiple: true,
        onChange,
        open: true,
        onClose: () => {},
      });
      await flushMicrotasks();
      await user.click(screen.getByRole('combobox'));
      await user.keyboard('{ArrowDown}{Enter}');
      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][1]).to.deep.equal(['Alpha']);
    });

    it('should render chips for selected values', () => {
      const { container } = renderAutocomplete({
        multiple: true,
        defaultValue: ['Alpha', 'Beta'],
      });
      const chips = container.querySelectorAll(`.${classes.tag}`);
      expect(chips).to.have.length(2);
    });

    it('should remove a chip when its delete button is clicked', async () => {
      const onChange = spy();
      const { container, user } = renderAutocomplete({
        multiple: true,
        defaultValue: ['Alpha', 'Beta'],
        onChange,
      });
      const deleteButtons = container.querySelectorAll(`.${classes.tag} svg`);
      await user.click(deleteButtons[0] as Element);
      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][1]).to.deep.equal(['Beta']);
    });
  });

  // ──────────────────────────────────────────────
  // Free solo
  // ──────────────────────────────────────────────

  describe('freeSolo', () => {
    it('should allow arbitrary input values', async () => {
      const onChange = spy();
      const { user } = renderAutocomplete({ freeSolo: true, onChange });
      await user.click(screen.getByRole('combobox'));
      await user.keyboard('custom value{Enter}');
      expect(onChange.callCount).to.equal(1);
      expect(onChange.args[0][1]).to.equal('custom value');
    });

    it('should not clear input on blur in freeSolo mode', async () => {
      const { user } = renderAutocomplete({ freeSolo: true });
      await user.click(screen.getByRole('combobox'));
      await user.keyboard('custom');
      await user.tab();
      expect(screen.getByRole('combobox')).to.have.value('custom');
    });
  });

  // ──────────────────────────────────────────────
  // Loading
  // ──────────────────────────────────────────────

  describe('loading', () => {
    it('should show loading text when loading and no options', async () => {
      const { user } = renderAutocomplete({ options: [], loading: true });
      await openAutocomplete(user);
      expect(screen.getByText('Loading…')).not.to.equal(null);
    });

    it('should show options even when loading flag is set', async () => {
      const { user } = renderAutocomplete({ loading: true });
      await openAutocomplete(user);
      expect(screen.getAllByRole('option')).to.have.length(options.length);
    });
  });

  // ──────────────────────────────────────────────
  // Disabled states
  // ──────────────────────────────────────────────

  describe('disabled', () => {
    it('should not open when disabled', async () => {
      const { user } = renderAutocomplete({ disabled: true });
      await user.click(screen.getByRole('combobox'));
      expect(screen.queryByRole('listbox')).to.equal(null);
    });

    it('should disable individual options via getOptionDisabled', async () => {
      const { user } = renderAutocomplete({
        getOptionDisabled: (option: string) => option === 'Beta',
      });
      await openAutocomplete(user);
      const betaOption = screen.getAllByRole('option')[1];
      expect(betaOption).to.have.attribute('aria-disabled', 'true');
    });
  });

  // ──────────────────────────────────────────────
  // Accessibility
  // ──────────────────────────────────────────────

  describe('accessibility', () => {
    it('should have role="combobox" on the input', () => {
      renderAutocomplete();
      expect(screen.getByRole('combobox')).not.to.equal(null);
    });

    it('should have aria-expanded when open', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      expect(screen.getByRole('combobox')).to.have.attribute('aria-expanded', 'true');
    });

    it('should have aria-expanded=false when closed', () => {
      renderAutocomplete();
      expect(screen.getByRole('combobox')).to.have.attribute('aria-expanded', 'false');
    });

    it('should have role="listbox" on the popup list', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      expect(screen.getByRole('listbox')).not.to.equal(null);
    });

    it('should have role="option" on each option', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      expect(screen.getAllByRole('option')).to.have.length(options.length);
    });

    it('should have aria-controls linking input to listbox', async () => {
      const { user } = renderAutocomplete();
      const input = await openAutocomplete(user);
      const listbox = screen.getByRole('listbox');
      expect(input).to.have.attribute('aria-controls', listbox.id);
    });

    it('should have role="presentation" on the popup container', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      const popup = document.querySelector('[data-popper-placement]');
      expect(popup).to.have.attribute('role', 'presentation');
    });
  });

  // ──────────────────────────────────────────────
  // Popup positioning
  // ──────────────────────────────────────────────

  describe('popup positioning', () => {
    it('should set data-popper-placement on the floating element', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      const floating = document.querySelector('[data-popper-placement]');
      expect(floating).not.to.equal(null);
    });

    it('should match the width of the input', async () => {
      const { user } = renderAutocomplete({ sx: { width: 300 } });
      await openAutocomplete(user);
      const floating = document.querySelector('[data-popper-placement]') as HTMLElement;
      expect(floating).not.to.equal(null);
      expect(floating!.style.width).not.to.equal('');
    });

    it('should remove visibility:hidden after positioning completes', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      const floating = document.querySelector('[data-popper-placement]') as HTMLElement;
      expect(floating!.style.visibility).not.to.equal('hidden');
    });
  });

  // ──────────────────────────────────────────────
  // CSS variables
  // ──────────────────────────────────────────────

  describe('CSS variables', () => {
    it('should set --anchor-width on the floating element', async () => {
      const { user } = renderAutocomplete({ sx: { width: 300 } });
      await openAutocomplete(user);
      const floating = document.querySelector('[data-popper-placement]') as HTMLElement;
      const anchorWidth = floating!.style.getPropertyValue('--anchor-width');
      expect(anchorWidth).not.to.equal('');
    });

    it('should set --available-height on the floating element', async () => {
      const { user } = renderAutocomplete();
      await openAutocomplete(user);
      const floating = document.querySelector('[data-popper-placement]') as HTMLElement;
      const availableHeight = floating!.style.getPropertyValue('--available-height');
      expect(availableHeight).not.to.equal('');
    });
  });

  // ──────────────────────────────────────────────
  // disablePortal
  // ──────────────────────────────────────────────

  describe('disablePortal', () => {
    it('should render the popup inline', async () => {
      const { container, user } = renderAutocomplete({ disablePortal: true });
      await openAutocomplete(user);
      const floating = container.querySelector('[data-popper-placement]');
      expect(floating).not.to.equal(null);
      expect(container.contains(floating)).to.equal(true);
    });
  });

  // ──────────────────────────────────────────────
  // Callbacks
  // ──────────────────────────────────────────────

  describe('callbacks', () => {
    it('should call onOpen when the listbox opens', async () => {
      const onOpen = spy();
      const { user } = renderAutocomplete({ onOpen });
      await openAutocomplete(user);
      expect(onOpen.callCount).to.equal(1);
    });

    it('should call onClose when the listbox closes', async () => {
      const onClose = spy();
      const { user } = renderAutocomplete({ onClose });
      await openAutocomplete(user);
      await user.keyboard('{Escape}');
      expect(onClose.callCount).to.equal(1);
    });

    it('should call onInputChange when the input value changes', async () => {
      const onInputChange = spy();
      const { user } = renderAutocomplete({ onInputChange });
      await user.click(screen.getByRole('combobox'));
      await user.keyboard('test');
      expect(onInputChange.callCount).to.equal(4); // one per character
      expect(onInputChange.lastCall.args[1]).to.equal('test');
    });
  });

  // ──────────────────────────────────────────────
  // Grouped options
  // ──────────────────────────────────────────────

  describe('grouped', () => {
    const groupedOptions = [
      { label: 'A1', group: 'A' },
      { label: 'A2', group: 'A' },
      { label: 'B1', group: 'B' },
    ];

    it('should render group headers', async () => {
      const { user } = render(
        <Autocomplete
          options={groupedOptions}
          groupBy={(option) => option.group}
          getOptionLabel={(option) => option.label}
          slots={{ popper: FloatingPopup }}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      await openAutocomplete(user);
      const groups = document.querySelectorAll(`.${classes.groupLabel}`);
      expect(groups).to.have.length(2);
    });

    it('should navigate options across groups with keyboard', async () => {
      const { user } = render(
        <Autocomplete
          options={groupedOptions}
          groupBy={(option) => option.group}
          getOptionLabel={(option) => option.label}
          slots={{ popper: FloatingPopup }}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      await openAutocomplete(user);
      await user.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}');
      checkHighlightIs(screen.getByRole('listbox'), 'B1');
    });
  });

  // ──────────────────────────────────────────────
  // Object options
  // ──────────────────────────────────────────────

  describe('object options', () => {
    const films = [
      { title: 'The Godfather', year: 1972 },
      { title: 'Pulp Fiction', year: 1994 },
    ];

    it('should render with getOptionLabel', async () => {
      const { user } = render(
        <Autocomplete
          options={films}
          getOptionLabel={(option) => option.title}
          slots={{ popper: FloatingPopup }}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      await openAutocomplete(user);
      expect(screen.getAllByRole('option')[0]).to.have.text('The Godfather');
    });

    it('should select object values', async () => {
      const onChange = spy();
      const { user } = render(
        <Autocomplete
          options={films}
          getOptionLabel={(option) => option.title}
          onChange={onChange}
          slots={{ popper: FloatingPopup }}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      await openAutocomplete(user);
      await user.click(screen.getAllByRole('option')[0]);
      expect(onChange.args[0][1]).to.deep.equal(films[0]);
    });
  });

  // ──────────────────────────────────────────────
  // slotProps.popper passthrough
  // ──────────────────────────────────────────────

  describe('slotProps.popper', () => {
    it('should forward keepMounted to FloatingPopup', () => {
      renderAutocomplete({
        slotProps: { popper: { keepMounted: true } },
      });
      // Closed — floating element in DOM but with visibility:hidden (FOUC guard)
      const floating = document.querySelector('[data-popper-placement]');
      expect(floating).not.to.equal(null);
    });

    it('should forward data attributes to the floating element', async () => {
      const { user } = renderAutocomplete({
        slotProps: { popper: { 'data-testid': 'custom-popup' } },
      });
      await openAutocomplete(user);
      expect(screen.getByTestId('custom-popup')).not.to.equal(null);
    });
  });

  // ──────────────────────────────────────────────
  // Controlled mode
  // ──────────────────────────────────────────────

  describe('controlled', () => {
    it('should respect controlled value', () => {
      renderAutocomplete({ value: 'Beta' });
      expect(screen.getByRole('combobox')).to.have.value('Beta');
    });

    it('should respect controlled inputValue', () => {
      renderAutocomplete({ inputValue: 'typed', onInputChange: () => {} });
      expect(screen.getByRole('combobox')).to.have.value('typed');
    });

    it('should respect controlled open', async () => {
      const { user } = renderAutocomplete({ open: true, onOpen: () => {}, onClose: () => {} });
      await flushMicrotasks();
      expect(screen.getByRole('listbox')).not.to.equal(null);
      await user.click(screen.getByRole('combobox'));
      await user.keyboard('{Escape}');
      // Still open — controlled (onClose doesn't update state)
      expect(screen.getByRole('listbox')).not.to.equal(null);
    });
  });

  // ──────────────────────────────────────────────
  // Parity with default Popper
  // ──────────────────────────────────────────────

  describe('parity with default Popper', () => {
    it('should render the same number of options', async () => {
      const { unmount } = render(
        <Autocomplete
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
      const defaultCount = screen.getAllByRole('option').length;
      unmount();

      const { user } = render(
        <Autocomplete
          options={options}
          slots={{ popper: FloatingPopup }}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      await openAutocomplete(user);
      const floatingCount = screen.getAllByRole('option').length;
      expect(floatingCount).to.equal(defaultCount);
    });

    it('should produce the same ARIA attributes on the input', async () => {
      const { unmount } = render(
        <Autocomplete
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
      const defaultInput = screen.getByRole('combobox');
      const defaultAttrs = {
        expanded: defaultInput.getAttribute('aria-expanded'),
        hasPopup: defaultInput.getAttribute('aria-haspopup'),
        autocomplete: defaultInput.getAttribute('aria-autocomplete'),
      };
      unmount();

      const { user } = render(
        <Autocomplete
          options={options}
          slots={{ popper: FloatingPopup }}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      await openAutocomplete(user);
      const floatingInput = screen.getByRole('combobox');
      expect(floatingInput.getAttribute('aria-expanded')).to.equal(defaultAttrs.expanded);
      expect(floatingInput.getAttribute('aria-haspopup')).to.equal(defaultAttrs.hasPopup);
      expect(floatingInput.getAttribute('aria-autocomplete')).to.equal(defaultAttrs.autocomplete);
    });
  });
});
