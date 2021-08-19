import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';

export default function NotificationCard() {
  return (
    <Paper variant="outlined" sx={{ display: 'flex', p: 1.5, maxWidth: 283 }}>
      <Avatar
        imgProps={{ 'aria-labelledby': 'demo-notification-card-messenger-name' }}
        src="/static/images/avatar/3.jpg"
        variant="rounded"
        sx={{ borderRadius: 0.5 }}
      />
      <Box sx={{ ml: 1, flexBasis: 180, flexGrow: 1, minWidth: '0px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            id="demo-notification-card-messenger-name"
            color="text.secondary"
            variant="caption"
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
            <Typography variant="body2" color="text.secondary" noWrap>
              Hey! Check this out, just a few minutes ago...
            </Typography>
          </Box>
          <Chip label="3" color="success" variant="notification" size="small" sx={{ mt: '3px' }} />
        </Box>
      </Box>
    </Paper>
  );
}
