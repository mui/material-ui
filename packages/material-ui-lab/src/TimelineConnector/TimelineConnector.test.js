import * as React from 'react';
import { createMount, describeConformanceV5 } from 'test/utils';
import TimelineConnector from './TimelineConnector';
import classes from './timelineConnectorClasses';

describe('<TimelineConnector />', () => {
  const mount = createMount();

  describeConformanceV5(<TimelineConnector />, () => ({
    classes,
    inheritComponent: 'span',
    mount,
    muiName: 'MuiTimelineConnector',
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp'],
  }));
});
