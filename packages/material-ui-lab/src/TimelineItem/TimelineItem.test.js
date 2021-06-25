import * as React from 'react';
import { createClientRender, createMount, describeConformanceV5 } from 'test/utils';
import TimelineItem, { timelineItemClasses as classes } from '@material-ui/lab/TimelineItem';

describe('<TimelineItem />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<TimelineItem />, () => ({
    classes,
    inheritComponent: 'li',
    render,
    mount,
    muiName: 'MuiTimelineItem',
    refInstanceof: window.HTMLLIElement,
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));
});
