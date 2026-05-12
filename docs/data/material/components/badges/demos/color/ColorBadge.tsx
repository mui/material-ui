import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';

export default function ColorBadge() {
  return (
    <Stack spacing={2} direction="row">
      {/* @focus-start */}
      <Badge badgeContent={4} color="secondary">
        <MailIcon color="action" />
      </Badge>
      <Badge badgeContent={4} color="success">
        <MailIcon color="action" />
      </Badge>
      {/* @focus-end */}
    </Stack>
  );
}
