import * as React from 'react';
import { getClasses, describeConformance } from '@material-ui/core';
import createMount from 'test/utils/createMount';
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
