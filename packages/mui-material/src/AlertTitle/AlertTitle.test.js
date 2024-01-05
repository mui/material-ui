import * as React from 'react';
import { createRenderer, describeConformance } from '@mui-internal/test-utils';
import AlertTitle, { alertTitleClasses as classes } from '@mui/material/AlertTitle';
import Typography from '@mui/material/Typography';

describe('<AlertTitle />', () => {
  const { render } = createRenderer();

  describeConformance(<AlertTitle />, () => ({
    classes,
    inheritComponent: Typography,
    render,
    muiName: 'MuiAlertTitle',
    refInstanceof: window.HTMLDivElement,
    testStateOverrides: { styleKey: 'root' },
    skip: ['componentsProp', 'themeVariants', 'themeDefaultProps'],
  }));
});
