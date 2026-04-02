import Chip from '@mui/material/Chip';
import ChipDelete from '@mui/material/ChipDelete';
import Stack from '@mui/material/Stack';

export default function DeletableChips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Photography"
        color="secondary"
        endAdornment={<ChipDelete onDelete={() => alert('"Photography" deleted')} />}
      />
      <Chip
        label="Nature"
        variant="outlined"
        color="primary"
        endAdornment={<ChipDelete onDelete={() => alert('"Nature" deleted')} />}
      />
    </Stack>
  );
}
