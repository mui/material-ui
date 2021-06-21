import * as React from 'react';
import { getClasses, describeConformance } from '@material-ui/core';
import createMount from 'test/utils/createMount';
import TimelineOppositeContent from './TimelineOppositeContent';

describe('<TimelineOppositeContent />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<TimelineOppositeContent />);
  });

  describeConformance(<TimelineOppositeContent />, () => ({
    classes,
    inheritComponent: 'div',
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
