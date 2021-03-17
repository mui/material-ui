import * as React from 'react';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import Stack from '@material-ui/core/Stack';

describe('<Stack />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<Stack />, () => ({
    render,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiStack',
    skip: ['componentProp', 'componentsProp', 'rootClass', 'themeVariants', 'themeStyleOverrides'],
  }));
});
