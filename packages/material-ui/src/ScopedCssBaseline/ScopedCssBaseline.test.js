import React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import ScopedCssBaseline from './ScopedCssBaseline';
import describeConformance from '../test-utils/describeConformance';

describe('<ScopedCssBaseline />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<ScopedCssBaseline />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<ScopedCssBaseline />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
