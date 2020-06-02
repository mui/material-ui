import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineItemTail from '@material-ui/lab/TimelineItemTail';
import TimelineItemContent from '@material-ui/lab/TimelineItemContent';

export default function SimpleTimeline() {
  return (
    <Timeline>
      <TimelineItem>
        <TimelineItemTail />
        <TimelineItemContent>Eat</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemTail />
        <TimelineItemContent>Code</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemTail />
        <TimelineItemContent>Sleep</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemTail />
        <TimelineItemContent>Repeat</TimelineItemContent>
      </TimelineItem>
    </Timeline>
  );
}