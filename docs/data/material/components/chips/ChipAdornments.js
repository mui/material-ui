import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ScheduleIcon from '@mui/icons-material/Schedule';
import DoneIcon from '@mui/icons-material/Done';

export default function ChipAdornments() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Maya Johnson"
        color="primary"
        startAdornment={<Avatar>M</Avatar>}
      />
      <Chip
        label="In progress"
        variant="outlined"
        color="secondary"
        startAdornment={<ScheduleIcon />}
      />
      <Chip label="Completed" color="success" endAdornment={<DoneIcon />} />
    </Stack>
  );
}
