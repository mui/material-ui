const ids = {
  basic: '#basic-datepicker',
  clearable: '#clearable-datepicker',
  maskedKeyboard: '#keyboard-mask-datepicker',
};

describe('DatePicker', () => {
  before(() => {
    cy.visit('/regression');
  });

  it('Should open date picker on 01-01-2018', () => {
    cy.get(`input${ids.basic}`).should('have.value', 'January 1');

    cy.get(ids.basic).click();
    cy.get('[data-day="21/01/2019"]').click();

    cy.get('h4').should('have.text', 'Mon, Jan 21');
  });

  it('Should close datepicker and accept value', () => {
    cy.get('button')
      .contains('OK')
      .click();

    cy.get(`input${ids.basic}`).should('have.value', 'January 21');
    cy.get(`input${ids.clearable}`).should('have.value', 'January 21');
  });

  it('Should change the value to the next month', () => {
    cy.get(ids.basic).click();
    // return back in 2 month
    cy.get('svg[data-arrow="left"]')
      .click()
      .click();
    // go to the next month
    cy.get('svg[data-arrow="right"]')
      .click()
      .click()
      .click();

    cy.get('[data-day="11/02/2019"]').click();
    cy.get('h4').should('have.text', 'Mon, Feb 11');

    cy.get('button')
      .contains('OK')
      .click();
    cy.get(`input${ids.basic}`).should('have.value', 'February 11');
  });

  it('Should clear the input by clear button', () => {
    cy.get(ids.clearable).click();

    cy.get('button')
      .contains('Clear')
      .click();
    cy.get(`input${ids.clearable}`).should('have.value', '');
  });

  it('Should not accept invalid date format', () => {
    cy.get(ids.maskedKeyboard)
      .clear()
      .type('01');
    cy.get(`${ids.maskedKeyboard}-helper-text`).should('have.text', 'Invalid Date Format');

    cy.get(ids.maskedKeyboard).clear();
  });

  it('Should accept date entered from keyboard', () => {
    cy.get(ids.maskedKeyboard)
      .clear()
      .type('03/02/2019')
      .blur();

    cy.get(`input${ids.basic}`).should('have.value', 'March 2');
  });

  it('Should open calendar by the keyboard icon', () => {
    cy.get('.keyboard-btn')
      .first()
      .click();
    cy.get(`[data-day="19/03/2019"]`).click();
    cy.get('button')
      .contains('OK')
      .click();

    cy.get(ids.maskedKeyboard).should('have.value', '03/19/2019');
  });
});
