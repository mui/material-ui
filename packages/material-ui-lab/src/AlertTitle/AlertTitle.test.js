import * as React from 'react';
import { getClasses, describeConformance } from '@material-ui/core';
import createMount from 'test/utils/createMount';
import AlertTitle from './AlertTitle';

describe('<AlertTitle />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<AlertTitle />);
  });

  describeConformance(<AlertTitle />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
