import * as React from 'react';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import InfoOutlined from '@material-ui/icons/InfoOutlined';

export default function BasicTimeline() {
  return (
    <Card
      variant="outlined"
      sx={{
        p: 2,
        display: 'flex',
        alignItems: 'flex-start',
      }}
    >
      <Box
        sx={{
          p: 0.5,
          borderRadius: 0.5,
          minWidth: 28,
          textAlign: 'center',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primary.500' : 'primary.50'),
          color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : 'primary.main'),
          typography: 'body2',
        }}
      >
        1
      </Box>
      <Box sx={{ ml: 2, flex: 1 }}>
        <Box sx={{ display: 'flex' }}>
          <Typography color="text.secondary" variant="body2" sx={{ mb: 1 }}>
            Add these properties:
          </Typography>
          <InfoOutlined fontSize="small" sx={{ ml: 'auto', color: 'grey.500' }} />
        </Box>
        <Timeline
          sx={{
            pl: 0,
            py: 0,
            my: 0,
            '& .MuiTimelineItem-root:before': { display: 'none' },
          }}
        >
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Margin Top</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>Padding Bottom</TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <TimelineDot />
            </TimelineSeparator>
            <TimelineContent>Flexbox</TimelineContent>
          </TimelineItem>
        </Timeline>
      </Box>
    </Card>
  );
}
