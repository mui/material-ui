import * as React from 'react';
import { createRenderer, describeConformance } from 'test/utils';
import { ThemeProvider } from '@mui/joy/styles';
import CardCover, { cardCoverClasses as classes } from '@mui/joy/CardCover';

describe('<CardCover />', () => {
  const { render } = createRenderer();

  describeConformance(<CardCover />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    ThemeProvider,
    muiName: 'MuiCardCover',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    testVariantProps: { variant: 'contained' },
    skip: ['classesRoot', 'componentsProp'],
  }));
});
