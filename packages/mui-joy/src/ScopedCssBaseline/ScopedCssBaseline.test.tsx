import * as React from 'react';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import ScopedCssBaseline, { scopedCssBaselineClasses as classes } from '@mui/joy/ScopedCssBaseline';

describe('<ScopedCssBaseline />', () => {
  const { render } = createRenderer();

  describeConformance(<ScopedCssBaseline />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyScopedCssBaseline',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    testVariantProps: { disableColorScheme: true },
    skip: ['classesRoot', 'componentsProp'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));
});
