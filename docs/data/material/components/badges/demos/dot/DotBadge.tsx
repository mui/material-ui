import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';

export default function DotBadge() {
  return (
    <Box sx={{ color: 'action.active' }}>
      {/* @focus-start */}
      <Badge color="secondary" variant="dot">
        <MailIcon />
      </Badge>
      {/* @focus-end */}
    </Box>
  );
}
