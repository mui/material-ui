import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineItemTail from '@material-ui/lab/TimelineItemTail';
import TimelineItemContent from '@material-ui/lab/TimelineItemContent';
import TimelineItemDot from '@material-ui/lab/TimelineItemDot';
import TimelineItemOppositeContent from '@material-ui/lab/TimelineItemOppositeContent';

export default function SimpleTimeline() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineItemOppositeContent>09:30AM Monday morning</TimelineItemOppositeContent>
        <TimelineItemTail />
        <TimelineItemDot />
        <TimelineItemContent>Eat</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemOppositeContent>10:00AM</TimelineItemOppositeContent>
        <TimelineItemTail />
        <TimelineItemDot />
        <TimelineItemContent>Code</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemOppositeContent>00:00AM</TimelineItemOppositeContent>
        <TimelineItemTail />
        <TimelineItemDot />
        <TimelineItemContent>Sleep</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemOppositeContent>09:00AM</TimelineItemOppositeContent>
        <TimelineItemTail />
        <TimelineItemDot />
        <TimelineItemContent>Repeat</TimelineItemContent>
      </TimelineItem>
    </Timeline>
  );
}
