import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ChipLink from '@mui/material/ChipLink';
import Stack from '@mui/material/Stack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function ChipLinks() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Alex Chen"
        startAdornment={<Avatar alt="Alex Chen">A</Avatar>}
        action={<ChipLink href="#" />}
      />
      <Chip
        label="Documentation"
        endAdornment={<OpenInNewIcon />}
        action={<ChipLink href="#" />}
      />
    </Stack>
  );
}
