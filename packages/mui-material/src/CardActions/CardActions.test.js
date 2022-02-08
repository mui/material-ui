import * as React from 'react';
import { createRenderer, describeConformance } from 'test/utils';
import CardActions, { cardActionsClasses as classes } from '@mui/material/CardActions';

describe('<CardActions />', () => {
  const { render } = createRenderer();

  describeConformance(<CardActions />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiCardActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp', 'componentsProp'],
  }));
});
