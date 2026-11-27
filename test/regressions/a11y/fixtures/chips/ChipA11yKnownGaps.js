import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

const noop = () => {};

// Documented gap: a disabled delete-only chip has no `aria-disabled`, so axe
// rates its faded label as an active control (4.1.2).
export default function ChipA11yKnownGaps() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip label="Disabled deletable" onDelete={noop} disabled />
    </Stack>
  );
}
