import * as React from 'react';
import { createClientRender, describeConformance } from 'test/utils';
import TimelineConnector, {
  timelineConnectorClasses as classes,
} from '@material-ui/lab/TimelineConnector';

describe('<TimelineConnector />', () => {
  const render = createClientRender();

  describeConformance(<TimelineConnector />, () => ({
    classes,
    inheritComponent: 'span',
    render,
    muiName: 'MuiTimelineConnector',
    refInstanceof: window.HTMLSpanElement,
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));
});
