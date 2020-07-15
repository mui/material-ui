import * as React from 'react';
import { DIALOG_WIDTH } from '../../lib/src/constants/dimensions';
import { mountPickerWithState, mountStaticPicker } from '../test-utils';
import { StaticDateTimePicker, MobileDateTimePicker } from '@material-ui/pickers';

describe('<DateTimePicker />', () => {
  it('Renders and show todays date', () => {
    mountStaticPicker(defaultProps => <StaticDateTimePicker {...defaultProps} />);

    cy.contains('2017');
    cy.contains('Oct 7');
    cy.contains('07:36');

    cy.percySnapshot('<DateTimePicker />', {
      widths: [DIALOG_WIDTH],
    });
  });

  it('Proper flow for date & time picking', () => {
    mountPickerWithState(defaultProps => <MobileDateTimePicker openTo="year" {...defaultProps} />);

    cy.get('input').click();

    // Year
    cy.findByText('2015').click();
    cy.get('input').should('have.value', '10/07/2015 07:36 PM');

    // Date
    cy.findByLabelText('next month')
      .click()
      .click();
    cy.findByLabelText('Dec 22, 2015').click();
    cy.get('input').should('have.value', '12/22/2015 07:36 PM');

    // Hour
    cy.findByRole('menu').trigger('mouseup', { buttons: 1, offsetX: 66, offsetY: 157 });
    cy.get('input').should('have.value', '12/22/2015 08:36 PM');

    // Minute
    cy.findByRole('menu').trigger('mouseup', {
      buttons: 1,
      offsetX: 222,
      offsetY: 180,
    });

    cy.get('input').should('have.value', '12/22/2015 08:20 PM');
  });
});
