import '@percy/cypress';

/* eslint-disable */
declare global {
  namespace Cypress {
    interface Chainable {
      toggleTheme: typeof toggleTheme;
    }
  }
}
/* eslint-enable */

function toggleTheme(options?: Partial<Cypress.ClickOptions>) {
  cy.get('[data-testid=toggle-theme-btn]').click(options);
}

Cypress.Commands.add('toggleTheme', toggleTheme);
