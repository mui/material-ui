import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineItemTail from '@material-ui/lab/TimelineItemTail';
import TimelineItemContent from '@material-ui/lab/TimelineItemContent';
import TimelineItemOppositeContent from '@material-ui/lab/TimelineItemOppositeContent';
import TimelineItemDot from '@material-ui/lab/TimelineItemDot';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import HotelIcon from '@material-ui/icons/Hotel';
import RepeatIcon from '@material-ui/icons/Repeat';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const usePaperStyles = makeStyles({
  root: {
    padding: '6px 16px',
  },
});

const useTailSecondaryStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.secondary.main, 
  }
}));

export default function CustomizedDotTimeline() {
  const paperClasses = usePaperStyles();
  const secondaryTailClasses = useTailSecondaryStyles();

  return (
    <Timeline align="alternate">
      <TimelineItem>
        <TimelineItemOppositeContent>
          <Typography variant="body2" color="textSecondary">9:30AM</Typography>
        </TimelineItemOppositeContent>
        <TimelineItemTail />
        <TimelineItemDot>
          <FastfoodIcon />
        </TimelineItemDot>
        <TimelineItemContent>
          <Paper elevation={3} className={paperClasses.root}>
            <Typography variant="h6" component="h1">Eat</Typography>
            <Typography>Because you need strenght...</Typography>            
          </Paper>          
        </TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineItemOppositeContent>
          <Typography variant="body2" color="textSecondary">10:00AM</Typography>
        </TimelineItemOppositeContent>
        <TimelineItemTail />
        <TimelineItemDot color="primary">
          <LaptopMacIcon />
        </TimelineItemDot>
        <TimelineItemContent>
          <Paper elevation={3} className={paperClasses.root}>
            <Typography variant="h6" component="h1">Code</Typography>
            <Typography>Because it is awesome...</Typography>            
          </Paper>          
        </TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemTail className={secondaryTailClasses.root}/>
        <TimelineItemDot color="primary" variant="outlined">
          <HotelIcon />
        </TimelineItemDot>
        <TimelineItemContent>
          <Paper elevation={3} className={paperClasses.root}>
            <Typography variant="h6" component="h1">Sleep</Typography>
            <Typography>Because you need rest</Typography>
          </Paper>          
        </TimelineItemContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineItemDot color="secondary">
          <RepeatIcon />
        </TimelineItemDot>
        <TimelineItemContent>
          <Paper elevation={3} className={paperClasses.root}>
            <Typography variant="h6" component="h1">Repeat</Typography>
            <Typography>Because that is your life</Typography>
          </Paper>
        </TimelineItemContent>
      </TimelineItem>
    </Timeline>
  );
}
