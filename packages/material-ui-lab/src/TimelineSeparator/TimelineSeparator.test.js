import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import TimelineSeparator from './TimelineSeparator';

describe('<TimelineSeparator />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<TimelineSeparator />);
  });

  describeConformance(<TimelineSeparator />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
