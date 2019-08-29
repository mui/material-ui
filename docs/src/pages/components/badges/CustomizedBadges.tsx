import React from 'react';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Avatar from '@material-ui/core/Avatar';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const StyledBadge1 = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      top: '50%',
      right: -3,
      border: `2px solid ${theme.palette.background.paper}`,
    },
  }),
)(Badge);

const StyledBadge2 = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid #44b700',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }),
)(Badge);

const SmallAvatar = withStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 22,
      height: 22,
      border: `2px solid ${theme.palette.background.paper}`,
    },
  }),
)(Avatar);

export default function CustomizedBadges() {
  return (
    <Box display="flex">
      <Box m={1}>
        <IconButton aria-label="cart">
          <StyledBadge1 badgeContent={4} color="primary">
            <ShoppingCartIcon />
          </StyledBadge1>
        </IconButton>
      </Box>
      <Box m={1}>
        <StyledBadge2
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
        >
          <Avatar alt="Stock avatar" src="/static/images/avatar/1.jpg" />
        </StyledBadge2>
      </Box>
      <Box m={1}>
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          badgeContent={<SmallAvatar src="/static/images/avatar/1.jpg" />}
        >
          <Avatar src="/static/images/avatar/2.jpg" />
        </Badge>
      </Box>
    </Box>
  );
}
