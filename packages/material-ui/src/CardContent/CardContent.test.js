import * as React from 'react';
import { createMount, describeConformanceV5 } from 'test/utils';
import CardContent from './CardContent';
import classes from './cardContentClasses';

describe('<CardContent />', () => {
  const mount = createMount();

  describeConformanceV5(<CardContent />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    muiName: 'MuiCardContent',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentsProp', 'themeVariants'],
    testComponentPropWith: 'span',
  }));
});
