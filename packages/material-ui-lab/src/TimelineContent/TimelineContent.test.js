import * as React from 'react';
import { getClasses, createMount, describeConformance } from 'test/utils';
import Typography from '@material-ui/core/Typography';
import TimelineContent from './TimelineContent';

describe('<TimelineContent />', () => {
  const mount = createMount();
  let classes;

  before(() => {
    classes = getClasses(<TimelineContent />);
  });

  describeConformance(<TimelineContent />, () => ({
    classes,
    inheritComponent: Typography,
    mount,
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp'],
  }));
});
