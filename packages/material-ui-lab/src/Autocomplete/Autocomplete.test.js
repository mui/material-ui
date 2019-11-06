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
  const render = createClientRender({ strict: true });

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
      fireEvent.change(input, { target: { value: 'a' } });
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

      // popup is not only inaccessible but not in the DOM
      const popup = queryByRole('listbox', { hidden: true });
      expect(popup).to.be.null;

      const buttons = getAllByRole('button');
      expect(buttons).to.have.length(2);
      // TODO: computeAccessibleName
      expect(buttons[0]).to.have.attribute('title', 'Clear');
      // TODO: computeAccessibleName
      expect(buttons[1]).to.have.attribute('title', 'Open popup');
      buttons.forEach(button => {
        expect(button, 'button is not in tab order').to.have.property('tabIndex', -1);
      });
    });

    specify('when open', () => {
      const { getAllByRole, getByRole } = render(
        <Autocomplete
          open
          options={['one', 'two  ']}
          renderInput={params => <TextField {...params} />}
        />,
      );

      const combobox = getByRole('combobox');
      expect(combobox).to.have.attribute('aria-expanded', 'true');

      const textbox = getByRole('textbox');

      const popup = getByRole('listbox');
      expect(combobox, 'combobox owns listbox').to.have.attribute(
        'aria-owns',
        popup.getAttribute('id'),
      );
      expect(textbox).to.have.attribute('aria-controls', popup.getAttribute('id'));
      expect(textbox, 'no option is focused when openened').not.to.have.attribute(
        'aria-activedescendant',
      );

      const options = getAllByRole('option');
      expect(options).to.have.length(2);
      options.forEach(option => {
        expect(popup).to.contain(option);
      });

      const buttons = getAllByRole('button');
      expect(buttons).to.have.length(2);
      // TODO: computeAccessibleName
      expect(buttons[0]).to.have.attribute('title', 'Clear');
      // TODO: computeAccessibleName
      expect(buttons[1]).to.have.attribute('title', 'Close popup');
      buttons.forEach(button => {
        expect(button, 'button is not in tab order').to.have.property('tabIndex', -1);
      });
    });
  });

  describe('when popup closed', () => {
    it('opens when the textbox is focused', () => {
      const handleOpen = spy();
      render(
        <Autocomplete
          onOpen={handleOpen}
          renderInput={params => <TextField autoFocus {...params} />}
        />,
      );

      expect(handleOpen.callCount).to.equal(1);
    });

    ['ArrowDown', 'ArrowUp'].forEach(key => {
      it(`opens on ${key} when focus is on the textbox without moving focus`, () => {
        const handleOpen = spy();
        const { getByRole } = render(
          <Autocomplete
            open={false}
            onOpen={handleOpen}
            renderInput={params => <TextField autoFocus {...params} />}
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
          renderInput={params => <TextField autoFocus {...params} />}
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
          options={['one', 'two  ']}
          renderInput={params => <TextField autoFocus {...params} />}
        />,
      );

      fireEvent.keyDown(document.activeElement, { key: 'Escape' });

      expect(handleClose.callCount).to.equal(1);
    });

    it('moves focus to the first option on ArrowDown', () => {
      const { getAllByRole, getByRole } = render(
        <Autocomplete
          options={['one', 'two  ']}
          renderInput={params => <TextField autoFocus {...params} />}
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
          options={['one', 'two  ']}
          renderInput={params => <TextField autoFocus {...params} />}
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

  describe('wrapping behavior', () => {
    it('wraps around when navigating the list by default', () => {
      const { getAllByRole, getByRole } = render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={params => <TextField autoFocus {...params} />}
        />,
      );
      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

      const textbox = getByRole('textbox');
      const options = getAllByRole('option');
      expect(textbox).to.be.focused;
      expect(textbox).to.have.attribute(
        'aria-activedescendant',
        options[options.length - 1].getAttribute('id'),
      );
    });

    it('selects the first item if on the last item and pressing up by default', () => {
      const { getAllByRole, getByRole } = render(
        <Autocomplete
          options={['one', 'two', 'three']}
          renderInput={params => <TextField autoFocus {...params} />}
        />,
      );
      fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

      fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

      const options = getAllByRole('option');
      const textbox = getByRole('textbox');
      expect(textbox).to.be.focused;
      expect(textbox).to.have.attribute('aria-activedescendant', options[0].getAttribute('id'));
    });

    describe('prop: inlcudeInputInList', () => {
      it('considers the textbox the predessor of the first option when pressing Up', () => {
        const { getByRole } = render(
          <Autocomplete
            includeInputInList
            options={['one', 'two', 'three']}
            renderInput={params => <TextField autoFocus {...params} />}
          />,
        );
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

        fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

        const textbox = getByRole('textbox');
        expect(textbox).to.be.focused;
        expect(textbox).not.to.have.attribute('aria-activedescendant');
      });

      it('considers the textbox the successor of the last option when pressing Down', () => {
        const { getByRole } = render(
          <Autocomplete
            includeInputInList
            options={['one', 'two', 'three']}
            renderInput={params => <TextField autoFocus {...params} />}
          />,
        );
        fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

        const textbox = getByRole('textbox');
        expect(textbox).to.be.focused;
        expect(textbox).not.to.have.attribute('aria-activedescendant');
      });
    });

    describe('prop: disableListWrap', () => {
      it('keeps focus on the first item if focus is on the first item and pressing Up', () => {
        const { getAllByRole, getByRole } = render(
          <Autocomplete
            disableListWrap
            options={['one', 'two', 'three']}
            renderInput={params => <TextField autoFocus {...params} />}
          />,
        );
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

        fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

        const textbox = getByRole('textbox');
        expect(textbox).to.be.focused;
        expect(textbox).to.have.attribute(
          'aria-activedescendant',
          getAllByRole('option')[0].getAttribute('id'),
        );
      });

      it('focuses the last item when pressing Up when no option is active', () => {
        const { getAllByRole, getByRole } = render(
          <Autocomplete
            disableListWrap
            options={['one', 'two', 'three']}
            renderInput={params => <TextField autoFocus {...params} />}
          />,
        );

        fireEvent.keyDown(document.activeElement, { key: 'ArrowUp' });

        const textbox = getByRole('textbox');
        const options = getAllByRole('option');
        expect(textbox).to.be.focused;
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
            renderInput={params => <TextField autoFocus {...params} />}
          />,
        );
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });
        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

        fireEvent.keyDown(document.activeElement, { key: 'ArrowDown' });

        const textbox = getByRole('textbox');
        const options = getAllByRole('option');
        expect(textbox).to.be.focused;
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
        expect(queryByTitle('Open popup').disabled).to.be.true;
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
      const { container } = render(
        <Autocomplete
          freeSolo
          onChange={handleChange}
          options={[{ name: 'one' }, { name: 'two ' }]}
          getOptionLabel={option => option.name}
          renderInput={params => <TextField {...params} />}
        />,
      );
      const input = container.querySelector('input');
      fireEvent.change(input, { target: { value: 'a' } });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('a');
      expect(consoleErrorMock.callCount()).to.equal(2); // strict mode renders twice
      expect(consoleErrorMock.args()[0][0]).to.include(
        'For the input option: "a", `getOptionLabel` returns: undefined',
      );
    });
  });

  describe('enter', () => {
    it('select a single value when enter is pressed', () => {
      const handleChange = spy();
      const { container } = render(
        <Autocomplete
          onChange={handleChange}
          options={['one', 'two  ']}
          renderInput={params => <TextField {...params} />}
        />,
      );
      const input = container.querySelector('input');
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.equal('one');
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
    });

    it('select multiple value when enter is pressed', () => {
      const handleChange = spy();
      const options = [{ name: 'one' }, { name: 'two ' }];
      const { container } = render(
        <Autocomplete
          multiple
          onChange={handleChange}
          options={options}
          getOptionLabel={option => option.name}
          renderInput={params => <TextField {...params} />}
        />,
      );
      const input = container.querySelector('input');
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'ArrowDown' });
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
      expect(handleChange.args[0][1]).to.deep.equal([options[0]]);
      fireEvent.keyDown(input, { key: 'Enter' });
      expect(handleChange.callCount).to.equal(1);
    });
  });
});
