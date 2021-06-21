import * as React from 'react';
import { getClasses, describeConformance } from '@material-ui/core';
import createMount from 'test/utils/createMount';
import TimelineContent from './TimelineContent';

describe('<TimelineContent />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<TimelineContent />);
  });

  describeConformance(<TimelineContent />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
