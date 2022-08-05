import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Fade from '@mui/material/Fade';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CodeRounded from '@mui/icons-material/CodeRounded';
import ScheduleRounded from '@mui/icons-material/ScheduleRounded';

export default function TaskCard() {
  return (
    <Fade in timeout={700}>
      <Card
        data-muidocs-color-scheme="dark"
        sx={(theme) => ({
          minWidth: 280,
          maxWidth: 360,
          minHeight: 280,
          display: 'flex',
          flexDirection: 'column',
          p: 2.5,
          background: `linear-gradient(to right bottom, ${theme.vars.palette.primary[500]}, ${theme.vars.palette.primary[700]} 120%)`,
        })}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <ScheduleRounded fontSize="inherit" />
          <Typography
            color="rgba(255, 255, 255, 0.7)"
            variant="caption"
            fontWeight={500}
            sx={{ ml: 0.5, mt: '1px' }}
          >
            March 25th
          </Typography>
        </Box>
        <Box sx={{ my: 'auto' }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              bgcolor: '#fff',
              borderRadius: 0.75,
              p: '2px',
            }}
          >
            <CodeRounded color="primary" />
          </Box>
          <Typography variant="h6" component="div" sx={{ mt: 1.5, fontWeight: 500 }}>
            Check the docs for getting every component API
          </Typography>
        </Box>
        <Box sx={{ display: 'flex' }}>
          <Avatar
            imgProps={{ 'aria-labelledby': 'demo-task-card-assigne-name' }}
            src="/static/images/avatar/1-sm.jpeg"
            variant="rounded"
            sx={{ border: '1px solid #fff' }}
          />
          <Box sx={{ ml: 1 }}>
            <Typography variant="body2" color="primary.200" fontWeight={500}>
              Assigned to
            </Typography>
            <Typography id="demo-task-card-assigne-name" fontWeight={500}>
              Michael Scott
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: -0.5, mt: 0.5 }}>
          <LinearProgress
            aria-label="Progress"
            variant="determinate"
            value={60}
            sx={{
              flexGrow: 1,
              borderRadius: 10,
              backgroundColor: 'rgba(255,255,255,0.12)',
              [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 10,
                backgroundColor: '#fff',
              },
            }}
          />
          <Typography color="#00C8FF" variant="body2" sx={{ ml: 2 }}>
            <b>60%</b>
          </Typography>
        </Box>
      </Card>
    </Fade>
  );
}
