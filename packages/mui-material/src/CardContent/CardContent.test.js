import * as React from 'react';
import { createRenderer, describeConformance } from 'test/utils';
import CardContent, { cardContentClasses as classes } from '@mui/material/CardContent';

describe('<CardContent />', () => {
  const { render } = createRenderer();

  describeConformance(<CardContent />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiCardContent',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentsProp', 'themeVariants'],
    testComponentPropWith: 'span',
  }));
});
