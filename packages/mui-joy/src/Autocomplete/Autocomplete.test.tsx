import * as React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { describeConformance, createRenderer, screen, act, fireEvent } from 'test/utils';
import Autocomplete, { autocompleteClasses as classes } from '@mui/joy/Autocomplete';
import Input from '@mui/joy/Input';
import Chip from '@mui/joy/Chip';
import ChipDelete from '@mui/joy/ChipDelete';
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

    it('navigates between different tags', () => {
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
              .map((option, index) => (
                <Chip key={index} endDecorator={<ChipDelete {...getTagProps({ index })} />}>
                  {option.title}
                </Chip>
              ))
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

    it('should not call onChange function for duplicate values', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      render(
        <Autocomplete
          freeSolo
          defaultValue={options as any}
          options={options}
          onChange={handleChange}
          renderInput={(params) => <Input {...params} autoFocus />}
          multiple
        />,
      );
      const textbox = screen.getByRole('combobox');

      fireEvent.change(textbox, { target: { value: 'two' } });
      fireEvent.keyDown(textbox, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(0);

      fireEvent.change(textbox, { target: { value: 'three' } });
      fireEvent.keyDown(textbox, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
    });

    it('has no textbox value', () => {
      render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} />}
          multiple
          value={['one', 'two']}
        />,
      );

      expect(screen.getByRole('combobox')).to.have.property('value', '');
    });

    it('should fail validation if a required field has no value', function test() {
      if (/jsdom/.test(window.navigator.userAgent)) {
        // Enable once https://github.com/jsdom/jsdom/issues/2898 is resolved
        this.skip();
      }

      const handleSubmit = spy((event) => event.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <Autocomplete
            multiple
            options={['one', 'two']}
            renderInput={(params) => <Input {...params} required />}
            value={[]}
          />
          <button type="submit">Submit</button>
        </form>,
      );

      screen.getByRole('button', { name: 'Submit' }).click();

      expect(handleSubmit.callCount).to.equal(0);
    });

    it('should fail validation if a required field has a value', function test() {
      // Unclear how native Constraint validation can be enabled for `multiple`
      if (/jsdom/.test(window.navigator.userAgent)) {
        // Enable once https://github.com/jsdom/jsdom/issues/2898 is resolved
        // The test is passing in JSDOM but form validation is buggy in JSDOM so we rather skip than have false confidence
        this.skip();
      }

      const handleSubmit = spy((event) => event.preventDefault());
      render(
        <form onSubmit={handleSubmit}>
          <Autocomplete
            multiple
            options={['one', 'two']}
            renderInput={(params) => <Input {...params} required />}
            value={['one']}
          />
          <button type="submit">Submit</button>
        </form>,
      );

      screen.getByRole('button', { name: 'Submit' }).click();

      expect(handleSubmit.callCount).to.equal(0);
    });
  });

  it('should trigger a form expectedly', () => {
    const handleSubmit = spy();
    const Test = (props: any) => (
      <div
        onKeyDown={(event) => {
          if (!event.defaultPrevented && event.key === 'Enter') {
            handleSubmit();
          }
        }}
      >
        <Autocomplete
          options={['one', 'two']}
          renderInput={(props2) => <Input {...props2} autoFocus />}
          {...props}
        />
      </div>
    );
    const { setProps } = render(<Test />);
    let textbox = screen.getByRole('combobox');

    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(1);

    fireEvent.change(textbox, { target: { value: 'o' } });
    fireEvent.keyDown(textbox, { key: 'ArrowDown' });
    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(1);

    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(2);

    setProps({ key: 'test-2', multiple: true, freeSolo: true });
    textbox = screen.getByRole('combobox');

    fireEvent.change(textbox, { target: { value: 'o' } });
    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(2);

    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(3);

    setProps({ key: 'test-3', freeSolo: true });
    textbox = screen.getByRole('combobox');

    fireEvent.change(textbox, { target: { value: 'o' } });
    fireEvent.keyDown(textbox, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(4);
  });

  describe('prop: getOptionDisabled', () => {
    it('should prevent the disabled option to trigger actions but allow focus with disabledItemsFocusable', () => {
      const handleSubmit = spy();
      const handleChange = spy();
      const { getAllByRole } = render(
        <div
          onKeyDown={(event) => {
            if (!event.defaultPrevented && event.key === 'Enter') {
              handleSubmit();
            }
          }}
        >
          <Autocomplete
            disabledItemsFocusable
            getOptionDisabled={(option) => option === 'two'}
            onChange={handleChange}
            openOnFocus
            options={['one', 'two', 'three']}
            renderInput={(props2) => <Input {...props2} autoFocus />}
          />
        </div>,
      );

      let options;
      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      options = getAllByRole('option');
      expect(textbox).to.have.attribute('aria-activedescendant', options[1].getAttribute('id')!);

      fireEvent.keyDown(textbox, { key: 'Enter' });
      expect(handleSubmit.callCount).to.equal(0);
      expect(handleChange.callCount).to.equal(0);

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      options = getAllByRole('option');
      expect(textbox).to.have.attribute('aria-activedescendant', options[0].getAttribute('id')!);

      fireEvent.keyDown(textbox, { key: 'Enter' });
      expect(handleSubmit.callCount).to.equal(0);
      expect(handleChange.callCount).to.equal(1);
    });
  });

  describe('WAI-ARIA conforming markup', () => {
    specify('when closed', () => {
      const { getAllByRole, getByRole, queryByRole } = render(
        <Autocomplete options={[]} renderInput={(params) => <Input {...params} />} />,
      );

      const combobox = getByRole('combobox');
      expect(combobox).to.have.attribute('aria-expanded', 'false');
      // reflected aria-haspopup is `listbox`
      // this assertion can fail if the value is `listbox`
      expect(combobox).not.to.have.attribute('aria-haspopup');

      const textbox = getByRole('combobox');
      expect(combobox).to.contain(textbox);
      // reflected aria-multiline has to be false i.e. not present or false
      expect(textbox).not.to.have.attribute('aria-multiline');
      expect(textbox).to.have.attribute('aria-autocomplete', 'list');
      expect(textbox, 'no option is focused when openened').not.to.have.attribute(
        'aria-activedescendant',
      );

      // listbox is not only inaccessible but not in the DOM
      const listbox = queryByRole('listbox', { hidden: true });
      expect(listbox).to.equal(null);

      const buttons = getAllByRole('button', { hidden: true });

      expect(buttons[0]).toHaveAccessibleName('Open');
      expect(buttons[0]).to.have.attribute('title', 'Open');
      expect(buttons).to.have.length(1);
      expect(buttons[0], 'button is not in tab order').to.have.property('tabIndex', -1);
    });

    specify('when open', () => {
      const { getAllByRole, getByRole } = render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={(params) => <Input {...params} />}
        />,
      );

      const combobox = getByRole('combobox');
      expect(combobox).to.have.attribute('aria-expanded', 'true');

      const textbox = getByRole('combobox');

      const listbox = getByRole('listbox');
      expect(textbox).to.have.attribute('aria-controls', listbox.getAttribute('id')!);
      expect(textbox, 'no option is focused when openened').not.to.have.attribute(
        'aria-activedescendant',
      );

      const options = getAllByRole('option');
      expect(options).to.have.length(2);
      options.forEach((option) => {
        expect(listbox).to.contain(option);
      });

      const buttons = getAllByRole('button', { hidden: true });
      expect(buttons[0]).toHaveAccessibleName('Close');
      expect(buttons[0]).to.have.attribute('title', 'Close');
      expect(buttons).to.have.length(1);
      expect(buttons[0], 'button is not in tab order').to.have.property('tabIndex', -1);
    });

    it('should add and remove aria-activedescendant', () => {
      const { getAllByRole, getByRole, setProps } = render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('combobox');
      expect(textbox, 'no option is focused when openened').not.to.have.attribute(
        'aria-activedescendant',
      );
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });

      const options = getAllByRole('option');
      expect(textbox).to.have.attribute('aria-activedescendant', options[0].getAttribute('id')!);
      setProps({ open: false });
      expect(textbox, 'no option is focused when openened').not.to.have.attribute(
        'aria-activedescendant',
      );
    });
  });

  describe('when popup closed', () => {
    it('opens when the textbox is focused when `openOnFocus`', () => {
      const handleOpen = spy();
      render(
        <Autocomplete
          options={[]}
          onOpen={handleOpen}
          openOnFocus
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );

      expect(handleOpen.callCount).to.equal(1);
    });

    it('does not open on clear', () => {
      const handleOpen = spy();
      const handleChange = spy();
      const { container } = render(
        <Autocomplete
          onOpen={handleOpen}
          onChange={handleChange}
          open={false}
          options={['one', 'two']}
          value="one"
          renderInput={(params) => <Input {...params} />}
        />,
      );

      const clear = container.querySelector('button');
      fireEvent.click(clear!);

      expect(handleOpen.callCount).to.equal(0);
      expect(handleChange.callCount).to.equal(1);
    });

    ['ArrowDown', 'ArrowUp'].forEach((key) => {
      it(`opens on ${key} when focus is on the textbox and \`openOnFocus\` without moving focus`, () => {
        const handleOpen = spy();
        render(
          <Autocomplete
            onOpen={handleOpen}
            open={false}
            openOnFocus
            options={[]}
            renderInput={(params) => <Input {...params} autoFocus />}
          />,
        );
        const textbox = screen.getByRole('combobox');

        fireEvent.keyDown(textbox, { key });

        // first from focus
        expect(handleOpen.callCount).to.equal(2);
        expect(textbox).not.to.have.attribute('aria-activedescendant');
      });
    });

    it('does not clear the textbox on Escape', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          onChange={handleChange}
          open={false}
          options={['one', 'two']}
          value="one"
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });

      expect(handleChange.callCount).to.equal(0);
    });
  });

  describe('prop: clearOnEscape', () => {
    it('should clear on escape', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          onChange={handleChange}
          clearOnEscape
          multiple
          value={['one']}
          options={['one', 'two']}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([]);
    });
  });

  describe('prop: clearOnBlur', () => {
    it('should clear on blur', () => {
      render(
        <Autocomplete
          clearOnBlur
          options={['one', 'two']}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox') as HTMLInputElement;
      fireEvent.change(textbox, { target: { value: 'test' } });
      expect((document.activeElement as HTMLInputElement).value).to.equal('test');
      act(() => {
        textbox.blur();
      });
      expect(textbox.value).to.equal('');
    });

    it('should not clear on blur', () => {
      render(
        <Autocomplete
          clearOnBlur={false}
          options={['one', 'two']}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox') as HTMLInputElement;
      fireEvent.change(textbox, { target: { value: 'test' } });
      expect((document.activeElement as HTMLInputElement).value).to.equal('test');
      act(() => {
        textbox.blur();
      });
      expect(textbox.value).to.equal('test');
    });

    it('should not clear on blur with `multiple` enabled', () => {
      render(
        <Autocomplete
          multiple
          clearOnBlur={false}
          options={['one', 'two']}
          defaultValue={['one']}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox') as HTMLInputElement;
      fireEvent.change(textbox, { target: { value: 'test' } });
      expect((document.activeElement as HTMLInputElement).value).to.equal('test');
      act(() => {
        textbox.blur();
      });
      expect(textbox.value).to.equal('test');
    });
  });

  describe('when popup open', () => {
    it('closes the popup if Escape is pressed ', () => {
      const handleClose = spy();
      render(
        <Autocomplete
          onClose={handleClose}
          open
          options={['one', 'two']}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Escape' });
      expect(handleClose.callCount).to.equal(1);
    });

    it('does not close the popup when option selected if Control is pressed', () => {
      const handleClose = spy();
      const { getAllByRole } = render(
        <Autocomplete
          onClose={handleClose}
          open
          options={['one', 'two']}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );

      const options = getAllByRole('option');
      fireEvent.click(options[0], { ctrlKey: true });
      expect(handleClose.callCount).to.equal(0);
    });

    it('does not close the popup when option selected if Meta is pressed', () => {
      const handleClose = spy();
      const { getAllByRole } = render(
        <Autocomplete
          onClose={handleClose}
          open
          options={['one', 'two']}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );

      const options = getAllByRole('option');
      fireEvent.click(options[0], { metaKey: true });
      expect(handleClose.callCount).to.equal(0);
    });

    it('moves focus to the first option on ArrowDown', () => {
      const { getAllByRole, getByRole } = render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowDown' });
      expect(getByRole('combobox')).to.have.attribute(
        'aria-activedescendant',
        getAllByRole('option')[0].getAttribute('id')!,
      );
    });

    it('moves focus to the last option on ArrowUp', () => {
      const { getAllByRole, getByRole } = render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(screen.getByRole('combobox'), { key: 'ArrowUp' });
      const options = getAllByRole('option');
      expect(getByRole('combobox')).to.have.attribute(
        'aria-activedescendant',
        options[options.length - 1].getAttribute('id')!,
      );
    });

    it('should ignore keydown event until the IME is confirmed', function test() {
      // TODO: Often times out in Firefox 78.
      // Is this slow because of testing-library or because of the implementation?
      this.timeout(4000);

      const { getByRole } = render(
        <Autocomplete
          open
          options={['가1', '가2']}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('combobox');
      const listbox = getByRole('listbox');
      // Actual Behavior when "가" (Korean) is entered and press the arrow down key once on macOS/Chrome
      fireEvent.change(textbox, { target: { value: '가' } });
      fireEvent.keyDown(textbox, { key: 'ArrowDown', keyCode: 229 });
      fireEvent.keyDown(textbox, { key: 'ArrowDown', keyCode: 40 });

      checkHighlightIs(listbox, '가1');
    });
  });

  describe('prop: openOnFocus', () => {
    it('enables open on input focus', () => {
      const { getByRole } = render(
        <Autocomplete
          options={['one', 'two', 'three']}
          openOnFocus
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('combobox');
      const combobox = getByRole('combobox');

      expect(combobox).to.have.attribute('aria-expanded', 'true');
      expect(textbox).toHaveFocus();

      fireEvent.mouseDown(textbox);
      fireEvent.click(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'false');

      act(() => {
        (document.activeElement as HTMLElement).blur();
      });

      expect(combobox).to.have.attribute('aria-expanded', 'false');
      expect(textbox).not.toHaveFocus();

      fireEvent.mouseDown(textbox);
      fireEvent.click(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'true');
      expect(textbox).toHaveFocus();

      fireEvent.mouseDown(textbox);
      fireEvent.click(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'false');
    });
  });

  describe('listbox wrapping behavior', () => {
    it('wraps around when navigating the list by default', () => {
      const { getAllByRole } = render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      fireEvent.keyDown(textbox, { key: 'ArrowUp' });

      const options = getAllByRole('option');
      expect(textbox).toHaveFocus();
      expect(textbox).to.have.attribute(
        'aria-activedescendant',
        options[options.length - 1].getAttribute('id')!,
      );
    });

    it('selects the first item if on the last item and pressing up by default', () => {
      render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} autoFocus />}
        />,
      );
      const textbox = screen.getByRole('combobox');

      fireEvent.keyDown(textbox, { key: 'ArrowUp' });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });

      const options = screen.getAllByRole('option');
      expect(textbox).toHaveFocus();
      expect(textbox).to.have.attribute('aria-activedescendant', options[0].getAttribute('id')!);
    });

    describe('prop: includeInputInList', () => {
      it('considers the textbox the predessor of the first option when pressing Up', () => {
        render(
          <Autocomplete
            includeInputInList
            open
            options={['one', 'two', 'three']}
            renderInput={(params) => <Input {...params} autoFocus />}
          />,
        );
        const textbox = screen.getByRole('combobox');

        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowUp' });

        expect(textbox).toHaveFocus();
        expect(textbox).not.to.have.attribute('aria-activedescendant');
      });

      it('considers the textbox the successor of the last option when pressing Down', () => {
        render(
          <Autocomplete
            includeInputInList
            open
            options={['one', 'two', 'three']}
            renderInput={(params) => <Input {...params} autoFocus />}
          />,
        );
        const textbox = screen.getByRole('combobox');

        fireEvent.keyDown(textbox, { key: 'ArrowUp' });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });

        expect(textbox).toHaveFocus();
        expect(textbox).not.to.have.attribute('aria-activedescendant');
      });
    });

    describe('prop: disableListWrap', () => {
      it('keeps focus on the first item if focus is on the first item and pressing Up', () => {
        render(
          <Autocomplete
            disableListWrap
            open
            options={['one', 'two', 'three']}
            renderInput={(params) => <Input {...params} autoFocus />}
          />,
        );
        const textbox = screen.getByRole('combobox');

        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowUp' });

        expect(textbox).toHaveFocus();
        expect(textbox).to.have.attribute(
          'aria-activedescendant',
          screen.getAllByRole('option')[0].getAttribute('id')!,
        );
      });

      it('focuses the last item when pressing Up when no option is active', () => {
        render(
          <Autocomplete
            disableListWrap
            open
            options={['one', 'two', 'three']}
            renderInput={(params) => <Input {...params} autoFocus />}
          />,
        );
        const textbox = screen.getByRole('combobox');

        fireEvent.keyDown(textbox, { key: 'ArrowUp' });

        const options = screen.getAllByRole('option');
        expect(textbox).toHaveFocus();
        expect(textbox).to.have.attribute(
          'aria-activedescendant',
          options[options.length - 1].getAttribute('id')!,
        );
      });

      it('keeps focus on the last item if focus is on the last item and pressing Down', () => {
        render(
          <Autocomplete
            disableListWrap
            open
            options={['one', 'two', 'three']}
            renderInput={(params) => <Input {...params} autoFocus />}
          />,
        );
        const textbox = screen.getByRole('combobox');

        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });
        fireEvent.keyDown(textbox, { key: 'ArrowDown' });

        const options = screen.getAllByRole('option');
        expect(textbox).toHaveFocus();
        expect(textbox).to.have.attribute(
          'aria-activedescendant',
          options[options.length - 1].getAttribute('id')!,
        );
      });
    });
  });

  describe('prop: disabled', () => {
    it('should disable the input', () => {
      const { getByRole } = render(
        <Autocomplete
          disabled
          options={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} />}
        />,
      );
      const input = getByRole('combobox');
      expect(input).to.have.property('disabled', true);
    });

    it('should disable the popup button', () => {
      const { queryByTitle } = render(
        <Autocomplete
          disabled
          options={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} />}
        />,
      );
      expect((queryByTitle('Open') as HTMLButtonElement).disabled).to.equal(true);
    });

    it('should not render the clear button', () => {
      const { queryByTitle } = render(
        <Autocomplete
          disabled
          options={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} />}
        />,
      );
      expect(queryByTitle('Clear')).to.equal(null);
    });

    it('should not apply the hasClearIcon class', () => {
      const { container } = render(
        <Autocomplete
          disabled
          options={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} />}
        />,
      );
      expect(container.querySelector(`.${classes.root}`)).not.to.have.class(classes.hasClearIcon);
      expect(container.querySelector(`.${classes.root}`)).to.have.class(classes.hasPopupIcon);
    });

    it('should close the popup when disabled is true', () => {
      const { setProps } = render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} />}
        />,
      );
      const textbox = screen.getByRole('combobox');
      act(() => {
        textbox.focus();
      });
      fireEvent.keyDown(textbox, { key: 'ArrowDown' });
      expect(screen.queryByRole('listbox')).not.to.equal(null);
      setProps({ disabled: true });
      expect(screen.queryByRole('listbox')).to.equal(null);
    });

    it('should not crash when autoSelect & freeSolo are set, text is focused & disabled gets truthy', () => {
      const { setProps } = render(
        <Autocomplete
          autoSelect
          freeSolo
          options={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} />}
          value="one"
        />,
      );
      const textbox = screen.getByRole('combobox');
      act(() => {
        textbox.focus();
      });
      setProps({ disabled: true });
      expect(textbox).toBeVisible();
    });
  });

  describe('prop: disableClearable', () => {
    it('should not render the clear button', () => {
      const { queryByTitle, container } = render(
        <Autocomplete
          disableClearable
          options={['one', 'two', 'three']}
          renderInput={(params) => <Input {...params} />}
        />,
      );
      expect(queryByTitle('Clear')).to.equal(null);
      expect(container.querySelector(`.${classes.root}`)).to.have.class(classes.hasPopupIcon);
      expect(container.querySelector(`.${classes.root}`)).not.to.have.class(classes.hasClearIcon);
    });
  });
});
