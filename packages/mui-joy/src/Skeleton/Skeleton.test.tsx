import * as React from 'react';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import Skeleton, { skeletonClasses as classes } from '@mui/joy/Skeleton';

describe('<Skeleton />', () => {
  const { render } = createRenderer();

  describeConformance(<Skeleton />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'JoySkeleton',
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
