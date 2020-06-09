import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
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
