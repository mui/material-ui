import * as React from 'react';
import { createClientRender, describeConformance } from 'test/utils';
import AlertTitle, { alertTitleClasses as classes } from '@mui/material/AlertTitle';

describe('<AlertTitle />', () => {
  const render = createClientRender();

  describeConformance(<AlertTitle />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiAlertTitle',
    refInstanceof: window.HTMLDivElement,
    testStateOverrides: { styleKey: 'root' },
    skip: ['componentsProp', 'themeVariants', 'themeDefaultProps'],
  }));
});
