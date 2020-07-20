import * as React from 'react';
import { getClasses } from 'test/utils';
import createMount from 'test/utils/createMount';
import describeConformance from 'test/utils/describeConformance';
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
