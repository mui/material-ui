import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';

export default function ColorBadge() {
  return (
    <Stack spacing={2} direction="row">
      <Badge
        badgeContent={4}
        color="secondary"
        role="img"
        aria-label="4 unread messages with secondary color"
      >
        <MailIcon color="action" />
      </Badge>
      <Badge
        badgeContent={4}
        color="success"
        role="img"
        aria-label="4 unread messages with success color"
      >
        <MailIcon color="action" />
      </Badge>
    </Stack>
  );
}
