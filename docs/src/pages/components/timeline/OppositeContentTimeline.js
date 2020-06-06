import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineItemTail from '@material-ui/lab/TimelineItemTail';
import TimelineItemContent from '@material-ui/lab/TimelineItemContent';
import TimelineItemDot from '@material-ui/lab/TimelineItemDot';
import TimelineItemOppositeContent from '@material-ui/lab/TimelineItemOppositeContent';
import Typography from '@material-ui/core/Typography';

export default function OppositeContentTimeline() {
  const timelineItems = [{
    activity: 'Eat',
    time: '09:30AM',
  }, {
    activity: 'Code',
    time: '10:00AM',
  }, {
    activity: 'Sleep',
    time: '00:00AM',
  }, {
    activity: 'Repeat',
    time: '9:00AM'
  }];

  return (
    <React.Fragment>
      <Timeline>
        {timelineItems.map(({ activity, time }) => (
          <TimelineItem key={activity}>
            <TimelineItemOppositeContent><Typography color="textSecondary">{time}</Typography></TimelineItemOppositeContent>
            <TimelineItemTail />
            <TimelineItemDot />
            <TimelineItemContent><Typography>{activity}</Typography></TimelineItemContent>
          </TimelineItem>
        ))}
      </Timeline>
      <Timeline align="right">
        {timelineItems.map(({ activity, time }) => (
          <TimelineItem key={activity}>
            <TimelineItemOppositeContent><Typography color="textSecondary">{time}</Typography></TimelineItemOppositeContent>
            <TimelineItemTail />
            <TimelineItemDot />
            <TimelineItemContent><Typography>{activity}</Typography></TimelineItemContent>
          </TimelineItem>
        ))}
      </Timeline>
      <Timeline align="alternate">
        {timelineItems.map(({ activity, time }) => (
          <TimelineItem key={activity}>
            <TimelineItemOppositeContent><Typography color="textSecondary">{time}</Typography></TimelineItemOppositeContent>
            <TimelineItemTail />
            <TimelineItemDot />
            <TimelineItemContent><Typography>{activity}</Typography></TimelineItemContent>
          </TimelineItem>
        ))}
      </Timeline>
    </React.Fragment>
  );
}
