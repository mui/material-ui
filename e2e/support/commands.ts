import '@percy/cypress';

declare global {
  namespace Cypress {
    interface Chainable {
      toggleTheme: typeof toggleTheme;
    }
  }
}

function toggleTheme(options?: Partial<Cypress.ClickOptions>) {
  cy.get('[data-mui-test=toggle-theme-btn]').click(options);
}

Cypress.Commands.add('toggleTheme', toggleTheme);
