import * as React from 'react';
import { getClasses } from 'test/utils';
import createMount from 'test/utils/createMount';
import describeConformance from 'test/utils/describeConformance';
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
