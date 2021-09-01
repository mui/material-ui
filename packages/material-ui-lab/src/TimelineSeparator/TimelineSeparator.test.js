import * as React from 'react';
import { createClientRender, describeConformance } from 'test/utils';
import TimelineSeparator, { timelineSeparatorClasses as classes } from '@mui/lab/TimelineSeparator';

describe('<TimelineSeparator />', () => {
  const render = createClientRender();

  describeConformance(<TimelineSeparator />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiTimelineSeparator',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));
});
