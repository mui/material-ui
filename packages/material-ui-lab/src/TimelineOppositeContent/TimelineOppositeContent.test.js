import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, createMount, describeConformanceV5 } from 'test/utils';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineOppositeContent, {
  timelineOppositeContentClasses as classes,
} from '@material-ui/lab/TimelineOppositeContent';

describe('<TimelineOppositeContent />', () => {
  const render = createClientRender();
  const mount = createMount();

  describeConformanceV5(<TimelineOppositeContent />, () => ({
    classes,
    inheritComponent: Typography,
    render,
    mount,
    muiName: 'MuiTimelineOppositeContent',
    refInstanceof: window.HTMLDivElement,
    skip: ['componentProp', 'componentsProp', 'themeVariants'],
  }));

  it('when align right should have alignRight class', () => {
    const { getByText } = render(
      <Timeline align="right">
        <TimelineOppositeContent>content</TimelineOppositeContent>
      </Timeline>,
    );

    expect(getByText('content')).to.have.class(classes.alignRight);
  });
});
