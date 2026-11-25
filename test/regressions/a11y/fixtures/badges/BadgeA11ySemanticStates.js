import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function BadgeA11ySemanticStates() {
  return (
    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
      {/* The badge content is aria-hidden; the count lives in the button's name. */}
      <IconButton aria-label="show 4 unread messages">
        <Badge color="primary" badgeContent={4}>
          <MailIcon />
        </Badge>
      </IconButton>
      {/* Overflow: the visual "99+" is hidden, the name carries the meaning. */}
      <IconButton aria-label="show more than 99 unread messages">
        <Badge color="secondary" badgeContent={100}>
          <MailIcon />
        </Badge>
      </IconButton>
      {/* The dot variant has no content, so the name carries the state. */}
      <IconButton aria-label="show new notifications">
        <Badge color="error" variant="dot">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      {/* showZero keeps a visual 0 and the name says so. */}
      <IconButton aria-label="show 0 unread messages">
        <Badge color="secondary" badgeContent={0} showZero>
          <MailIcon />
        </Badge>
      </IconButton>
      {/* invisible hides the badge; the name drops the count. */}
      <IconButton aria-label="show no unread messages">
        <Badge color="primary" badgeContent={4} invisible>
          <MailIcon />
        </Badge>
      </IconButton>
      {/* A non-interactive badged element gets its name from role="img". */}
      <Badge color="primary" badgeContent={3} overlap="circular">
        <Avatar role="img" aria-label="Ted, 3 unread messages" sx={{ bgcolor: 'primary.dark' }}>
          T
        </Avatar>
      </Badge>
    </Stack>
  );
}
