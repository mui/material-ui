import * as React from 'react';
import { expect } from 'chai';
import { createClientRender, createMount, describeConformanceV5 } from 'test/utils';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
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

  it('should have alignLeft class when inside of a left-positioned timeline', () => {
    const { getByText } = render(
      <Timeline position="left">
        <TimelineOppositeContent>content</TimelineOppositeContent>
      </Timeline>,
    );

    expect(getByText('content')).to.have.class(classes.alignLeft);
  });

  it('should have alignRight class when inside of a right-positioned timeline', () => {
    const { getByText } = render(
      <Timeline position="right">
        <TimelineOppositeContent>content</TimelineOppositeContent>
      </Timeline>,
    );

    expect(getByText('content')).to.have.class(classes.alignRight);
  });

  it('should have alignLeft class when inside of a left-positioned timeline and a left-aligned item', () => {
    const { getByText } = render(
      <Timeline position="left">
        <TimelineItem align="left">
          <TimelineOppositeContent>content</TimelineOppositeContent>
        </TimelineItem>
      </Timeline>,
    );

    expect(getByText('content')).to.have.class(classes.alignLeft);
  });

  it('should have alignLeft class when inside of a right-positioned timeline and a left-aligned item', () => {
    const { getByText } = render(
      <Timeline position="right">
        <TimelineItem align="left">
          <TimelineOppositeContent>content</TimelineOppositeContent>
        </TimelineItem>
      </Timeline>,
    );

    expect(getByText('content')).to.have.class(classes.alignLeft);
  });

  it('should have alignRight class when inside of a left-positioned timeline and a right-aligned item', () => {
    const { getByText } = render(
      <Timeline position="left">
        <TimelineItem align="right">
          <TimelineOppositeContent>content</TimelineOppositeContent>
        </TimelineItem>
      </Timeline>,
    );

    expect(getByText('content')).to.have.class(classes.alignRight);
  });

  it('should have alignRight class when inside of a right-positioned timeline and a right-aligned item', () => {
    const { getByText } = render(
      <Timeline position="right">
        <TimelineItem align="right">
          <TimelineOppositeContent>content</TimelineOppositeContent>
        </TimelineItem>
      </Timeline>,
    );

    expect(getByText('content')).to.have.class(classes.alignRight);
  });
});
