import * as React from 'react';
import { getClasses } from 'test/utils';
import createMount from 'test/utils/createMount';
import describeConformance from 'test/utils/describeConformance';
import ScopedCssBaseline from './ScopedCssBaseline';

describe('<ScopedCssBaseline />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<ScopedCssBaseline />);
  });

  describeConformance(<ScopedCssBaseline />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
