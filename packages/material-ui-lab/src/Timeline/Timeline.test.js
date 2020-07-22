import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import Timeline from './Timeline';

describe('<Timeline />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<Timeline />);
  });

  describeConformance(<Timeline />, () => ({
    classes,
    inheritComponent: 'ul',
    mount,
    refInstanceof: window.HTMLUListElement,
    skip: ['componentProp'],
  }));
});
