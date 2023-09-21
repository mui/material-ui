import * as React from 'react';
import Box from '@mui/joy/Box';
import Badge, { badgeClasses } from '@mui/joy/Badge';
import Avatar from '@mui/joy/Avatar';

export default function BadgeAvatars() {
  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Badge
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeInset="14%"
        color="success"
        sx={{
          [`& .${badgeClasses.badge}`]: {
            '&::after': {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              animation: 'ripple 1.2s infinite ease-in-out',
              border: '2px solid',
              borderColor: 'success.500',
              content: '""',
            },
          },
          '@keyframes ripple': {
            '0%': {
              transform: 'scale(1)',
              opacity: 1,
            },
            '100%': {
              transform: 'scale(2)',
              opacity: 0,
            },
          },
        }}
      >
        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
      </Badge>
      <Badge
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="plain"
        badgeContent={
          <Avatar
            alt="Remy Sharp"
            src="/static/images/avatar/1.jpg"
            sx={{ '--Avatar-size': '24px' }}
          />
        }
        badgeInset="14%"
        sx={{ '--Badge-paddingX': '0px' }}
      >
        <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" size="lg" />
      </Badge>
    </Box>
  );
}
