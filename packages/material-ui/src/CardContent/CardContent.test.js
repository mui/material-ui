import * as React from 'react';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import CardContent from './CardContent';
import classes from './cardContentClasses';

describe('<CardContent />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<CardContent />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    mount,
    muiName: 'MuiCardContent',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentsProp', 'themeVariants'],
    testComponentPropWith: 'span',
  }));
});
