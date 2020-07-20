import * as React from 'react';
import { getClasses } from 'test/utils';
import createMount from 'test/utils/createMount';
import describeConformance from 'test/utils/describeConformance';
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
