import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineItemTail from '@material-ui/lab/TimelineItemTail';
import TimelineItemContent from '@material-ui/lab/TimelineItemContent';
import TimelineItemDot from '@material-ui/lab/TimelineItemDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';

export default function CustomizedDotTimeline() {
  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineItemTail />
        <TimelineItemDot>
          <FastfoodIcon />
        </TimelineItemDot>
        <TimelineItemContent>Eat</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemTail />
        <TimelineItemDot>
          <LaptopMacIcon />
        </TimelineItemDot>
        <TimelineItemContent>Code</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemTail />
        <TimelineItemDot>
          <HotelIcon />
        </TimelineItemDot>
        <TimelineItemContent>Sleep</TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemTail />
        <TimelineItemDot>
          <RepeatIcon />
        </TimelineItemDot>
        <TimelineItemContent>Repeat</TimelineItemContent>
      </TimelineItem>
    </Timeline>
  );
}
