import * as React from 'react';
import { createRenderer, describeConformance } from 'test/utils';
import TimelineConnector, { timelineConnectorClasses as classes } from '@mui/lab/TimelineConnector';

describe('<TimelineConnector />', () => {
  const { render } = createRenderer();

  describeConformance(<TimelineConnector />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    muiName: 'MuiTimelineConnector',
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));
});
