import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import Timeline from '@mui/lab/Timeline';
import TimelineItem, { timelineItemClasses } from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector, { timelineConnectorClasses } from '@mui/lab/TimelineConnector';
import TimelineContent, { timelineContentClasses } from '@mui/lab/TimelineContent';
import TimelineDot, { timelineDotClasses } from '@mui/lab/TimelineDot';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

export default function BasicTimeline() {
  return (
    <Fade in timeout={700}>
      <Card
        variant="outlined"
        sx={(theme) => ({
          p: 2,
          display: 'flex',
          alignItems: 'flex-start',
          ...theme.applyDarkStyles({
            bgcolor: 'primaryDark.800',
          }),
        })}
      >
        <Box
          sx={(theme) => ({
            p: 0.5,
            borderRadius: 0.5,
            minWidth: 28,
            typography: 'body2',
            textAlign: 'center',
            bgcolor: 'primary.50',
            color: 'primary.main',
            ...theme.applyDarkStyles({
              bgcolor: 'primary.700',
              color: '#fff',
            }),
          })}
        >
          1
        </Box>
        <Box sx={{ ml: 2, flex: 1 }}>
          <Box sx={{ display: 'flex' }}>
            <Typography
              variant="body2"
              sx={(theme) => ({
                mb: 1,
                color: 'text.secondary',
                ...theme.applyDarkStyles({
                  color: 'grey.400',
                }),
              })}
            >
              Use the sx prop to add these properties:
            </Typography>
            <InfoOutlined fontSize="small" sx={{ ml: 'auto', color: 'grey.500' }} />
          </Box>
          <Timeline
            sx={[
              {
                pl: 0,
                py: 0,
                my: 0,
                [`& .${timelineItemClasses.root}`]: {
                  minHeight: 36,
                  '&:before': {
                    display: 'none',
                  },
                },
                [`& .${timelineDotClasses.root}`]: {
                  zIndex: 1,
                  padding: '3px',
                  boxShadow: 'none',
                  margin: '15px 0',
                  border: 'none',
                  bgcolor: 'primary.500',
                },
                [`& .${timelineConnectorClasses.root}`]: {
                  margin: '-15px 0',
                  bgcolor: 'primary.50',
                },
                [`& .${timelineContentClasses.root}`]: {
                  fontSize: '0.875rem',
                  color: 'grey.800',
                },
              },
              (theme) =>
                theme.applyDarkStyles({
                  [`& .${timelineConnectorClasses.root}`]: {
                    bgcolor: 'primaryDark.700',
                  },
                  [`& .${timelineContentClasses.root}`]: {
                    color: 'grey.100',
                  },
                }),
            ]}
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
    </Fade>
  );
}
