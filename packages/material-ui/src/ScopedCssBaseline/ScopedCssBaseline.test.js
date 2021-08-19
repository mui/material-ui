import * as React from 'react';
import { describeConformance, createClientRender } from 'test/utils';
import ScopedCssBaseline, {
  scopedCssBaselineClasses as classes,
} from '@material-ui/core/ScopedCssBaseline';

describe('<ScopedCssBaseline />', () => {
  const render = createClientRender();

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
