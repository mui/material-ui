const ids = {
  basic: '#basic-datepicker',
  clearable: '#clearable-datepicker',
  maskedKeyboard: '#keyboard-mask-datepicker',
};

describe('DatePicker', () => {
  before(() => {
    cy.visit('/regression');
  });

  context('Mobile DatePicker', () => {
    it('Should open date picker on 01-01-2018', () => {
      cy.get(`input${ids.basic}`).should('have.value', '2019/01/01');

      cy.get(ids.basic).click({ force: true });
      cy.get('[data-day="21/01/2019"]').click();

      cy.get('h4').should('have.text', 'Mon, Jan 21');
    });

    it('Should close datepicker and accept value', () => {
      cy.get('button')
        .contains('OK')
        .click();

      cy.get(`input${ids.basic}`).should('have.value', '2019/01/21');
      cy.get(`input${ids.clearable}`).should('have.value', '2019/01/21');
    });

    it('Should change the value to the next month', () => {
      cy.get(ids.basic).click({ force: true });
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
      cy.get(`input${ids.basic}`).should('have.value', '2019/02/11');
    });

    it('Should open mobile keyboard input by clicking on button', () => {
      cy.get(ids.clearable).click({ force: true });
      cy.get('[data-mui-test="toggle-mobile-keyboard-view"]').click();

      cy.get('[data-mui-test="mobile-wrapper-dialog"] [data-mui-test="keyboard-date-input"] input')
        .should('have.value', '2019/02/11')
        .clear()
        .type('2019/03/02');

      cy.get('[data-mui-test="picker-toolbar"]').contains('Sat, Mar 2');
      cy.get('[data-mui-test="toggle-mobile-keyboard-view"]').click();

      cy.get('[data-mui-test="day"].MuiPickersDay-daySelected').contains('2');
    });

    it('Should clear the input by clear button', () => {
      cy.get(ids.clearable).click({ force: true });

      cy.get('button')
        .contains('Clear')
        .click();
      cy.get(`input${ids.clearable}`).should('have.value', '');
    });
  });

  context('Desktop DatePicker', () => {
    it('Should not accept invalid date format', () => {
      cy.get(ids.maskedKeyboard)
        .clear()
        .type('01');
      cy.get(`${ids.maskedKeyboard}-helper-text`).should('have.text', 'Invalid Date Format');

      cy.get(ids.maskedKeyboard).clear();
    });

    it('Should clear mask input when removing all text', () => {
      cy.get(ids.maskedKeyboard).clear();

      cy.get(`${ids.maskedKeyboard}-helper-text`).should('not.be.visible');
    });

    it('Should clear mask input when removing symbols one by one', () => {
      cy.get(ids.maskedKeyboard).type('1{backspace}');

      cy.get(`${ids.maskedKeyboard}-helper-text`).should('not.be.visible');
    });

    it('Should accept date entered from keyboard', () => {
      cy.get(ids.maskedKeyboard)
        .clear()
        .type('04/01/2019')
        .blur();

      cy.get(`input${ids.basic}`).should('have.value', '2019/04/01');
    });

    it('Should open calendar by the keyboard icon', () => {
      cy.get('.keyboard-btn')
        .first()
        .click();
      cy.get(`[data-day="19/04/2019"]`).click();

      cy.get(ids.maskedKeyboard).should('have.value', '04/19/2019');
    });

    it('Should not open disabled and readonly datepickers', () => {
      ['#disabled', '#readonly'].forEach(id => {
        cy.get(id).click({ force: true });
        cy.get('div[role=dialog]').should('not.be.visible');
      });
    });
  });
});
