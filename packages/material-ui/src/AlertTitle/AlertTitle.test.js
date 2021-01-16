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
    testVariantProps: { dummy: 'foo' }, // Dont have props to test, but other test must run
    refInstanceof: window.HTMLDivElement,
    skip: ['componentsProp'],
  }));
});
