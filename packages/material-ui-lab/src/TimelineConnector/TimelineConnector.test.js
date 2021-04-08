import * as React from 'react';
import { createMount, createClientRender, describeConformanceV5 } from 'test/utils';
import TimelineConnector from './TimelineConnector';
import classes from './timelineConnectorClasses';

describe('<TimelineConnector />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<TimelineConnector />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    mount,
    muiName: 'MuiTimelineConnector',
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));
});
