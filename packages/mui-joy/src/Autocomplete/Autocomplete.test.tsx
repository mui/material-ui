import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { describeConformance, createRenderer, screen, act, fireEvent } from 'test/utils';
import Autocomplete, { autocompleteClasses as classes } from '@mui/joy/Autocomplete';
import Input from '@mui/joy/Input';
import Chip from '@mui/joy/Chip';
import { ThemeProvider } from '@mui/joy/styles';

function checkHighlightIs(listbox: HTMLElement, expected: string | null) {
  const focused = listbox.querySelector(`.${classes.focused}`);

  if (expected) {
    if (focused) {
      expect(focused).to.have.text(expected);
    } else {
      // No options selected
      expect(null).to.equal(expected);
    }
  } else {
    expect(focused).to.equal(null);
  }
}

describe('Joy <Autocomplete />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Autocomplete options={[]} renderInput={(params) => <Input {...params} />} />,
    () => ({
      classes,
      inheritComponent: 'div',
      render,
      ThemeProvider,
      refInstanceof: window.HTMLDivElement,
      muiName: 'JoyAutocomplete',
      testDeepOverrides: { slotName: 'listbox', slotClassName: classes.listbox },
      skip: ['componentsProp', 'classesRoot'],
    }),
  );

  it('should be customizable in the theme', () => {
    render(
      <ThemeProvider
        theme={{
          components: {
            JoyAutocomplete: {
              styleOverrides: {
                listbox: {
                  mixBlendMode: 'darken',
                },
              },
            },
          },
        }}
      >
        <Autocomplete options={[]} open renderInput={(params) => <Input {...params} />} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('listbox')).to.toHaveComputedStyle({
      mixBlendMode: 'darken',
    });
  });

  describe('combobox', () => {
    it('should clear the input when blur', () => {
      const { getByRole } = render(
        <Autocomplete options={[]} renderInput={(params) => <Input {...params} />} />,
      );
      const input = getByRole('combobox') as HTMLInputElement;

      act(() => {
        input.focus();
        fireEvent.change(document.activeElement!, { target: { value: 'a' } });
      });

      expect(input.value).to.equal('a');

      act(() => {
        (document.activeElement as HTMLElement).blur();
      });
      expect(input.value).to.equal('');
    });

    it('should apply the icon classes', () => {
      const { container } = render(
        <Autocomplete
          value="one"
          options={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} />}
        />,
      );
      expect(container.querySelector(`.${classes.root}`)).to.have.class(classes.hasClearIcon);
      expect(container.querySelector(`.${classes.root}`)).to.have.class(classes.hasPopupIcon);
    });
  });

  describe('prop: loading', () => {
    it('should show a loading message when open', () => {
      render(
        <Autocomplete
          options={[]}
          freeSolo
          loading
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );
      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
      expect(document.querySelector(`.${classes.loading}`)?.textContent).to.equal('Loading…');
    });
  });

  describe('prop: autoHighlight', () => {
    it('should set the focus on the first item', () => {
      const options = ['one', 'two'];
      const { getByRole } = render(
        <Autocomplete
          freeSolo
          autoHighlight
          open
          options={options}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );

      checkHighlightIs(getByRole('listbox'), 'one');
      fireEvent.change(document.activeElement!, { target: { value: 'oo' } });
      fireEvent.change(document.activeElement!, { target: { value: 'o' } });
      checkHighlightIs(getByRole('listbox'), 'one');
    });

    it('should keep the highlight on the first item', () => {
      const options = ['one', 'two'];
      const { getByRole } = render(
        <Autocomplete
          value="one"
          autoHighlight
          open
          options={options}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );

      checkHighlightIs(getByRole('listbox'), 'one');
      fireEvent.change(document.activeElement!, { target: { value: 'two' } });
      checkHighlightIs(getByRole('listbox'), 'two');
    });

    it('should set the focus on the first item when possible', () => {
      const options = ['one', 'two'];
      const { getByRole, setProps } = render(
        <Autocomplete
          open
          options={[]}
          autoHighlight
          loading
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('combobox');
      expect(textbox).not.to.have.attribute('aria-activedescendant');

      setProps({ options, loading: false });
      expect(textbox).to.have.attribute(
        'aria-activedescendant',
        screen.getAllByRole('option')[0].getAttribute('id')!,
      );
    });

    it('should set the highlight on selected item when dropdown is expanded', () => {
      const { getByRole, setProps } = render(
        <Autocomplete
          value="one"
          open
          options={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );

      checkHighlightIs(getByRole('listbox'), 'one');
      setProps({ value: 'two' });
      checkHighlightIs(getByRole('listbox'), 'two');
    });

    it('should keep the current highlight if possible', () => {
      const { getByRole } = render(
        <Autocomplete
          multiple
          defaultValue={['one']}
          open
          options={['one', 'two', 'three']}
          disableCloseOnSelect
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('combobox');

      checkHighlightIs(getByRole('listbox'), 'one');
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      checkHighlightIs(getByRole('listbox'), 'two');
      fireEvent.keyDown(textbox, { key: 'Enter' });
      checkHighlightIs(getByRole('listbox'), 'two');
    });

    it('should work with filterSelectedOptions too', () => {
      const options = ['Foo', 'Bar', 'Baz'];
      const { getByRole } = render(
        <Autocomplete
          multiple
          filterSelectedOptions
          autoHighlight
          value={options.slice(0, 1)}
          options={options}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      checkHighlightIs(getByRole('listbox'), 'Bar');
      fireEvent.change(textbox, { target: { value: 'a' } });
      checkHighlightIs(getByRole('listbox'), 'Bar');
      fireEvent.change(textbox, { target: { value: 'aa' } });
      fireEvent.change(textbox, { target: { value: 'a' } });
      checkHighlightIs(getByRole('listbox'), 'Bar');
    });
  });

  describe('highlight synchronisation', () => {
    it('should not update the highlight when multiple open and value change', () => {
      const { setProps, getByRole } = render(
        <Autocomplete
          value={['two']}
          multiple
          open
          options={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );

      checkHighlightIs(getByRole('listbox'), 'two');
      setProps({
        value: [],
      });
      checkHighlightIs(getByRole('listbox'), 'two');
    });
  });

  describe('prop: limitTags', () => {
    it('show all items on focus', () => {
      const { container, getAllByRole, getByRole } = render(
        <Autocomplete
          multiple
          limitTags={2}
          options={['one', 'two', 'three']}
          defaultValue={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} />}
        />,
      );

      expect(container.textContent).to.equal('onetwo+1');
      // include hidden clear button because JSDOM thinks it's visible
      expect(getAllByRole('button', { hidden: true })).to.have.lengthOf(4);

      act(() => {
        getByRole('combobox').focus();
      });
      expect(container.textContent).to.equal('onetwothree');
      // Depending on the subset of components used in this test run the computed `visibility` changes in JSDOM.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        expect(getAllByRole('button', { hidden: false })).to.have.lengthOf(5);
      }
    });

    it('show 0 item on close when set 0 to limitTags', () => {
      const { container, getAllByRole, getByRole } = render(
        <Autocomplete
          multiple
          limitTags={0}
          options={['one', 'two', 'three']}
          defaultValue={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} />}
        />,
      );

      expect(container.textContent).to.equal('+3');
      // include hidden clear button because JSDOM thinks it's visible
      expect(getAllByRole('button', { hidden: true })).to.have.lengthOf(2);

      act(() => {
        getByRole('combobox').focus();
      });
      expect(container.textContent).to.equal('onetwothree');
      // Depending on the subset of components used in this test run the computed `visibility` changes in JSDOM.
      if (!/jsdom/.test(window.navigator.userAgent)) {
        expect(getAllByRole('button', { hidden: false })).to.have.lengthOf(5);
      }
    });
  });

  describe('prop: filterSelectedOptions', () => {
    it('when the last item is selected, highlights the new last item', () => {
      const { getByRole } = render(
        <Autocomplete
          filterSelectedOptions
          openOnFocus
          options={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowUp' });
      checkHighlightIs(getByRole('listbox'), 'three');
      fireEvent.keyDown(textbox, { key: 'Enter' }); // selects the last option (three)
      const input = getByRole('combobox');
      act(() => {
        input.blur();
        input.focus(); // opens the listbox again
      });
      checkHighlightIs(getByRole('listbox'), null);
    });
  });

  describe('prop: autoSelect', () => {
    it('should not clear on blur when value does not match any option', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      render(
        <Autocomplete
          freeSolo
          autoSelect
          options={options}
          onChange={handleChange}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      fireEvent.change(textbox, { target: { value: 'o' } });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.change(textbox, { target: { value: 'oo' } });
      act(() => {
        textbox.blur();
      });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal('oo');
    });

    it('should add new value when autoSelect & multiple on blur', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      render(
        <Autocomplete
          autoSelect
          multiple
          value={[options[0]]}
          openOnFocus
          options={options}
          onChange={handleChange}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      act(() => {
        fireEvent.change(textbox, { target: { value: 't' } });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        textbox.blur();
      });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(options);
    });

    it('should add new value when autoSelect & multiple & freeSolo on blur', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          autoSelect
          freeSolo
          multiple
          onChange={handleChange}
          options={[]}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );

      fireEvent.change(document.activeElement!, { target: { value: 'a' } });
      act(() => {
        (document.activeElement as HTMLElement).blur();
      });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(['a']);
    });
  });

  describe('prop: multiple', () => {
    it('should not crash', () => {
      const { getByRole } = render(
        <Autocomplete
          openOnFocus
          options={[]}
          renderInput={(params) => <Input {...params} />}
          multiple
        />,
      );
      const input = getByRole('combobox');

      act(() => {
        input.focus();
        (document.activeElement as HTMLElement).blur();
        input.focus();
      });
    });

    it('should remove the last option', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      const { getAllByTestId } = render(
        <Autocomplete
          options={[]}
          defaultValue={['one', 'two']}
          onChange={handleChange}
          renderInput={(params) => <Input {...params} />}
          multiple
        />,
      );
      fireEvent.click(getAllByTestId('CancelIcon')[1]);
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([options[0]]);
    });

    it.skip('navigates between different tags', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      render(
        <Autocomplete
          defaultValue={options as any}
          options={options}
          onChange={handleChange}
          renderInput={(params) => <Input {...params} autoFocus />}
          multiple
        />,
      );
      const textbox = screen.getByRole('combobox');
      const [firstSelectedValue, secondSelectedValue] = screen.getAllByRole('button');

      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });
      expect(secondSelectedValue).toHaveFocus();

      fireEvent.keyDown(secondSelectedValue, { key: 'ArrowLeft' });
      expect(firstSelectedValue).toHaveFocus();

      fireEvent.keyDown(firstSelectedValue, { key: 'Backspace' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([options[1]]);
      expect(textbox).toHaveFocus();
    });

    it('should keep listbox open on pressing left or right keys when inputValue is not empty', () => {
      const handleClose = spy();
      const options = ['one', 'two', 'three'];
      const { getByRole } = render(
        <Autocomplete
          options={options}
          onClose={handleClose}
          renderInput={(params) => <Input {...params} autoFocus />}
          multiple
          inputValue="tw"
        />,
      );

      const textbox = getByRole('combobox');

      fireEvent.mouseDown(textbox);
      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });

      expect(handleClose.callCount).to.equal(0);
      expect(textbox).to.have.attribute('aria-expanded', 'true');
    });

    it('should close listbox on pressing left or right keys when inputValue is empty', () => {
      const handleClose = spy();
      const options = ['one', 'two', 'three'];
      const { getByRole } = render(
        <Autocomplete
          options={options}
          onClose={handleClose}
          renderInput={(params) => <Input {...params} autoFocus />}
          multiple
          inputValue=""
        />,
      );

      const textbox = getByRole('combobox');

      fireEvent.mouseDown(textbox);
      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });

      expect(handleClose.callCount).to.equal(1);
      expect(textbox).to.have.attribute('aria-expanded', 'false');
    });

    it('should not crash if a tag is missing', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      render(
        <Autocomplete
          defaultValue={options as any}
          options={options}
          value={options}
          renderTags={(value, getTagProps) =>
            value
              .filter((x, index) => index === 1)
              .map((option, index) => <Chip {...getTagProps({ index })}>{option.title}</Chip>)
          }
          onChange={handleChange}
          renderInput={(params) => <Input {...params} autoFocus />}
          multiple
        />,
      );
      const textbox = screen.getByRole('combobox');
      const [firstSelectedValue] = screen.getAllByRole('button');

      fireEvent.keyDown(textbox, { key: 'ArrowLeft' });
      // skip value "two"
      expect(firstSelectedValue).toHaveFocus();

      fireEvent.keyDown(firstSelectedValue, { key: 'ArrowRight' });
      expect(textbox).toHaveFocus();
    });
  });
});
