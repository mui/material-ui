import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
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
