const ids = {
  basic: '#basic-datepicker',
  clearable: '#clearable-datepicker',
  keyboard: '#keyboard-datepicker',
  maskedKeyboard: '#keyboard-mask-datepicker',
};

describe('DatePicker', () => {
  before(() => {
    cy.visit('/regression');
  });

  it('Should open date picker on 01-01-2018', () => {
    cy.get(`input${ids.basic}`).should('have.value', 'January 1st');

    cy.get(ids.basic).click();
    cy.get('[data-day="21/01/2019"]').click();

    cy.get('h4').should('have.text', 'Mon, Jan 21');
  });

  it('Should close datepicker and accept value', () => {
    cy.get('button')
      .contains('OK')
      .click();

    cy.get(`input${ids.basic}`).should('have.value', 'January 21st');
    cy.get(`input${ids.clearable}`).should('have.value', 'January 21st');
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
    cy.get(`input${ids.basic}`).should('have.value', 'February 11th');
  });

  it('Should clear the input by clear button', () => {
    cy.get(ids.clearable).click();

    cy.get('button')
      .contains('Clear')
      .click();
    cy.get(`input${ids.clearable}`).should('have.value', '');
  });

  it('Should not accept invalid date format', () => {
    cy.get(ids.keyboard).type('Januar');
    cy.get(`${ids.keyboard}-helper-text`).should('have.text', 'Invalid Date Format');

    cy.get(ids.keyboard).clear();
  });

  it('Should accept date entered from keyboard', () => {
    cy.get(ids.keyboard).type('January 27');
    cy.get(`${ids.keyboard}-helper-text`).should('not.have.text', 'Invalid Date Format');

    cy.get(ids.keyboard).blur();

    cy.get(`input${ids.basic}`).should('have.value', 'January 27th');
    cy.get(`input${ids.clearable}`).should('have.value', 'January 27th');
  });

  it('Should accept date entered from keyboard', () => {
    cy.get(ids.maskedKeyboard)
      .clear()
      .type('03/02/2019')
      .blur();

    cy.get(`input${ids.basic}`).should('have.value', 'March 2nd');
  });

  it('Should open calendar by the keyboard icon', () => {
    cy.get('.keyboard-btn')
      .first()
      .click();
    cy.get(`[data-day="19/03/2019"]`).click();
    cy.get('button')
      .contains('OK')
      .click();

    cy.get(ids.keyboard).should('have.value', 'March 19th');
  });
});
