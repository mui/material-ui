import * as React from 'react';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import AlertTitle, { alertTitleClasses as classes } from '@material-ui/core/AlertTitle';

describe('<AlertTitle />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<AlertTitle />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    mount,
    muiName: 'MuiAlertTitle',
    refInstanceof: window.HTMLDivElement,
    testStateOverrides: { styleKey: 'root' },
    skip: ['componentsProp', 'themeVariants', 'themeDefaultProps'],
  }));
});
