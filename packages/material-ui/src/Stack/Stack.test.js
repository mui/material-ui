import * as React from 'react';
import { createMount, describeConformanceV5 } from 'test/utils';
import Stack from '@material-ui/core/Stack';

describe('<Stack />', () => {
  const mount = createMount();

  describeConformanceV5(<Stack />, () => ({
    mount,
    refInstanceof: window.HTMLDivElement,
    muiName: 'MuiStack',
  }));
});
