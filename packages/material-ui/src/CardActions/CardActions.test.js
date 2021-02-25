import * as React from 'react';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import CardActions from './CardActions';
import classes from './cardActionsClasses';

describe('<CardActions />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<CardActions />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiCardActions',
    testVariantProps: { disableSpacing: true },
    skip: ['componentProp', 'componentsProp'],
  }));
});
