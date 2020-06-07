import React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import Typography from '@material-ui/core/Typography';

export default function OppositeContentTimeline() {
  const timelineItems = [
    {
      activity: 'Eat',
      time: '09:30AM',
    },
    {
      activity: 'Code',
      time: '10:00AM',
    },
    {
      activity: 'Sleep',
      time: '00:00AM',
    },
    {
      activity: 'Repeat',
      time: '9:00AM',
    },
  ];

  return (
    <React.Fragment>
      <Timeline>
        {timelineItems.map(({ activity, time }) => (
          <TimelineItem key={activity}>
            <TimelineOppositeContent>
              <Typography color="textSecondary">{time}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography>{activity}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <Timeline align="right">
        {timelineItems.map(({ activity, time }) => (
          <TimelineItem key={activity}>
            <TimelineOppositeContent>
              <Typography color="textSecondary">{time}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography>{activity}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
      <Timeline align="alternate">
        {timelineItems.map(({ activity, time }) => (
          <TimelineItem key={activity}>
            <TimelineOppositeContent>
              <Typography color="textSecondary">{time}</Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              <Typography>{activity}</Typography>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </React.Fragment>
  );
}
