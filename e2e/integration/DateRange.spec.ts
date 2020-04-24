describe('DateRangePicker', () => {
  beforeEach(() => {
    cy.visit('/regression');
    cy.viewport('macbook-13');
  });

  it('Opens and selecting a range in DateRangePicker', () => {
    cy.get('[data-mui-test="desktop-range-picker"]')
      .first()
      .focus();
    cy.get('[aria-label="Jan 1, 2019"]').click();
    cy.get('[aria-label="Jan 24, 2019"]').click();

    cy.get('[data-mui-test="DateRangeHighlight"]').should('have.length', 24);
  });

  it('Opens and selecting a range on the next month', () => {
    cy.get('[data-mui-test="desktop-range-picker"]')
      .first()
      .focus();

    cy.get('[aria-label="Jan 1, 2019"]').click();
    cy.get('[data-mui-test="next-arrow-button"]')
      .eq(1)
      .click();

    cy.get('[aria-label="Mar 19, 2019"]').click();

    cy.get('[data-mui-test="DateRangeHighlight"]').should('have.length', 47);
  });

  it.skip('Shows range preview on hover', () => {
    cy.get('[data-mui-test="desktop-range-picker"]')
      .first()
      .focus();

    cy.get('[aria-label="Jan 24, 2019"').trigger('mouseover');
  });

  it('Properly handles selection when starting from end', () => {
    cy.get('[data-mui-test="desktop-range-picker"]')
      .first()
      .clear();

    cy.get('[data-mui-test="desktop-range-picker"]')
      .eq(1)
      .focus();

    cy.get('[aria-label="Jan 30, 2019"]')
      .first()
      .click();
    cy.get('[aria-label="Jan 19, 2019"]').click();

    cy.get('[data-mui-test="DateRangeHighlight"]').should('have.length', 12);

    cy.get('[aria-label="Jan 24, 2019"]')
      .first()
      .click();
    cy.get('div[role="tooltip"]').should('not.be.visible');
  });

  it('Allows pure keyboard input control', () => {
    cy.get('[data-mui-test="desktop-range-picker"]')
      .eq(0)
      .clear()
      .type('06/06/2019');

    cy.contains('June 2019');
    cy.contains('July 2019');

    cy.get('[data-mui-test="desktop-range-picker"]')
      .eq(1)
      .focus()
      .clear()
      .type('08/08/2019');

    cy.contains('July 2019');
    cy.contains('August 2019');

    cy.get('[data-mui-test="DateRangeHighlight"]').should('have.length', 39);
  });

  it('Scrolls current month to the active selection on focusing appropriate field', () => {
    cy.get('[data-mui-test="desktop-range-picker"]')
      .first()
      .click();

    cy.get('[aria-label="Jan 19, 2019"]').click();

    cy.get('[data-mui-test="next-arrow-button"]')
      .eq(1)
      .click()
      .click();

    cy.get('[data-mui-test="desktop-range-picker"]')
      .first()
      .click();

    cy.contains('January 2019');
  });

  it('Opens on the current selecting range end', () => {
    cy.get('[data-mui-test="desktop-range-picker"]')
      .first()
      .click();

    cy.get('[aria-label="Jan 19, 2019"]').click();
    cy.get('[data-mui-test="next-arrow-button"]')
      .eq(1)
      .click();

    cy.get('[aria-label="Mar 19, 2019"]').click();

    // reopen picker
    cy.get('[data-mui-test="desktop-range-picker"]')
      .eq(1)
      .click();

    cy.contains('February 2019');
    cy.contains('March 2019');
  });
});
