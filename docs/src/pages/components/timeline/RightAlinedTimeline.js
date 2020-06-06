import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineItemTail from '@material-ui/lab/TimelineItemTail';
import TimelineItemContent from '@material-ui/lab/TimelineItemContent';
import TimelineItemDot from '@material-ui/lab/TimelineItemDot';
import TimelineItemOppositeContent from '@material-ui/lab/TimelineItemOppositeContent';

export default function RightAlignedTimeline() {
  return (
    <Timeline align="right">
      <TimelineItem>
        <TimelineItemOppositeContent>09:30AM</TimelineItemOppositeContent>
        <TimelineItemTail />
        <TimelineItemDot />
        <TimelineItemContent>Eat</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemTail />
        <TimelineItemDot />
        <TimelineItemContent>Code</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemTail />
        <TimelineItemDot />
        <TimelineItemContent>Sleep</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemOppositeContent>09:00AM</TimelineItemOppositeContent>
        <TimelineItemDot />
        <TimelineItemContent>Repeat</TimelineItemContent>
      </TimelineItem>
    </Timeline>
  );
}
