import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineItemSeparator from '@material-ui/lab/TimelineItemSeparator';
import TimelineItemTail from '@material-ui/lab/TimelineItemTail';
import TimelineItemContent from '@material-ui/lab/TimelineItemContent';
import TimelineItemDot from '@material-ui/lab/TimelineItemDot';

export default function AlternateTimeline() {
  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineItemSeparator>
          <TimelineItemDot />
          <TimelineItemTail />
        </TimelineItemSeparator>
        <TimelineItemContent>Eat</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemSeparator>
          <TimelineItemDot />
          <TimelineItemTail />
        </TimelineItemSeparator>
        <TimelineItemContent>Code</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemSeparator>
          <TimelineItemDot />
          <TimelineItemTail />
        </TimelineItemSeparator>
        <TimelineItemContent>Sleep</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemSeparator>
          <TimelineItemDot />
        </TimelineItemSeparator>
        <TimelineItemContent>Repeat</TimelineItemContent>
      </TimelineItem>
    </Timeline>
  );
}
