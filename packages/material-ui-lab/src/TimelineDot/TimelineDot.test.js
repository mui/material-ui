import * as React from 'react';
import { getClasses } from '@material-ui/core/test-utils';
import createMount from 'test/utils/createMount';
import describeConformance from '@material-ui/core/test-utils/describeConformance';
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
