import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import CodeRounded from '@material-ui/icons/CodeRounded';
import ScheduleRounded from '@material-ui/icons/ScheduleRounded';

export default function TaskCard() {
  return (
    <Card
      variant="gradient"
      sx={{
        minWidth: 280,
        maxWidth: 360,
        minHeight: 280,
        display: 'flex',
        flexDirection: 'column',
        p: 2.5,
        color: '#fff',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <ScheduleRounded fontSize="inherit" />
        <Typography variant="caption" sx={{ ml: 0.5, mt: '1px' }}>
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
        <Typography variant="h6" component="div" fontWeight="bold" sx={{ mt: 1.5 }}>
          Check for the API response and return the proper method
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Avatar
          imgProps={{ 'aria-labelledby': 'demo-task-card-assigne-name' }}
          src="/static/images/avatar/1.jpg"
          variant="rounded"
          sx={{ border: '1px solid #fff' }}
        />
        <Box sx={{ ml: 1 }}>
          <Typography variant="body2" color="primary.200">
            Assigned to
          </Typography>
          <Typography id="demo-task-card-assigne-name">Michael Scott</Typography>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: -0.5, mt: 0.5 }}>
        <LinearProgress
          aria-label="Progress"
          variant="determinate"
          value={60}
          sx={{ flexGrow: 1 }}
        />
        <Typography color="#00C8FF" variant="body2" sx={{ ml: 2 }}>
          <b>60%</b>
        </Typography>
      </Box>
    </Card>
  );
}
