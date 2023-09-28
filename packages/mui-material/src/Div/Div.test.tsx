import * as React from 'react';
import { expect } from 'chai';
import { createRenderer, describeConformance } from '@mui-internal/test-utils';
import Div, { divClasses as classes } from '@mui/material/Div';

describe('<Div />', () => {
  const { render } = createRenderer();

  describeConformance(<Div />, () => ({
    classes,
    render,
    muiName: 'MuiDiv',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentsProp'],
  }));
});
