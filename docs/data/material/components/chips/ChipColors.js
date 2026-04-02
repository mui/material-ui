import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export default function ChipColors() {
  return (
    <Stack spacing={1} sx={{ alignItems: 'center' }}>
      <Stack direction="row" spacing={1}>
        <Chip label="Success" color="success" />
        <Chip label="Warning" color="warning" />
      </Stack>
      <Stack direction="row" spacing={1}>
        <Chip label="Primary" color="primary" variant="outlined" />
        <Chip label="Secondary" color="secondary" variant="outlined" />
      </Stack>
    </Stack>
  );
}
