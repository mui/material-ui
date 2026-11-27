import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';

const noop = () => {};

// Documented gap: a disabled delete-only chip has no `aria-disabled`, so axe
// rates its faded label as an active control (4.1.2).
// The avatar chip records that the letter avatar passes `color-contrast`.
// The avatar has two letters: axe marks one-letter text as incomplete, not as a pass.
export default function ChipA11yKnownGaps() {
  return (
    <Stack direction="row" spacing={1}>
      <Chip avatar={<Avatar>MB</Avatar>} label="With avatar" onDelete={noop} />
      <Chip label="Disabled deletable" onDelete={noop} disabled />
    </Stack>
  );
}
