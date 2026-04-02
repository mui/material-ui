import Chip from '@mui/material/Chip';
import ChipButton from '@mui/material/ChipButton';
import ChipDelete from '@mui/material/ChipDelete';
import Stack from '@mui/material/Stack';

export default function DisabledChips() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip
        label="Focusable"
        disabled
        endAdornment={<ChipDelete />}
        action={<ChipButton onClick={() => {}} />}
      />
      <Chip
        label="Not focusable"
        disabled
        endAdornment={<ChipDelete focusableWhenDisabled={false} />}
        action={<ChipButton onClick={() => {}} focusableWhenDisabled={false} />}
      />
    </Stack>
  );
}
