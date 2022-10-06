import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';

export default function NotificationCard() {
  return (
    <Fade in timeout={700}>
      <Card
        variant="outlined"
        sx={(theme) => ({
          display: 'flex',
          p: 1.5,
          maxWidth: 283,
          ...theme.applyDarkStyles({
            bgcolor: 'primaryDark.800',
          }),
        })}
      >
        <Avatar
          imgProps={{ 'aria-labelledby': 'demo-notification-card-messenger-name' }}
          src="/static/images/avatar/3-sm.jpeg"
          variant="rounded"
          sx={{ width: 40, height: 40 }}
        />
        <Box sx={{ ml: 1, flexBasis: 180, flexGrow: 1, minWidth: '0px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              id="demo-notification-card-messenger-name"
              color="text.secondary"
              variant="caption"
              sx={{ fontWeight: 500 }}
            >
              Angela Erickson
            </Typography>
            <Typography color="text.secondary" variant="caption">
              12:50
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', mt: 0.5 }}>
            <Box sx={{ flexGrow: 1, minWidth: '0px' }}>
              <Typography component="div">Great news</Typography>
              <Typography variant="caption" color="text.secondary" noWrap sx={{ fontWeight: 500 }}>
                Hey! Check this out, just a few minutes ago...
              </Typography>
            </Box>
            <Chip
              label="3"
              color="success"
              size="small"
              sx={{ mt: '3px', color: '#fff', fontSize: '0.75rem', height: 18 }}
            />
          </Box>
        </Box>
      </Card>
    </Fade>
  );
}
