const ids = {
  basic: '#basic-datepicker',
  clearable: '#clearable-datepicker',
  maskedKeyboard: '#keyboard-mask-datepicker',
  notMaskedKeyboard: '#keyboard-invalid-mask-datepicker',
};

describe('DatePicker', () => {
  beforeEach(() => {
    cy.visit('/regression');
  });

  context('Mobile DatePicker', () => {
    beforeEach(() => {
      cy.get(`input${ids.basic}`).should('have.value', '01/01/2019');

      cy.get(ids.basic).click({ force: true });
      cy.get('[data-day="21/01/2019"]').click();
    });

    it('Should open date picker on 01-01-2018', () => {
      cy.get('h4').should('have.text', 'Mon, Jan 21');
    });

    it('Should close datepicker and accept value', () => {
      cy.get('button')
        .contains('OK')
        .click();

      cy.get(`input${ids.basic}`).should('have.value', '01/21/2019');
      cy.get(`input${ids.clearable}`).should('have.value', '01/21/2019');
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
      cy.get(`input${ids.basic}`).should('have.value', '02/11/2019');
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
      cy.get(`${ids.maskedKeyboard}`).should('have.attr', 'aria-invalid', 'true');

      cy.get(ids.maskedKeyboard).clear();
    });

    it('Should clear mask input when removing all text', () => {
      cy.get(ids.maskedKeyboard).clear();

      cy.get(`${ids.maskedKeyboard}`).should('have.attr', 'aria-invalid', 'false');
    });

    it('Should clear mask input when removing symbols one by one', () => {
      cy.get(ids.maskedKeyboard).clear();
      cy.get(ids.maskedKeyboard).type('1{backspace}');

      cy.get(`${ids.maskedKeyboard}`).should('have.attr', 'aria-invalid', 'false');
    });

    it('Should accept date entered from keyboard', () => {
      cy.get(ids.maskedKeyboard)
        .clear()
        .type('04/01/2019')
        .blur();

      cy.get(`input${ids.basic}`).should('have.value', '04/01/2019');
    });

    it('Should open calendar by the keyboard icon', () => {
      cy.get('[data-mui-test="open-picker-from-keyboard"]')
        .first()
        .click();
      cy.get(`[data-day="19/01/2019"]`).click();

      cy.get(ids.maskedKeyboard).should('have.value', '01/19/2019');
    });

    it('Should not open disabled and readonly datepickers', () => {
      ['#disabled', '#readonly'].forEach(id => {
        cy.get(id).click({ force: true });
        cy.get('div[role=dialog]').should('not.be.visible');
      });
    });
  });

  context('Input mask', () => {
    it('Correctly input value to the masked input', () => {
      cy.get(ids.maskedKeyboard)
        .clear()
        .should('have.value', '');
      cy.get(`${ids.maskedKeyboard}-helper-text`).should('have.text', 'mm/dd/yyyy');
      cy.get(ids.maskedKeyboard)
        .type('011')
        .should('have.value', '01/1');

      cy.get(ids.maskedKeyboard)
        .type('02019')
        .should('have.value', '01/10/2019');
    });

    it('Shows placeholder if no mask provided', () => {
      cy.get(ids.maskedKeyboard).clear();
      cy.get(ids.maskedKeyboard)
        .invoke('attr', 'placeholder')
        .should('contain', 'mm/dd/yyyy');
    });

    it('Allows to enter anything to the not masked input', () => {
      cy.get(ids.notMaskedKeyboard)
        .clear()
        .type('any text')
        .should('have.value', 'any text');

      cy.get(ids.notMaskedKeyboard).should('have.attr', 'aria-invalid', 'true');
    });

    it('Correctly parses date string in not masked input', () => {
      cy.get(ids.notMaskedKeyboard)
        .clear()
        .type('01/10/2019');

      cy.get(ids.notMaskedKeyboard).should('have.attr', 'aria-invalid', 'false');
    });
  });
});
