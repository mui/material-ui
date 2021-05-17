import * as React from 'react';
import { createClientRender, createMount, describeConformanceV5 } from 'test/utils';
import TimelineDot, { timelineDotClasses as classes } from '@material-ui/lab/TimelineDot';

describe('<TimelineDot />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<TimelineDot />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    mount,
    muiName: 'MuiTimelineDot',
    refInstanceof: window.HTMLSpanElement,
    testVariantProps: { color: 'secondary', variant: 'outlined' },
    skip: ['componentProp', 'componentsProp'],
  }));
});
