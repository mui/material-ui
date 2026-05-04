import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function BadgeMax() {
  return (
    <Stack spacing={4} direction="row" sx={{ color: 'action.active' }}>
      <Badge
        color="secondary"
        badgeContent={99}
        role="img"
        aria-label="99 unread messages"
      >
        <MailIcon />
      </Badge>
      <Badge
        color="secondary"
        badgeContent={100}
        role="img"
        aria-label="more than 99 unread messages"
      >
        <MailIcon />
      </Badge>
      <Badge
        color="secondary"
        badgeContent={1000}
        max={999}
        role="img"
        aria-label="more than 999 unread messages"
      >
        <MailIcon />
      </Badge>
    </Stack>
  );
}
