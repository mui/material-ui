import * as React from 'react';
import { mountPicker, mountPickerWithState } from '../test-utils';
import { DesktopDatePicker, MobileDatePicker, TimePicker } from '@material-ui/pickers';

describe('Keyboard navigation', () => {
  context('DatePicker', () => {
    function testCalendarKeyboardNavigation() {
      cy.get('body').type('{rightarrow}');
      cy.findByLabelText('Oct 8, 2017').should('be.focused');

      cy.get('body').type('{leftarrow}');
      cy.findByLabelText('Oct 7, 2017').should('be.focused');

      // check month switching
      cy.get('body').type('{uparrow}');
      cy.findByLabelText('Sep 30, 2017').should('be.focused');

      cy.get('body').type('{downarrow}{downarrow}');
      cy.findByLabelText('Oct 14, 2017').should('be.focused');

      cy.get('body').type('{home}');
      cy.findByLabelText('Oct 8, 2017').should('be.focused');

      cy.get('body').type('{end}');
      cy.findByLabelText('Oct 14, 2017').should('be.focused');
    }

    it('Modal calendar allows to change date with keyboard', () => {
      mountPicker((props) => <MobileDatePicker {...props} open />);

      testCalendarKeyboardNavigation();
    });

    it('Popover calendar allows to change date with keyboard', () => {
      mountPicker((props) => <DesktopDatePicker {...props} open />);

      testCalendarKeyboardNavigation();
    });

    it('Allows to select full date with only keyboard', () => {
      mountPickerWithState((props) => <DesktopDatePicker {...props} />);

      cy.findByLabelText('Choose date, selected date is Oct 7, 2017').click();

      // should be tested by tab, but cypress still not support native `.tab()`
      // @see https://github.com/cypress-io/cypress/issues/299
      cy.findByLabelText('calendar view is open, switch to year view').click();

      cy.get('body').type('{downarrow}{leftarrow}{rightarrow}{rightarrow}');
      cy.focused().type(' ');

      cy.get('body').type('{downarrow}{downarrow}{enter}');
      cy.get('input').should('have.value', '10/21/2022');
    });

    it("Doesn't allow to select disabled date from keyboard", () => {
      mountPickerWithState((props) => <DesktopDatePicker {...props} />);

      cy.get('input').clear().type('01/02/1900');

      cy.findByLabelText('Choose date, selected date is Jan 2, 1900').click();
      cy.get('body').type('{leftarrow}');

      cy.findByLabelText('Jan 1, 1900').should('be.focused');
      cy.get('body').type('{leftarrow}{leftarrow}{uparrow}');

      // doesn't switch month and leaves focus on the same day
      cy.contains('January');
      cy.findByLabelText('Jan 1, 1900').should('be.focused');
    });
  });

  // TODO fix on CI
  context.skip('TimePicker', () => {
    it('Allows keyboard control on hours view', () => {
      mountPickerWithState((props) => <TimePicker {...props} open />);

      cy.get('body').type('{uparrow}{downarrow}{uparrow}{uparrow}{uparrow}');

      cy.get('[aria-label="1 hours"]').should('be.focused');
      cy.findByLabelText('Selected time 1:36 AM').should('exist');
    });

    it('Allows keyboard control on minutes view', () => {
      mountPickerWithState((props) => <TimePicker {...props} />);
      cy.findByLabelText('Choose time, selected time is 10:36 PM').click();

      cy.focused().type('{enter}', { force: true });
      cy.findByLabelText('Selected time 10:36 PM').should('exist');

      cy.focused().type(Array(15).fill('{downarrow}').join(''), { force: true });

      cy.get('body').type('{enter}');
      cy.get('input').should('have.value', '10:25 PM');
    });
  });
});
