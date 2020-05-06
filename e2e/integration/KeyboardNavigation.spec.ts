describe('Keyboard navigation', () => {
  beforeEach(() => {
    cy.visit('/regression');
  });

  context('DatePicker', () => {
    function testCalendarKeyboardNavigation() {
      cy.get('body').type('{rightarrow}');
      cy.get('[data-mui-test="day"][aria-label="Jan 2, 2019"]').should('be.focused');

      cy.get('body').type('{leftarrow}');
      cy.get('[data-mui-test="day"][aria-label="Jan 1, 2019"]').should('be.focused');

      // check month switching
      cy.get('body').type('{leftarrow}');
      cy.get('[data-mui-test="day"][aria-label="Dec 31, 2018"]').should('be.focused');

      cy.get('body').type('{uparrow}');
      cy.get('[data-mui-test="day"][aria-label="Dec 24, 2018"]').should('be.focused');

      cy.get('body').type('{downarrow}{downarrow}');
      cy.get('[data-mui-test="day"][aria-label="Jan 7, 2019"]').should('be.focused');

      cy.get('body').type('{home}');
      cy.get('[data-mui-test="day"][aria-label="Jan 6, 2019"]').should('be.focused');

      cy.get('body').type('{end}');
      cy.get('[data-mui-test="day"][aria-label="Jan 12, 2019"]').should('be.focused');
    }

    it('Modal calendar allows to change date with keyboard', () => {
      cy.get('#basic-datepicker')
        .focus()
        .type(' ', { force: true });

      testCalendarKeyboardNavigation();
    });

    it('Popover calendar allows to change date with keyboard', () => {
      cy.get('[data-mui-test="open-picker-from-keyboard"]')
        .eq(1)
        .type(' ', { force: true });

      testCalendarKeyboardNavigation();
    });

    it('Submits chosen date from keyboard and closing picker', () => {
      cy.get('#basic-datepicker').click({ force: true });

      cy.get('body').type('{downarrow}');
      cy.focused().type('{enter}');

      cy.get('div[role="dialog"]').should('not.be.visible');
      cy.get('#basic-datepicker').should('have.value', '01/08/2019');
    });

    it("Doesn't allow to select disabled date from keyboard", () => {
      cy.get('#keyboard-mask-datepicker')
        .clear()
        .type('01/02/1900');
      cy.get('[data-mui-test="open-picker-from-keyboard"]')
        .eq(1)
        .click();

      cy.get('body').type('{leftarrow}');

      cy.get('[data-mui-test="day"][aria-label="Jan 1, 1900"]').should('be.focused');
      cy.get('body').type('{leftarrow}');

      // doesn't switch month and leaves focus on the same day
      cy.contains('January');
      cy.get('[data-mui-test="day"][aria-label="Jan 1, 1900"]').should('be.focused');
    });

    it('Allows to navigate in year selection with only keyboard', () => {
      cy.get('#keyboard-mask-datepicker')
        .clear()
        .type('01/01/2090');
      cy.get('[data-mui-test="open-picker-from-keyboard"]')
        .eq(1)
        .type(' ', { force: true });

      cy.get('[aria-label="calendar view is open, switch to year view"]').click();
      cy.get('body').type('{downarrow}{downarrow}');

      cy.contains('2098')
        .find('h6')
        .should('be.focused');
      cy.get('body').type('{leftarrow}');
      cy.contains('2097')
        .find('h6')
        .should('be.focused');
      cy.get('body').type('{rightarrow}');
      cy.contains('2098')
        .find('h6')
        .should('be.focused');
    });

    it("Doesn't allow to select disabled year from keyboard", () => {
      cy.get('#keyboard-mask-datepicker')
        .clear()
        .type('01/01/2090');
      cy.get('[data-mui-test="open-picker-from-keyboard"]')
        .eq(1)
        .type(' ', { force: true });

      cy.get('[aria-label="calendar view is open, switch to year view"]').click();
      cy.get('body').type('{downarrow}{downarrow}');

      cy.contains('2098')
        .find('h6')
        .should('be.focused');
      cy.get('body').type('{downarrow}{downarrow}');

      // it doesn't focus days outside the range
      cy.contains('2098')
        .find('h6')
        .should('be.focused');
    });
  });

  context('TimePicker', () => {
    it('Allows keyboard control on hours view', () => {
      cy.get('#mobile-timepicker').click({ force: true });
      cy.get('body').type('{uparrow}{downarrow}{uparrow}{uparrow}{uparrow}');

      cy.get('[aria-label="3 hours"]').should('be.focused');
      cy.contains('03:00');
    });

    it('Allows keyboard control on minutes view', () => {
      cy.get('#mobile-timepicker').click({ force: true });

      cy.focused().type('{enter}');
      cy.contains('12:00');

      cy.focused().type(
        Array(15)
          .fill('{downarrow}')
          .join('')
      );
      cy.contains('11:45');
      cy.focused().type(' ');

      cy.get('div[role="dialog"]').should('not.be.visible');
      cy.get('#mobile-timepicker').should('have.value', '11:45 PM');
    });
  });
});
