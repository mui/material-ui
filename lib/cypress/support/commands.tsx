// WIP, wait for https://github.com/cypress-io/cypress/pull/5923
import * as React from 'react';
import ReactDOM from 'react-dom';
import DateFnsUtils from '@date-io/date-fns';
import { Paper, Grid } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '../../src/MuiPickersUtilsProvider';

const stylesCache = new Map();

function copyComponentStyles(component: React.ReactElement) {
  // need to find same component when component is recompiled
  // by the JSX preprocessor. Thus have to use something else,
  // like component name
  const parentDocument = window.parent.document;
  // @ts-ignore
  const specDocument = parentDocument.querySelector('iframe.spec-iframe').contentDocument;
  // @ts-ignore
  const appDocument = parentDocument.querySelector('iframe.aut-iframe').contentDocument;
  // @ts-ignore
  const hash = component.type.name;
  let styles = specDocument.querySelectorAll('head > *');
  if (styles.length) {
    cy.log(`injected ${styles.length} style(s)`);
    stylesCache.set(hash, styles);
  } else {
    cy.log('No styles injected for this component, checking cache');
    if (stylesCache.has(hash)) {
      styles = stylesCache.get(hash);
    } else {
      styles = null;
    }
  }
  if (!styles) {
    return;
  }
  const head = appDocument.querySelector('head');
  styles.forEach((style: any) => {
    head.appendChild(style);
  });
}

interface StateProps {
  value: Date | null;
  onChange: (date: Date | null) => void;
}

export function mountPicker(
  renderProp: (props: StateProps) => React.ReactElement,
  alias = 'Picker'
) {
  // @ts-ignore
  const document = cy.state('document');
  document.write(`
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <div id="cypress-jsdom"></div>
    <script>
      if (window.parent !== window) {
        window['__REACT_DEVTOOLS_GLOBAL_HOOK__'] = window.parent['__REACT_DEVTOOLS_GLOBAL_HOOK__'];
      }
    </script>
  </body>`);

  cy.get('#cypress-jsdom', { log: false });

  const WrappedReactComponent = () => {
    const [value, setDate] = React.useState(new Date('2019-12-08T14:49:27.622Z') as Date | null);

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid justify="center" container>
          <Paper>{renderProp({ value, onChange: date => setDate(date) })}</Paper>
        </Grid>
      </MuiPickersUtilsProvider>
    );
  };

  const ReactElement = <WrappedReactComponent />;
  const component = ReactDOM.render(ReactElement, document.getElementById('cypress-jsdom'));

  cy.wrap(component, { log: false }).as(alias);
  copyComponentStyles(ReactElement);
}
