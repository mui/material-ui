import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';

export default function SimpleTimeline() {
  return (
    <Timeline>
      <TimelineItem>Eat</TimelineItem>
      <TimelineItem>Code</TimelineItem>
      <TimelineItem>Sleep</TimelineItem>
      <TimelineItem>Repeat</TimelineItem>
    </Timeline>
  );
}