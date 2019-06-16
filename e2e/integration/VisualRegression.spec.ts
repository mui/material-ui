describe('Visual Regression', () => {
  const pages = [
    {
      url: '/',
      name: 'Landing',
      withDarkTheme: true,
    },
    {
      url: '/localization/date-fns',
      name: 'Date-fns localization',
    },
    {
      url: '/demo/datepicker',
      name: 'DatePicker demo',
      withDarkTheme: true,
      scenarios: {
        'Opened datepicker': () => {
          cy.get('[data-test-id=datepicker-example]')
            .find('input')
            .first()
            .click();
        },
      },
    },
    {
      url: '/demo/timepicker',
      name: 'TimePicker demo',
      withDarkTheme: true,
      scenarios: {
        'Opened timepicker': () => {
          cy.get('input')
            .first()
            .click();
        },
      },
    },
    {
      url: '/demo/datetime-picker',
      name: 'DateTimePicker demo',
      withDarkTheme: true,
      scenarios: {
        'Opened datetimepicker': () => {
          cy.get('input')
            .first()
            .click();
        },
      },
    },
    {
      url: '/guides/css-overrides',
      name: 'Css overrides',
      scenarios: {
        'Custom material-ui theme': () => {
          cy.get('[data-test-id=css-override]')
            .find('input')
            .click();
        },
      },
    },
  ];

  pages.forEach(page => {
    context(page.name, () => {
      before(() => {
        const now = new Date(2019, 1, 1);
        cy.clock(now.getTime());

        cy.visit(page.url);
      });

      it(`Displays ${page.name} page`, () => {
        cy.percySnapshot(page.name);
      });

      if (page.withDarkTheme) {
        it(`Displays ${page.name} page in dark theme`, () => {
          cy.toggleTheme();
          cy.percySnapshot(`Dark ${page.name}`);
          cy.toggleTheme();
        });
      }

      if (page.scenarios) {
        Object.entries(page.scenarios).forEach(([name, execute]) => {
          it(`${page.name} scenario: ${name}`, () => {
            execute!();
            cy.percySnapshot(`${page.name}: ${name}`);
          });

          if (page.withDarkTheme) {
            it(`${page.name} scenario: ${name} in dark theme`, () => {
              cy.toggleTheme({ force: true });
              cy.percySnapshot(`Dark ${page.name}: ${name}`);
              cy.toggleTheme({ force: true });
            });
          }
        });
      }
    });
  });
});
