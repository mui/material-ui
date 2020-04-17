import * as React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import consoleErrorMock, { consoleWarnMock } from 'test/utils/consoleErrorMock';
import { spy } from 'sinon';
import { createClientRender, fireEvent } from 'test/utils/createClientRender';
import { createFilterOptions } from '../useAutocomplete/useAutocomplete';
import Autocomplete from './Autocomplete';
import TextField from '@material-ui/core/TextField';

describe('<Autocomplete />', () => {
  let mount;
  let classes;
  const render = createClientRender();
  const defaultProps = {
    options: [],
    openOnFocus: true,
  };

  before(() => {
    classes = getClasses(<Autocomplete {...defaultProps} renderInput={() => null} />);
    mount = createMount({ strict: true });
  });

  describeConformance(<Autocomplete {...defaultProps} renderInput={() => null} />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    after: () => mount.cleanUp(),
  }));

  describe('combobox', () => {
    it('should clear the input when blur', () => {
      const { getByRole } = render(
        <Autocomplete {...defaultProps} renderInput={(params) => <TextField {...params} />} />,
      );
      const input = getByRole('textbox');
      input.focus();
      fireEvent.change(document.activeElement, { target: { value: 'a' } });
      expect(input.value).to.equal('a');
      document.activeElement.blur();
      expect(input.value).to.equal('');
    });

    it('should apply the icon classes', () => {
      const { container } = render(
        <Autocomplete {...defaultProps} renderInput={(params) => <TextField {...params} />} />,
      );
      expect(container.querySelector(`.${classes.root}`)).to.have.class(classes.hasClearIcon);
      expect(container.querySelector(`.${classes.root}`)).to.have.class(classes.hasPopupIcon);
    });
  });

  describe('prop: autoHighlight', () => {
    it('should set the focus on the first item', () => {
      const options = ['one', 'two'];
      const { getByRole } = render(
        <Autocomplete
          {...defaultProps}
          freeSolo
          autoHighlight
          options={options}
          renderInput={(params) => <TextField autoFocus {...params} />}
        />,
      );

      function checkHighlightIs(expected) {
        expect(getByRole('listbox').querySelector('li[data-focus]')).to.have.text(expected);
      }

      checkHighlightIs('one');
      fireEvent.change(document.activeElement, { target: { value: 'oo' } });
      fireEvent.change(document.activeElement, { target: { value: 'o' } });
      checkHighlightIs('one');
    });

    it('should set the highlight on selected item when dropdown is expanded', () => {
      const { getByRole, setProps } = render(
        <Autocomplete
          {...defaultProps}
          value="one"
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField autoFocus {...params} />}
        />,
      );

      function checkHighlightIs(expected) {
        expect(getByRole('listbox').querySelector('li[data-focus]')).to.have.text(expected);
      }

      checkHighlightIs('one');
      setProps({ value: 'two' });
      checkHighlightIs('two');
    });

    it('should keep the current highlight if possible', () => {
      const { getByRole } = render(
        <Autocomplete
          {...defaultProps}
          multiple
          defaultValue={['one']}
          options={['one', 'two', 'three']}
          disableCloseOnSelect
          renderInput={(params) => <TextField autoFocus {...params} />}
        />,
      );

      function checkHighlightIs(expected) {
        expect(getByRole('listbox').querySelector('li[data-focus]')).to.have.text(expected);
      }

      checkHighlightIs('one');
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      checkHighlightIs('two');
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      checkHighlightIs('two');
    });
  });

  describe('prop: limitTags', () => {
    it('show all items on focus', () => {
      const { container, getAllByRole, getByRole } = render(
        <Autocomplete
          multiple
          limitTags={2}
          {...defaultProps}
          options={['one', 'two', 'three']}
          defaultValue={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      let tags;
      tags = getAllByRole('button');
      expect(container.textContent).to.equal('onetwo+1');
      expect(tags.length).to.be.equal(4);

      getByRole('textbox').focus();
      tags = getAllByRole('button');
      expect(container.textContent).to.equal('onetwothree');
      expect(tags.length).to.be.equal(5);
    });
  });

  describe('prop: filterSelectedOptions', () => {
    it('when the last item is selected, highlights the new last item', () => {
      const { getByRole } = render(
        <Autocomplete
          {...defaultProps}
          filterSelectedOptions
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      function checkHighlightIs(expected) {
        expect(getByRole('listbox').querySelector('li[data-focus]')).to.have.text(expected);
      }

      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      checkHighlightIs('three');
      fireEvent.keyDown(document.activeElement, { key: 'Enter' }); // selects the last option
      const input = getByRole('textbox');
      input.blur();
      input.focus(); // opens the listbox again
      checkHighlightIs('two');
    });
  });

  describe('prop: autoSelect', () => {
    it('should not clear on blur when value does not match any option', () => {
      const handleChange = spy();
      const options = ['one', 'two'];

      render(
        <Autocomplete
          {...defaultProps}
          freeSolo
          autoSelect
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField autoFocus {...params} />}
        />,
      );
      fireEvent.change(document.activeElement, { target: { value: 'o' } });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.change(document.activeElement, { target: { value: 'oo' } });
      document.activeElement.blur();
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal('oo');
    });

    it('should add new value when autoSelect & multiple on blur', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      render(
        <Autocomplete
          {...defaultProps}
          autoSelect
          multiple
          value={[options[0]]}
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField autoFocus {...params} />}
        />,
      );
      fireEvent.change(document.activeElement, { target: { value: 't' } });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      document.activeElement.blur();
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(options);
    });

    it('should add new value when autoSelect & multiple & freeSolo on blur', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          {...defaultProps}
          autoSelect
          freeSolo
          multiple
          onChange={handleChange}
          renderInput={(params) => <TextField autoFocus {...params} />}
        />,
      );
      fireEvent.change(document.activeElement, { target: { value: 'a' } });
      document.activeElement.blur();
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(['a']);
    });
  });

  describe('prop: multiple', () => {
    it('should not crash', () => {
      const { getByRole } = render(
        <Autocomplete
          {...defaultProps}
          renderInput={(params) => <TextField {...params} />}
          multiple
        />,
      );
      const input = getByRole('textbox');
      input.focus();
      document.activeElement.blur();
      input.focus();
    });

    it('should remove the last option', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      const { container } = render(
        <Autocomplete
          {...defaultProps}
          defaultValue={options}
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
          multiple
        />,
      );
      fireEvent.click(container.querySelectorAll('svg[data-mui-test="CancelIcon"]')[1]);
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([options[0]]);
    });

    it('navigates between different tags', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      const { getByRole } = render(
        <Autocomplete
          {...defaultProps}
          defaultValue={options}
          options={options}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
          multiple
        />,
      );
      fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
      expect(document.activeElement).to.have.text('two');
      fireEvent.keyDown(document.activeElement, { key: 'ArrowLeft' });
      expect(document.activeElement).to.have.text('one');
      fireEvent.keyDown(document.activeElement, { key: 'Backspace' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([options[1]]);
      expect(document.activeElement).to.equal(getByRole('textbox'));
    });
  });

  it('should trigger a form expectedly', () => {
    const handleSubmit = spy();
    const { setProps } = render(
      <Autocomplete
        {...defaultProps}
        options={['one', 'two']}
        onKeyDown={(event) => {
          if (!event.defaultPrevented && event.key === 'Enter') {
            handleSubmit();
          }
        }}
        renderInput={(props2) => <TextField {...props2} autoFocus />}
      />,
    );
    fireEvent.keyDown(document.activeElement, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(1);

    fireEvent.change(document.activeElement, { target: { value: 'o' } });
    fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
    fireEvent.keyDown(document.activeElement, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(1);
    fireEvent.keyDown(document.activeElement, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(2);

    setProps({ key: 'test-2', multiple: true, freeSolo: true });
    fireEvent.change(document.activeElement, { target: { value: 'o' } });
    fireEvent.keyDown(document.activeElement, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(2);
    fireEvent.keyDown(document.activeElement, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(3);

    setProps({ key: 'test-3', freeSolo: true });
    fireEvent.change(document.activeElement, { target: { value: 'o' } });
    fireEvent.keyDown(document.activeElement, { key: 'Enter' });
    expect(handleSubmit.callCount).to.equal(4);
  });

  describe('WAI-ARIA conforming markup', () => {
    specify('when closed', () => {
      const { getAllByRole, getByRole, queryByRole } = render(
        <Autocomplete {...defaultProps} renderInput={(params) => <TextField {...params} />} />,
      );

      const combobox = getByRole('combobox');
      expect(combobox).to.have.attribute('aria-expanded', 'false');
      // reflected aria-haspopup is `listbox`
      // this assertion can fail if the value is `listbox`
      expect(combobox).not.to.have.attribute('aria-haspopup');

      const textbox = getByRole('textbox');
      expect(combobox).to.contain(textbox);
      // reflected aria-multiline has to be false i.e. not present or false
      expect(textbox).not.to.have.attribute('aria-multiline');
      expect(textbox).to.have.attribute('aria-autocomplete', 'list');
      expect(textbox, 'no option is focused when openened').not.to.have.attribute(
        'aria-activedescendant',
      );

      // listbox is not only inaccessible but not in the DOM
      const listbox = queryByRole('listbox', { hidden: true });
      expect(listbox).to.be.null;

      const buttons = getAllByRole('button');
      expect(buttons).to.have.length(2);
      expect(buttons[0]).to.have.accessibleName('Clear');
      expect(buttons[0]).to.have.attribute('title', 'Clear');
      expect(buttons[1]).to.have.accessibleName('Open');
      expect(buttons[1]).to.have.attribute('title', 'Open');
      buttons.forEach((button) => {
        expect(button, 'button is not in tab order').to.have.property('tabIndex', -1);
      });
    });

    specify('when open', () => {
      const { getAllByRole, getByRole } = render(
        <Autocomplete
          {...defaultProps}
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const combobox = getByRole('combobox');
      expect(combobox).to.have.attribute('aria-expanded', 'true');

      const textbox = getByRole('textbox');

      const listbox = getByRole('listbox');
      expect(combobox, 'combobox owns listbox').to.have.attribute(
        'aria-owns',
        listbox.getAttribute('id'),
      );
      expect(textbox).to.have.attribute('aria-controls', listbox.getAttribute('id'));
      expect(textbox, 'no option is focused when openened').not.to.have.attribute(
        'aria-activedescendant',
      );

      const options = getAllByRole('option');
      expect(options).to.have.length(2);
      options.forEach((option) => {
        expect(listbox).to.contain(option);
      });

      const buttons = getAllByRole('button');
      expect(buttons).to.have.length(2);
      expect(buttons[0]).to.have.accessibleName('Clear');
      expect(buttons[0]).to.have.attribute('title', 'Clear');
      expect(buttons[1]).to.have.accessibleName('Close');
      expect(buttons[1]).to.have.attribute('title', 'Close');
      buttons.forEach((button) => {
        expect(button, 'button is not in tab order').to.have.property('tabIndex', -1);
      });
    });

    it('should add and remove aria-activedescendant', () => {
      const { getAllByRole, getByRole, setProps } = render(
        <Autocomplete
          {...defaultProps}
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('textbox');
      expect(textbox, 'no option is focused when openened').not.to.have.attribute(
        'aria-activedescendant',
      );
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

      const options = getAllByRole('option');
      expect(textbox).to.have.attribute('aria-activedescendant', options[0].getAttribute('id'));
      setProps({ open: false });
      expect(textbox, 'no option is focused when openened').not.to.have.attribute(
        'aria-activedescendant',
      );
    });
  });

  describe('when popup closed', () => {
    it('opens when the textbox is focused', () => {
      const handleOpen = spy();
      render(
        <Autocomplete
          {...defaultProps}
          onOpen={handleOpen}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      expect(handleOpen.callCount).to.equal(1);
    });

    it('does not open on clear', () => {
      const handleOpen = spy();
      const handleChange = spy();
      const { container } = render(
        <Autocomplete
          {...defaultProps}
          onOpen={handleOpen}
          onChange={handleChange}
          open={false}
          options={['one', 'two']}
          value="one"
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const clear = container.querySelector('button');
      fireEvent.click(clear);

      expect(handleOpen.callCount).to.equal(0);
      expect(handleChange.callCount).to.equal(1);
    });

    ['ArrowDown', 'ArrowUp'].forEach((key) => {
      it(`opens on ${key} when focus is on the textbox without moving focus`, () => {
        const handleOpen = spy();
        const { getByRole } = render(
          <Autocomplete
            {...defaultProps}
            open={false}
            onOpen={handleOpen}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />,
        );

        fireEvent.keyDown(document.activeElement, { key });

        // first from focus
        expect(handleOpen.callCount).to.equal(2);
        expect(getByRole('textbox')).not.to.have.attribute('aria-activedescendant');
      });
    });

    it('does not clear the textbox on Escape', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          {...defaultProps}
          onChange={handleChange}
          open={false}
          options={['one', 'two']}
          value="one"
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(document.activeElement, { key: 'Escape' });

      expect(handleChange.callCount).to.equal(0);
    });
  });

  describe('prop: clearOnEscape', () => {
    it('should clear on escape', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          {...defaultProps}
          onChange={handleChange}
          clearOnEscape
          multiple
          value={['one']}
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(document.activeElement, { key: 'Escape' });
      fireEvent.keyDown(document.activeElement, { key: 'Escape' });

      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([]);
    });
  });

  describe('when popup open', () => {
    it('closes the popup if Escape is pressed ', () => {
      const handleClose = spy();
      render(
        <Autocomplete
          {...defaultProps}
          onClose={handleClose}
          open
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(document.activeElement, { key: 'Escape' });

      expect(handleClose.callCount).to.equal(1);
    });

    it('moves focus to the first option on ArrowDown', () => {
      const { getAllByRole, getByRole } = render(
        <Autocomplete
          {...defaultProps}
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

      expect(getByRole('textbox')).to.have.attribute(
        'aria-activedescendant',
        getAllByRole('option')[0].getAttribute('id'),
      );
    });

    it('moves focus to the last option on ArrowUp', () => {
      const { getAllByRole, getByRole } = render(
        <Autocomplete
          {...defaultProps}
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

      const options = getAllByRole('option');
      expect(getByRole('textbox')).to.have.attribute(
        'aria-activedescendant',
        options[options.length - 1].getAttribute('id'),
      );
    });
  });

  describe('prop: openOnFocus', () => {
    it('enables open on input focus', () => {
      const { getByRole } = render(
        <Autocomplete
          {...defaultProps}
          options={['one', 'two', 'three']}
          openOnFocus
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('textbox');
      const combobox = getByRole('combobox');

      expect(combobox).to.have.attribute('aria-expanded', 'true');
      expect(textbox).to.have.focus;

      fireEvent.mouseDown(textbox);
      fireEvent.click(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'false');

      document.activeElement.blur();
      expect(combobox).to.have.attribute('aria-expanded', 'false');
      expect(textbox).to.not.have.focus;

      fireEvent.mouseDown(textbox);
      fireEvent.click(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'true');
      expect(textbox).to.have.focus;

      fireEvent.mouseDown(textbox);
      fireEvent.click(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'false');
    });
  });

  describe('wrapping behavior', () => {
    it('wraps around when navigating the list by default', () => {
      const { getAllByRole } = render(
        <Autocomplete
          {...defaultProps}
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

      const options = getAllByRole('option');
      expect(document.activeElement).to.have.focus;
      expect(document.activeElement).to.have.attribute(
        'aria-activedescendant',
        options[options.length - 1].getAttribute('id'),
      );
    });

    it('selects the first item if on the last item and pressing up by default', () => {
      const { getAllByRole } = render(
        <Autocomplete
          {...defaultProps}
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

      const options = getAllByRole('option');
      expect(document.activeElement).to.have.focus;
      expect(document.activeElement).to.have.attribute(
        'aria-activedescendant',
        options[0].getAttribute('id'),
      );
    });

    describe('prop: inlcudeInputInList', () => {
      it('considers the textbox the predessor of the first option when pressing Up', () => {
        render(
          <Autocomplete
            {...defaultProps}
            includeInputInList
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />,
        );
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
        fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

        expect(document.activeElement).to.have.focus;
        expect(document.activeElement).not.to.have.attribute('aria-activedescendant');
      });

      it('considers the textbox the successor of the last option when pressing Down', () => {
        render(
          <Autocomplete
            {...defaultProps}
            includeInputInList
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />,
        );
        fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

        expect(document.activeElement).to.have.focus;
        expect(document.activeElement).not.to.have.attribute('aria-activedescendant');
      });
    });

    describe('prop: disableListWrap', () => {
      it('keeps focus on the first item if focus is on the first item and pressing Up', () => {
        const { getAllByRole } = render(
          <Autocomplete
            {...defaultProps}
            disableListWrap
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />,
        );
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
        fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

        expect(document.activeElement).to.have.focus;
        expect(document.activeElement).to.have.attribute(
          'aria-activedescendant',
          getAllByRole('option')[0].getAttribute('id'),
        );
      });

      it('focuses the last item when pressing Up when no option is active', () => {
        const { getAllByRole, getByRole } = render(
          <Autocomplete
            {...defaultProps}
            disableListWrap
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />,
        );

        fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

        const textbox = getByRole('textbox');
        const options = getAllByRole('option');
        expect(textbox).to.have.focus;
        expect(textbox).to.have.attribute(
          'aria-activedescendant',
          options[options.length - 1].getAttribute('id'),
        );
      });

      it('keeps focus on the last item if focus is on the last item and pressing Down', () => {
        const { getAllByRole, getByRole } = render(
          <Autocomplete
            {...defaultProps}
            disableListWrap
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />,
        );
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

        const textbox = getByRole('textbox');
        const options = getAllByRole('option');
        expect(textbox).to.have.focus;
        expect(textbox).to.have.attribute(
          'aria-activedescendant',
          options[options.length - 1].getAttribute('id'),
        );
      });
    });

    describe('prop: disabled', () => {
      it('should disable the input', () => {
        const { getByRole } = render(
          <Autocomplete
            {...defaultProps}
            disabled
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} />}
          />,
        );
        const input = getByRole('textbox');
        expect(input.disabled).to.be.true;
      });

      it('should disable the popup button', () => {
        const { queryByTitle } = render(
          <Autocomplete
            {...defaultProps}
            disabled
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} />}
          />,
        );
        expect(queryByTitle('Open').disabled).to.be.true;
      });

      it('should not render the clear button', () => {
        const { queryByTitle } = render(
          <Autocomplete
            {...defaultProps}
            disabled
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} />}
          />,
        );
        expect(queryByTitle('Clear')).to.be.null;
      });

      it('should not apply the hasClearIcon class', () => {
        const { container } = render(
          <Autocomplete
            {...defaultProps}
            disabled
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} />}
          />,
        );
        expect(container.querySelector(`.${classes.root}`)).not.to.have.class(classes.hasClearIcon);
        expect(container.querySelector(`.${classes.root}`)).to.have.class(classes.hasPopupIcon);
      });
    });

    describe('prop: disableClearable', () => {
      it('should not render the clear button', () => {
        const { queryByTitle, container } = render(
          <Autocomplete
            {...defaultProps}
            disableClearable
            options={['one', 'two', 'three']}
            renderInput={(params) => <TextField {...params} />}
          />,
        );
        expect(queryByTitle('Clear')).to.be.null;
        expect(container.querySelector(`.${classes.root}`)).to.have.class(classes.hasPopupIcon);
        expect(container.querySelector(`.${classes.root}`)).not.to.have.class(classes.hasClearIcon);
      });
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
      consoleWarnMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
      consoleWarnMock.reset();
    });

    it('warn if getOptionLabel do not return a string', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          {...defaultProps}
          freeSolo
          onChange={handleChange}
          options={[{ name: 'one' }, { name: 'two ' }]}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.change(document.activeElement, { target: { value: 'a' } });
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('a');
      expect(consoleErrorMock.callCount()).to.equal(2); // strict mode renders twice
      expect(consoleErrorMock.messages()[0]).to.include(
        'the `getOptionLabel` method of Autocomplete returned undefined instead of a string',
      );
    });

    it('warn if getOptionSelected match multiple values for a given option', () => {
      const value = [
        { id: '10', text: 'One' },
        { id: '20', text: 'Two' },
      ];
      const options = [
        { id: '10', text: 'One' },
        { id: '20', text: 'Two' },
        { id: '30', text: 'Three' },
      ];

      render(
        <Autocomplete
          {...defaultProps}
          multiple
          options={options}
          value={value}
          getOptionLabel={(option) => option.text}
          getOptionSelected={(option) => value.find((v) => v.id === option.id)}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });

      expect(consoleErrorMock.callCount()).to.equal(1); // strict mode renders twice
      expect(consoleErrorMock.messages()[0]).to.include(
        'The component expects a single value to match a given option but found 2 matches.',
      );
    });

    it('warn if value does not exist in options list', () => {
      const value = 'not a good value';
      const options = ['first option', 'second option'];

      render(
        <Autocomplete
          {...defaultProps}
          value={value}
          options={options}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      expect(consoleWarnMock.callCount()).to.equal(4);
      expect(consoleWarnMock.messages()[0]).to.include(
        'None of the options match with `"not a good value"`',
      );
    });
  });

  describe('prop: options', () => {
    it('should keep focus on selected option and not reset to top option when options updated', () => {
      const { getByRole, setProps } = render(
        <Autocomplete
          {...defaultProps}
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      const listbox = getByRole('listbox');
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' }); // goes to 'one'
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' }); // goes to 'two'

      function checkHighlightIs(expected) {
        expect(listbox.querySelector('li[data-focus]')).to.have.text(expected);
      }

      checkHighlightIs('two');

      // three option is added and autocomplete re-renders, two should still be highlighted
      setProps({ options: ['one', 'two', 'three'] });
      checkHighlightIs('two');

      // user presses down, three should be highlighted
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      checkHighlightIs('three');
    });

    it('should not select undefined ', () => {
      const handleChange = spy();
      const { getByRole } = render(
        <Autocomplete
          {...defaultProps}
          onChange={handleChange}
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const input = getByRole('textbox');
      fireEvent.click(input);

      const listbox = getByRole('listbox');
      const firstOption = listbox.querySelector('li');
      fireEvent.click(firstOption);

      expect(handleChange.args[0][1]).to.equal('one');
    });
  });

  describe('enter', () => {
    it('select a single value when enter is pressed', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          {...defaultProps}
          onChange={handleChange}
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('one');
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
    });

    it('select multiple value when enter is pressed', () => {
      const handleChange = spy();
      const options = [{ name: 'one' }, { name: 'two ' }];
      render(
        <Autocomplete
          {...defaultProps}
          multiple
          onChange={handleChange}
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([options[0]]);
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
    });
  });

  describe('prop: autoComplete', () => {
    it('add a completion string', () => {
      render(
        <Autocomplete
          {...defaultProps}
          autoComplete
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.change(document.activeElement, { target: { value: 'O' } });
      expect(document.activeElement.value).to.equal('O');
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      expect(document.activeElement.value).to.equal('one');
      expect(document.activeElement.selectionStart).to.equal(1);
      expect(document.activeElement.selectionEnd).to.equal(3);
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(document.activeElement.value).to.equal('one');
      expect(document.activeElement.selectionStart).to.equal(3);
      expect(document.activeElement.selectionEnd).to.equal(3);
    });
  });

  describe('click input', () => {
    it('toggles if empty', () => {
      const { getByRole } = render(
        <Autocomplete
          {...defaultProps}
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const textbox = getByRole('textbox');
      const combobox = getByRole('combobox');
      expect(combobox).to.have.attribute('aria-expanded', 'false');
      fireEvent.mouseDown(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'true');
      fireEvent.mouseDown(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'false');
    });

    it('selects all the first time', () => {
      const { getByRole } = render(
        <Autocomplete
          {...defaultProps}
          value="one"
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );
      const textbox = getByRole('textbox');
      fireEvent.click(textbox);
      expect(textbox.selectionStart).to.equal(0);
      expect(textbox.selectionEnd).to.equal(3);
    });

    it('should focus the input when clicking on the open action', () => {
      const { getByRole, queryByTitle } = render(
        <Autocomplete
          {...defaultProps}
          value="one"
          options={['one', 'two']}
          renderInput={(params) => <TextField {...params} />}
        />,
      );

      const textbox = getByRole('textbox');
      fireEvent.click(textbox);
      expect(textbox).to.have.focus;
      textbox.blur();

      fireEvent.click(queryByTitle('Open'));
      expect(textbox).to.have.focus;
    });
  });

  describe('controlled', () => {
    it('controls the input value', () => {
      const handleChange = spy();
      function MyComponent() {
        const [, setInputValue] = React.useState('');
        const handleInputChange = (event, value) => {
          handleChange(value);
          setInputValue(value);
        };
        return (
          <Autocomplete
            {...defaultProps}
            inputValue=""
            onInputChange={handleInputChange}
            renderInput={(params) => <TextField {...params} autoFocus />}
          />
        );
      }

      render(<MyComponent />);

      expect(handleChange.callCount).to.equal(0);
      fireEvent.change(document.activeElement, { target: { value: 'a' } });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][0]).to.equal('a');
      expect(document.activeElement.value).to.equal('');
    });

    it('should fire the input change event before the change event', () => {
      const handleChange = spy();
      const handleInputChange = spy();
      render(
        <Autocomplete
          {...defaultProps}
          onChange={handleChange}
          onInputChange={handleInputChange}
          options={['foo']}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(handleInputChange.calledBefore(handleChange)).to.equal(true);
    });
  });

  describe('prop: filterOptions', () => {
    it('should ignore object keys by default', () => {
      const { queryAllByRole } = render(
        <Autocomplete
          {...defaultProps}
          options={[
            {
              value: 'one',
              label: 'One',
            },
            {
              value: 'two',
              label: 'Two',
            },
          ]}
          getOptionLabel={(option) => option.label}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      let options;
      options = queryAllByRole('option');
      expect(options.length).to.equal(2);

      fireEvent.change(document.activeElement, { target: { value: 'value' } });
      options = queryAllByRole('option');
      expect(options.length).to.equal(0);

      fireEvent.change(document.activeElement, { target: { value: 'one' } });
      options = queryAllByRole('option');
      expect(options.length).to.equal(1);
    });

    it('limits the amount of rendered options when `limit` is set in `createFilterOptions`', () => {
      const filterOptions = createFilterOptions({ limit: 2 });
      const { queryAllByRole } = render(
        <Autocomplete
          {...defaultProps}
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
          filterOptions={filterOptions}
        />,
      );
      expect(queryAllByRole('option').length).to.equal(2);
    });

    it('does not limit the amount of rendered options when `limit` is not set in `createFilterOptions`', () => {
      const filterOptions = createFilterOptions({});
      const { queryAllByRole } = render(
        <Autocomplete
          {...defaultProps}
          options={['one', 'two', 'three']}
          renderInput={(params) => <TextField {...params} autoFocus />}
          filterOptions={filterOptions}
        />,
      );
      expect(queryAllByRole('option').length).to.equal(3);
    });
  });

  describe('prop: freeSolo', () => {
    it('pressing twice enter should not call onChange listener twice', () => {
      const handleChange = spy();
      const options = [{ name: 'foo' }];
      render(
        <Autocomplete
          {...defaultProps}
          freeSolo
          onChange={handleChange}
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(options[0]);
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
    });

    it('should not delete exiting tag when try to add it twice', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      const { container } = render(
        <Autocomplete
          {...defaultProps}
          defaultValue={options}
          options={options}
          onChange={handleChange}
          freeSolo
          renderInput={(params) => <TextField {...params} autoFocus />}
          multiple
        />,
      );
      fireEvent.change(document.activeElement, { target: { value: 'three' } });
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(container.querySelectorAll('[class*="MuiChip-root"]')).to.have.length(3);
      fireEvent.change(document.activeElement, { target: { value: 'three' } });
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(container.querySelectorAll('[class*="MuiChip-root"]')).to.have.length(3);
    });

    it('should not fire change event until the IME is confirmed', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          {...defaultProps}
          freeSolo
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      // Actual behavior when "あ" (Japanese) is entered on macOS/Safari with IME
      fireEvent.change(document.activeElement, { target: { value: 'あ' } });
      fireEvent.keyDown(document.activeElement, { key: 'Enter', keyCode: 229 });
      expect(handleChange.callCount).to.equal(0);
      fireEvent.keyDown(document.activeElement, { key: 'Enter', keyCode: 13 });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('あ');
    });
  });

  describe('prop: onChange', () => {
    it('provides a reason and details on option creation', () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      render(
        <Autocomplete
          freeSolo
          onChange={handleChange}
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.change(document.activeElement, { target: { value: options[2] } });
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(options[2]);
      expect(handleChange.args[0][2]).to.equal('create-option');
      expect(handleChange.args[0][3]).to.deep.equal({ option: options[2] });
    });

    it('provides a reason and details on option selection', () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      render(
        <Autocomplete
          onChange={handleChange}
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(options[0]);
      expect(handleChange.args[0][2]).to.equal('select-option');
      expect(handleChange.args[0][3]).to.deep.equal({ option: options[0] });
    });

    it('provides a reason and details on option removing', () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      render(
        <Autocomplete
          multiple
          onChange={handleChange}
          value={options}
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.keyDown(document.activeElement, { key: 'Backspace' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(options.slice(0, 2));
      expect(handleChange.args[0][2]).to.equal('remove-option');
      expect(handleChange.args[0][3]).to.deep.equal({ option: options[2] });
    });

    it('provides a reason and details on blur', () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      render(
        <Autocomplete
          autoSelect
          onChange={handleChange}
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      document.activeElement.blur();
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal(options[0]);
      expect(handleChange.args[0][2]).to.equal('blur');
      expect(handleChange.args[0][3]).to.deep.equal({ option: options[0] });
    });

    it('provides a reason and details on clear', () => {
      const handleChange = spy();
      const options = ['one', 'two', 'three'];
      const { container } = render(
        <Autocomplete
          multiple
          value={options}
          onChange={handleChange}
          options={options}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );

      const button = container.querySelector('button');
      fireEvent.click(button);
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([]);
      expect(handleChange.args[0][2]).to.equal('clear');
      expect(handleChange.args[0][3]).to.equal(undefined);
    });
  });

  describe('prop: onInputChange', () => {
    it('provides a reason on input change', () => {
      const handleInputChange = spy();
      const options = [{ name: 'foo' }];
      render(
        <Autocomplete
          {...defaultProps}
          onInputChange={handleInputChange}
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.change(document.activeElement, { target: { value: 'a' } });
      expect(handleInputChange.callCount).to.equal(1);
      expect(handleInputChange.args[0][1]).to.equal('a');
      expect(handleInputChange.args[0][2]).to.equal('input');
    });

    it('provides a reason on select reset', () => {
      const handleInputChange = spy();
      const options = [{ name: 'foo' }];
      render(
        <Autocomplete
          {...defaultProps}
          onInputChange={handleInputChange}
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(handleInputChange.callCount).to.equal(1);
      expect(handleInputChange.args[0][1]).to.equal(options[0].name);
      expect(handleInputChange.args[0][2]).to.equal('reset');
    });
  });

  describe('prop: blurOnSelect', () => {
    it('[blurOnSelect=true] should blur the input when clicking or touching options', () => {
      const options = [{ name: 'foo' }];
      const { getByRole, queryByTitle } = render(
        <Autocomplete
          {...defaultProps}
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
          blurOnSelect
        />,
      );
      const textbox = getByRole('textbox');
      let firstOption = getByRole('option');
      expect(textbox).to.have.focus;
      fireEvent.click(firstOption);
      expect(textbox).to.not.have.focus;

      fireEvent.click(queryByTitle('Open'));
      expect(textbox).to.have.focus;
      firstOption = getByRole('option');
      fireEvent.touchStart(firstOption);
      fireEvent.click(firstOption);
      expect(textbox).to.not.have.focus;
    });

    it('[blurOnSelect="touch"] should only blur the input when an option is touched', () => {
      const options = [{ name: 'foo' }];
      const { getByRole, queryByTitle } = render(
        <Autocomplete
          {...defaultProps}
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
          blurOnSelect="touch"
        />,
      );
      const textbox = getByRole('textbox');
      let firstOption = getByRole('option');
      fireEvent.click(firstOption);
      expect(textbox).to.have.focus;

      fireEvent.click(queryByTitle('Open'));
      firstOption = getByRole('option');
      fireEvent.touchStart(firstOption);
      fireEvent.click(firstOption);
      expect(textbox).to.not.have.focus;
    });

    it('[blurOnSelect="mouse"] should only blur the input when an option is clicked', () => {
      const options = [{ name: 'foo' }];
      const { getByRole, queryByTitle } = render(
        <Autocomplete
          {...defaultProps}
          options={options}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} autoFocus />}
          blurOnSelect="mouse"
        />,
      );
      const textbox = getByRole('textbox');
      let firstOption = getByRole('option');
      fireEvent.touchStart(firstOption);
      fireEvent.click(firstOption);
      expect(textbox).to.have.focus;

      fireEvent.click(queryByTitle('Open'));
      firstOption = getByRole('option');
      fireEvent.click(firstOption);
      expect(textbox).to.not.have.focus;
    });
  });

  describe('prop: getOptionLabel', () => {
    it('is considered for falsy values when filtering the the list of options', () => {
      const { getAllByRole } = render(
        <Autocomplete
          {...defaultProps}
          options={[0, 10, 20]}
          getOptionLabel={(option) => (option === 0 ? 'Any' : option.toString())}
          renderInput={(params) => <TextField {...params} autoFocus />}
          value={0}
        />,
      );

      const options = getAllByRole('option');
      expect(options).to.have.length(3);
    });

    it('is not considered for nullish values when filtering the list of options', () => {
      const { getAllByRole } = render(
        <Autocomplete
          {...defaultProps}
          options={[null, 10, 20]}
          getOptionLabel={(option) => (option === null ? 'Any' : option.toString())}
          renderInput={(params) => <TextField {...params} autoFocus />}
          value={null}
        />,
      );

      const options = getAllByRole('option');
      expect(options).to.have.length(3);
    });
  });

  describe('prop: groupBy', () => {
    it('correctly groups options and preserves option order in each group', () => {
      const data = [
        { group: 1, value: 'A' },
        { group: 2, value: 'D' },
        { group: 2, value: 'E' },
        { group: 1, value: 'B' },
        { group: 3, value: 'G' },
        { group: 2, value: 'F' },
        { group: 1, value: 'C' },
      ];
      const { getAllByRole } = render(
        <Autocomplete
          {...defaultProps}
          options={data}
          getOptionLabel={(option) => option.value}
          renderInput={(params) => <TextField {...params} autoFocus />}
          open
          groupBy={(option) => option.group}
        />,
      );

      const options = getAllByRole('option').map((el) => el.textContent);
      expect(options).to.have.length(7);
      expect(options).to.deep.equal(['A', 'B', 'C', 'D', 'E', 'F', 'G']);
    });
  });
});
