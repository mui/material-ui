import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';

const colors = ['primary', 'secondary', 'error', 'warning', 'info', 'success'];

export default function BadgeA11yColorMatrix() {
  return (
    <Stack spacing={2}>
      {colors.map((color) => (
        <Stack key={color} direction="row" spacing={2}>
          <IconButton aria-label={`${color}: 4 unread messages`}>
            <Badge color={color} badgeContent={4}>
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label={`${color}: more than 99 unread messages`}>
            <Badge color={color} badgeContent={100}>
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label={`${color}: new messages`}>
            <Badge color={color} variant="dot">
              <MailIcon />
            </Badge>
          </IconButton>
        </Stack>
      ))}
    </Stack>
  );
}
