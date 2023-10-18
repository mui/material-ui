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
          p: 2,
          gap: 2,
          maxWidth: 283,
          ...theme.applyDarkStyles({
            bgcolor: 'primaryDark.900',
            borderColor: 'primaryDark.700',
          }),
        })}
      >
        <Avatar
          imgProps={{ 'aria-labelledby': 'demo-notification-card-messenger-name' }}
          src="/static/images/avatar/3-sm.jpeg"
          sx={{ width: 40, height: 40 }}
        />
        <Box sx={{ flexGrow: 1 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
              id="demo-notification-card-messenger-name"
              color="primary.400"
              fontWeight={500}
              fontSize={12}
              gutterBottom
            >
              From: Angela Erickson
            </Typography>
            <Typography color="text.secondary" variant="caption">
              09:41
            </Typography>
          </Box>
          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1, minWidth: '0px' }}>
              <Typography fontWeight={600} fontSize={14} gutterBottom>
                Incredible discoveries!
              </Typography>
              <Typography fontSize={14} color="text.secondary" noWrap>
                Just found out Material UI & Joy UI and wow...
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
