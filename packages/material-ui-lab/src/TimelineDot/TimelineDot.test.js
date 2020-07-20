import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
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
