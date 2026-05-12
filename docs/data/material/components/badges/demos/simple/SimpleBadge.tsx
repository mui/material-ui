import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function SimpleBadge() {
  // @focus-start @padding 1
  return (
    <Badge badgeContent={4} color="primary">
      <MailIcon color="action" />
    </Badge>
  );
  // @focus-end
}
