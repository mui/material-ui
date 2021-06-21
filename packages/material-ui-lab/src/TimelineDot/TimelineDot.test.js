import * as React from 'react';
import { getClasses, describeConformance } from '@material-ui/core';
import createMount from 'test/utils/createMount';
import TimelineDot from './TimelineDot';

describe('<TimelineDot />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<TimelineDot />);
  });

  describeConformance(<TimelineDot />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  }));
});
