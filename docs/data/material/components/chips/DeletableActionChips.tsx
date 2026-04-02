import Chip from '@mui/material/Chip';
import ChipButton from '@mui/material/ChipButton';
import ChipDelete from '@mui/material/ChipDelete';
import ChipLink from '@mui/material/ChipLink';
import Stack from '@mui/material/Stack';

export default function DeletableActionChips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Music"
        endAdornment={<ChipDelete />}
        action={<ChipButton onClick={() => {}} />}
      />
      <Chip
        label="Movies"
        endAdornment={<ChipDelete />}
        action={<ChipLink href="#" />}
      />
    </Stack>
  );
}
