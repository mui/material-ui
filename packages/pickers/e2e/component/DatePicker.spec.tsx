import * as React from 'react';
import { mountStaticPicker } from '../test-utils';
import { StaticDatePicker } from '@material-ui/pickers';

describe('<DatePicker />', () => {
  it('Renders and show todays date', () => {
    mountStaticPicker((defaultProps) => <StaticDatePicker {...defaultProps} />);

    cy.findByTestId('datepicker-toolbar-date').contains('Sat, Oct 7');
  });

  it('Switches between months', () => {
    mountStaticPicker((defaultProps) => <StaticDatePicker {...defaultProps} />);

    cy.findByTestId('calendar-month-text').contains('October');

    cy.findByTestId('previous-arrow-button').click().click();
    cy.findByTestId('next-arrow-button').click().click().click();

    cy.wait(350);

    cy.findByTestId('calendar-month-text').contains('November');
  });
});
