import * as React from 'react';
import { describeConformance, createRenderer } from 'test/utils';
import ScopedCssBaseline, {
  scopedCssBaselineClasses as classes,
} from '@mui/material/ScopedCssBaseline';

describe('<ScopedCssBaseline />', () => {
  const { render } = createRenderer();

  describeConformance(<ScopedCssBaseline />, () => ({
    classes,
    inheritComponent: 'div',
    render,
    muiName: 'MuiScopedCssBaseline',
    refInstanceof: window.HTMLDivElement,
    testComponentPropWith: 'span',
    skip: ['componentsProp', 'themeVariants'],
  }));
});
