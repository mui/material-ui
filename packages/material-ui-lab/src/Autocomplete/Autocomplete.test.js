import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import consoleErrorMock from 'test/utils/consoleErrorMock';
import { spy } from 'sinon';
import { createClientRender, fireEvent } from 'test/utils/createClientRender';
import Autocomplete from './Autocomplete';
import TextField from '@material-ui/core/TextField';

describe('<Autocomplete />', () => {
  let mount;
  let classes;
  const render = createClientRender();

  before(() => {
    classes = getClasses(<Autocomplete renderInput={() => null} />);
    mount = createMount({ strict: true });
  });

  describeConformance(<Autocomplete renderInput={() => null} />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'div',
    after: () => mount.cleanUp(),
  }));

  describe('combobox', () => {
    it('should clear the input when blur', () => {
      const { container } = render(
        <Autocomplete renderInput={params => <TextField {...params} />} />,
      );
      const input = container.querySelector('input');
      input.focus();
      fireEvent.change(document.activeElement, { target: { value: 'a' } });
      expect(input.value).to.equal('a');
      document.activeElement.blur();
      expect(input.value).to.equal('');
    });
  });

  describe('multiple', () => {
    it('should not crash', () => {
      const { container } = render(
        <Autocomplete renderInput={params => <TextField {...params} />} multiple />,
      );
      const input = container.querySelector('input');
      input.focus();
      document.activeElement.blur();
      input.focus();
    });

    it('should remove the last option', () => {
      const handleChange = spy();
      const options = ['one', 'two'];
      const { container } = render(
        <Autocomplete
          defaultValue={options}
          options={options}
          onChange={handleChange}
          renderInput={params => <TextField {...params} />}
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
          defaultValue={options}
          options={options}
          onChange={handleChange}
          renderInput={params => <TextField {...params} autoFocus />}
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

  describe('WAI-ARIA conforming markup', () => {
    specify('when closed', () => {
      const { getAllByRole, getByRole, queryByRole } = render(
        <Autocomplete renderInput={params => <TextField {...params} />} />,
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
      buttons.forEach(button => {
        expect(button, 'button is not in tab order').to.have.property('tabIndex', -1);
      });
    });

    specify('when open', () => {
      const { getAllByRole, getByRole } = render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={params => <TextField {...params} />}
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
      options.forEach(option => {
        expect(listbox).to.contain(option);
      });

      const buttons = getAllByRole('button');
      expect(buttons).to.have.length(2);
      expect(buttons[0]).to.have.accessibleName('Clear');
      expect(buttons[0]).to.have.attribute('title', 'Clear');
      expect(buttons[1]).to.have.accessibleName('Close');
      expect(buttons[1]).to.have.attribute('title', 'Close');
      buttons.forEach(button => {
        expect(button, 'button is not in tab order').to.have.property('tabIndex', -1);
      });
    });

    it('should add and remove aria-activedescendant', () => {
      const { getAllByRole, getByRole, setProps } = render(
        <Autocomplete
          open
          options={['one', 'two']}
          renderInput={params => <TextField {...params} autoFocus />}
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
          onOpen={handleOpen}
          renderInput={params => <TextField {...params} autoFocus />}
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
          renderInput={params => <TextField {...params} />}
        />,
      );

      const clear = container.querySelector('button');
      fireEvent.click(clear);

      expect(handleOpen.callCount).to.equal(0);
      expect(handleChange.callCount).to.equal(1);
    });

    ['ArrowDown', 'ArrowUp'].forEach(key => {
      it(`opens on ${key} when focus is on the textbox without moving focus`, () => {
        const handleOpen = spy();
        const { getByRole } = render(
          <Autocomplete
            open={false}
            onOpen={handleOpen}
            renderInput={params => <TextField {...params} autoFocus />}
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
          onChange={handleChange}
          open={false}
          options={['one', 'two']}
          value="one"
          renderInput={params => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(document.activeElement, { key: 'Escape' });

      expect(handleChange.callCount).to.equal(0);
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
          renderInput={params => <TextField {...params} autoFocus />}
        />,
      );

      fireEvent.keyDown(document.activeElement, { key: 'Escape' });

      expect(handleClose.callCount).to.equal(1);
    });

    it('moves focus to the first option on ArrowDown', () => {
      const { getAllByRole, getByRole } = render(
        <Autocomplete
          options={['one', 'two']}
          renderInput={params => <TextField {...params} autoFocus />}
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
          options={['one', 'two']}
          renderInput={params => <TextField {...params} autoFocus />}
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

  describe('prop: disableOpenOnFocus', () => {
    it('disables open on input focus', () => {
      const { getByRole } = render(
        <Autocomplete
          options={['one', 'two', 'three']}
          disableOpenOnFocus
          renderInput={params => <TextField {...params} autoFocus />}
        />,
      );
      const textbox = getByRole('textbox');
      const combobox = getByRole('combobox');

      expect(combobox).to.have.attribute('aria-expanded', 'false');
      expect(textbox).to.have.focus;

      fireEvent.mouseDown(textbox);
      fireEvent.click(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'true');

      document.activeElement.blur();
      expect(combobox).to.have.attribute('aria-expanded', 'false');
      expect(textbox).to.not.have.focus;

      fireEvent.mouseDown(textbox);
      fireEvent.click(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'false');
      expect(textbox).to.have.focus;

      fireEvent.mouseDown(textbox);
      fireEvent.click(textbox);
      expect(combobox).to.have.attribute('aria-expanded', 'true');
    });
  });

  describe('wrapping behavior', () => {
    it('wraps around when navigating the list by default', () => {
      const { getAllByRole } = render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={params => <TextField {...params} autoFocus />}
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
          options={['one', 'two', 'three']}
          renderInput={params => <TextField {...params} autoFocus />}
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
            includeInputInList
            options={['one', 'two', 'three']}
            renderInput={params => <TextField {...params} autoFocus />}
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
            includeInputInList
            options={['one', 'two', 'three']}
            renderInput={params => <TextField {...params} autoFocus />}
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
            disableListWrap
            options={['one', 'two', 'three']}
            renderInput={params => <TextField {...params} autoFocus />}
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
            disableListWrap
            options={['one', 'two', 'three']}
            renderInput={params => <TextField {...params} autoFocus />}
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
            disableListWrap
            options={['one', 'two', 'three']}
            renderInput={params => <TextField {...params} autoFocus />}
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
        const { container } = render(
          <Autocomplete
            disabled
            options={['one', 'two', 'three']}
            renderInput={params => <TextField {...params} />}
          />,
        );
        expect(container.querySelector('input').disabled).to.be.true;
      });

      it('should disable the popup button', () => {
        const { queryByTitle } = render(
          <Autocomplete
            disabled
            options={['one', 'two', 'three']}
            renderInput={params => <TextField {...params} />}
          />,
        );
        expect(queryByTitle('Open').disabled).to.be.true;
      });

      it('should not render the clear button', () => {
        const { queryByTitle } = render(
          <Autocomplete
            disabled
            options={['one', 'two', 'three']}
            renderInput={params => <TextField {...params} />}
          />,
        );
        expect(queryByTitle('Clear')).to.be.null;
      });
    });
  });

  describe('warnings', () => {
    beforeEach(() => {
      consoleErrorMock.spy();
    });

    afterEach(() => {
      consoleErrorMock.reset();
    });

    it('warn if getOptionLabel do not return a string', () => {
      const handleChange = spy();
      render(
        <Autocomplete
          freeSolo
          onChange={handleChange}
          options={[{ name: 'one' }, { name: 'two ' }]}
          getOptionLabel={option => option.name}
          renderInput={params => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.change(document.activeElement, { target: { value: 'a' } });
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('a');
      expect(consoleErrorMock.callCount()).to.equal(2); // strict mode renders twice
      expect(consoleErrorMock.args()[0][0]).to.include(
        'For the input option: "a", `getOptionLabel` returns: undefined',
      );
    });
  });

  describe('prop: options', () => {
    it('should keep focus on selected option and not reset to top option when options updated', () => {
      const { getByRole, setProps } = render(
        <Autocomplete
          options={['one', 'two']}
          renderInput={params => <TextField {...params} autoFocus />}
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
      const { container, getByRole } = render(
        <Autocomplete
          onChange={handleChange}
          options={['one', 'two']}
          renderInput={params => <TextField {...params} />}
        />,
      );
      const input = container.querySelector('input');
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
          onChange={handleChange}
          options={['one', 'two']}
          renderInput={params => <TextField {...params} autoFocus />}
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
          multiple
          onChange={handleChange}
          options={options}
          getOptionLabel={option => option.name}
          renderInput={params => <TextField {...params} autoFocus />}
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
          autoComplete
          options={['one', 'two']}
          renderInput={params => <TextField {...params} autoFocus />}
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
        <Autocomplete options={['one', 'two']} renderInput={params => <TextField {...params} />} />,
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
          value="one"
          options={['one', 'two']}
          renderInput={params => <TextField {...params} />}
        />,
      );
      const textbox = getByRole('textbox');
      fireEvent.click(textbox);
      expect(textbox.selectionStart).to.equal(0);
      expect(textbox.selectionEnd).to.equal(3);
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
            inputValue=""
            onInputChange={handleInputChange}
            renderInput={params => <TextField {...params} autoFocus />}
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
          onChange={handleChange}
          onInputChange={handleInputChange}
          options={['foo']}
          renderInput={params => <TextField {...params} autoFocus />}
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
          getOptionLabel={option => option.label}
          renderInput={params => <TextField {...params} autoFocus />}
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
  });

  describe('prop: freeSolo', () => {
    it('pressing twice enter should not call onChange listener twice', () => {
      const handleChange = spy();
      const options = [{ name: 'foo' }];
      render(
        <Autocomplete
          freeSolo
          onChange={handleChange}
          options={options}
          getOptionLabel={option => option.name}
          renderInput={params => <TextField {...params} autoFocus />}
        />,
      );
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal(options[0]);
      fireEvent.keyDown(document.activeElement, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
    });
  });

  describe('prop: onInputChange', () => {
    it('provides a reason on input change', () => {
      const handleInputChange = spy();
      const options = [{ name: 'foo' }];
      render(
        <Autocomplete
          onInputChange={handleInputChange}
          options={options}
          getOptionLabel={option => option.name}
          renderInput={params => <TextField {...params} autoFocus />}
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
          onInputChange={handleInputChange}
          options={options}
          getOptionLabel={option => option.name}
          renderInput={params => <TextField {...params} autoFocus />}
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
          options={options}
          getOptionLabel={option => option.name}
          renderInput={params => <TextField {...params} autoFocus />}
          blurOnSelect
        />,
      );
      const textbox = getByRole('textbox');
      let firstOption = getByRole('option');
      expect(textbox).to.have.focus;
      fireEvent.click(firstOption);
      expect(textbox).to.not.have.focus;

      const opener = queryByTitle('Open');
      fireEvent.click(opener);
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
          options={options}
          getOptionLabel={option => option.name}
          renderInput={params => <TextField {...params} autoFocus />}
          blurOnSelect="touch"
        />,
      );
      const textbox = getByRole('textbox');
      let firstOption = getByRole('option');
      fireEvent.click(firstOption);
      expect(textbox).to.have.focus;

      const opener = queryByTitle('Open');
      fireEvent.click(opener);
      firstOption = getByRole('option');
      fireEvent.touchStart(firstOption);
      fireEvent.click(firstOption);
      expect(textbox).to.not.have.focus;
    });

    it('[blurOnSelect="mouse"] should only blur the input when an option is clicked', () => {
      const options = [{ name: 'foo' }];
      const { getByRole, queryByTitle } = render(
        <Autocomplete
          options={options}
          getOptionLabel={option => option.name}
          renderInput={params => <TextField {...params} autoFocus />}
          blurOnSelect="mouse"
        />,
      );
      const textbox = getByRole('textbox');
      let firstOption = getByRole('option');
      fireEvent.touchStart(firstOption);
      fireEvent.click(firstOption);
      expect(textbox).to.have.focus;

      const opener = queryByTitle('Open');
      fireEvent.click(opener);
      firstOption = getByRole('option');
      fireEvent.click(firstOption);
      expect(textbox).to.not.have.focus;
    });
  });
});
