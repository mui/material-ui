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
        data-mui-color-scheme="dark"
        sx={(theme) => ({
          minWidth: 280,
          maxWidth: 360,
          minHeight: 280,
          display: 'flex',
          flexDirection: 'column',
          p: 3,
          background: `linear-gradient(to right bottom, ${
            (theme.vars || theme).palette.primary[500]
          }, ${(theme.vars || theme).palette.primary[600]} 120%)`,
          boxShadow: '0px 20px 25px rgba(0, 0, 0, 0.1), 0px 10px 10px rgba(0, 0, 0, 0.04)',
        })}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <ScheduleRounded fontSize="inherit" />
          <Typography variant="caption" fontWeight={600}>
            March 25th
          </Typography>
        </Box>
        <Box sx={{ my: 'auto' }}>
          <CodeRounded color="white" />
          <Typography fontSize={18} component="div" fontWeight={600} sx={{ lineHeight: 1.4 }}>
            Customize every button and chip instance primary color
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1, py: 1 }}>
          <Avatar
            imgProps={{ 'aria-labelledby': 'demo-task-card-assignee-name' }}
            src="/static/images/avatar/1-sm.jpeg"
            sx={{ border: '2px solid #FFF' }}
          />
          <div>
            <Typography color="primary.200" fontWeight={600} fontSize={12}>
              Assigned to
            </Typography>
            <Typography id="demo-task-card-assignee-name" variant="body2" fontWeight={600}>
              Michael Scott
            </Typography>
          </div>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LinearProgress
            aria-label="Progress"
            variant="determinate"
            value={60}
            sx={{
              flexGrow: 1,
              borderRadius: 10,
              backgroundColor: 'primary.400',
              [`& .${linearProgressClasses.bar}`]: {
                borderRadius: 10,
                backgroundColor: '#fff',
              },
            }}
          />
          <Typography color="primary.50" variant="body2" fontWeight={700} sx={{ ml: 2 }}>
            60%
          </Typography>
        </Box>
      </Card>
    </Fade>
  );
}
