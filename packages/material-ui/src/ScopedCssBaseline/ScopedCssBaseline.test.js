import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import ScopedCssBaseline from './ScopedCssBaseline';
import describeConformance from '../test-utils/describeConformance';

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
