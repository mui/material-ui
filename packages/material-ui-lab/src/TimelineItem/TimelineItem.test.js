import * as React from 'react';
import { createClientRender, describeConformance } from 'test/utils';
import TimelineItem, { timelineItemClasses as classes } from '@material-ui/lab/TimelineItem';

describe('<TimelineItem />', () => {
  const render = createClientRender();

  describeConformance(<TimelineItem />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    muiName: 'MuiTimelineItem',
    refInstanceof: window.HTMLLIElement,
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));
});
