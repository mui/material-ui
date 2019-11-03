import React from 'react';
import { expect } from 'chai';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
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
});
