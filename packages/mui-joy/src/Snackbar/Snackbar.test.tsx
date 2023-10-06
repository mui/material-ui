import * as React from 'react';
import { describeConformance, createRenderer } from '@mui-internal/test-utils';
import Snackbar, { snackbarClasses as classes } from '@mui/joy/Snackbar';
import { ThemeProvider } from '@mui/joy/styles';

describe('Joy <Snackbar />', () => {
  const { render } = createRenderer();

  describeConformance(
    <Snackbar open startDecorator="icon" endDecorator="icon">
      Hello World!
    </Snackbar>,
    () => ({
      render,
      classes,
      ThemeProvider,
      muiName: 'JoySnackbar',
      refInstanceof: window.HTMLDivElement,
      testVariantProps: { variant: 'solid' },
      slots: {
        root: { expectedClassName: classes.root },
        startDecorator: { expectedClassName: classes.startDecorator },
        endDecorator: { expectedClassName: classes.endDecorator },
      },
      skip: ['propsSpread', 'componentsProp', 'classesRoot'],
    }),
  );
});
