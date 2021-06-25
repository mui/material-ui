import * as React from 'react';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import CardContent, { cardContentClasses as classes } from '@material-ui/core/CardContent';

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
