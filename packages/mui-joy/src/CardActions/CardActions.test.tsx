import * as React from 'react';
import { createRenderer } from '@mui/internal-test-utils';
import { ThemeProvider } from '@mui/joy/styles';
import CardActions, { cardActionsClasses as classes } from '@mui/joy/CardActions';
import describeConformance from '../../test/describeConformance';

describe('<CardActions />', () => {
  const { render } = createRenderer();

  describeConformance(<CardActions />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoyCardActions',
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
