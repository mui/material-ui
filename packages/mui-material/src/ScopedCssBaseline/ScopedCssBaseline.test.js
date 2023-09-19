import * as React from 'react';
import { describeConformance, createRenderer } from '@mui-internal/test-utilities';
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
