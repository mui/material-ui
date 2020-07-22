import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
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
