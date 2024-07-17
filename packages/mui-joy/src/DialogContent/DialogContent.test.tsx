import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import DialogContent, { dialogContentClasses as classes } from '@mui/joy/DialogContent';
import describeConformance from '../../test/describeConformance';

describe('<DialogContent />', () => {
  const { render } = createRenderer();

  describeConformance(<DialogContent />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyDialogContent',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    skip: ['classesRoot', 'componentsProp', 'themeVariants'],
    slots: {
      root: {
        expectedClassName: classes.root,
      },
    },
  }));
});
