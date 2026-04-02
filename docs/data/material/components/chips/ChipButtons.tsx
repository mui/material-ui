import Chip from '@mui/material/Chip';
import ChipButton from '@mui/material/ChipButton';
import Stack from '@mui/material/Stack';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoopIcon from '@mui/icons-material/Loop';

export default function ChipButtons() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Assign"
        startAdornment={<PersonAddIcon />}
        action={<ChipButton onClick={() => {}} />}
      />
      <Chip
        label="Reset"
        variant="outlined"
        color="primary"
        endAdornment={<LoopIcon />}
        action={<ChipButton onClick={() => {}} />}
      />
    </Stack>
  );
}
