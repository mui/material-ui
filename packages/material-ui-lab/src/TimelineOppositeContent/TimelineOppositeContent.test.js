import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import Typography from '@material-ui/core/Typography';
import TimelineOppositeContent from './TimelineOppositeContent';

describe('<TimelineOppositeContent />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<TimelineOppositeContent />);
  });

  describeConformance(<TimelineOppositeContent />, () => ({
    classes,
    inheritComponent: Typography,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
