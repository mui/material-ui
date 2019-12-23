import React from 'react';
import { DatePicker } from '../../src';
import { mountPicker } from '../support/commands';

describe('Demo', () => {
  it('Just testing cypress inline', () => {
    mountPicker(props => <DatePicker variant="static" id="wtf" {...props} />);

    cy.get('[data-mui-test="previous-month"]').click();
    cy.contains('Sun, Dec 8');
  });
});
