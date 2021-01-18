import * as React from 'react';
import { createMount, describeConformanceV5 } from 'test/utils';

import AlertTitle from './AlertTitle';
import classes from './alertTitleClasses';

describe('<AlertTitle />', () => {
  const mount = createMount();

  describeConformanceV5(<AlertTitle />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    muiName: 'MuiAlertTitle',
    refInstanceof: window.HTMLDivElement,
    testStateOverrides: { styleKey: 'root' },
    skip: ['componentsProp', 'themeVariants', 'themeDefaultProps'],
  }));
});
