import React from 'react';
import { createMount, getClasses } from '@material-ui/core/test-utils';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
import AlertTitle from './AlertTitle';

describe('<AlertTitle />', () => {
  let mount;
  let classes;

  before(() => {
    mount = createMount({ strict: true });
    classes = getClasses(<AlertTitle />);
  });

  after(() => {
    mount.cleanUp();
  });

  describeConformance(<AlertTitle />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
