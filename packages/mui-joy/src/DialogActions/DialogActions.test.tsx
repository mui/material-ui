import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import DialogActions, { dialogActionsClasses as classes } from '@mui/joy/DialogActions';
import describeConformance from '../../test/describeConformance';

describe('<DialogActions />', () => {
  const { render } = createRenderer();

  describeConformance(<DialogActions />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyDialogActions',
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
