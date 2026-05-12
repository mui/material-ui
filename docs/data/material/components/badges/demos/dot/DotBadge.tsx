import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function DotBadge() {
  return (
    <Box sx={{ color: 'action.active' }}>
      {/* @focus-start */}
      <Badge color="secondary" variant="dot">
        <NotificationsIcon />
      </Badge>
      {/* @focus-end */}
    </Box>
  );
}
