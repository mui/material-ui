import { stringToTestId } from '../../docs/utils/helpers';
import { navItems } from '../../docs/layout/components/navigationMap';

describe('App navigation', () => {
  before(() => {
    cy.visit('/getting-started/installation');
  });

  navItems.forEach(navItem => {
    context(navItem.title, () => {
      beforeEach(() => {
        cy.get(`[data-nav=${stringToTestId(navItem.title)}]`).as('nav-group');
        cy.get('@nav-group').click();
      });

      navItem.children &&
        navItem.children.forEach((leafItem: any) => {
          it(`Opens ${leafItem.title} page`, () => {
            cy.get('@nav-group')
              .find(`[data-nav=${stringToTestId(leafItem.title)}]`)
              .click();

            cy.url().should('contain', leafItem.as || leafItem.href);
          });
        });
    });
  });
});
