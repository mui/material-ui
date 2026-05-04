import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function DotBadge() {
  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems="center"
      sx={{ color: 'action.active' }}
    >
      <Badge color="secondary" variant="dot">
        <MailIcon />
      </Badge>
      <Typography component="span" sx={{ color: 'text.primary' }}>
        Unread messages
      </Typography>
    </Stack>
  );
}
