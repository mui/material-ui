import * as React from 'react';
import { getClasses, describeConformance } from '@material-ui/core';
import createMount from 'test/utils/createMount';
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
