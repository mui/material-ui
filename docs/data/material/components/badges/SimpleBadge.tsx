import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function SimpleBadge() {
  return (
    <Badge
      badgeContent={4}
      color="primary"
      role="img"
      aria-label="4 unread messages"
    >
      <MailIcon color="action" />
    </Badge>
  );
}
