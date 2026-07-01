import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import InboxIcon from '@mui/icons-material/Inbox';

// Force the tooltip open + inline (no portal) so it renders inside
// `#density-scope` and lands in the scoped screenshot; snap the transition so
// the capture is deterministic.
const staticTooltipSlotProps = {
  popper: { disablePortal: true },
  transition: { appear: false, timeout: 0 },
} as const;

// Shared density demo matrix for the CSS-var density adapter.
// Consumed by the screenshot fixture (density-fixture). `level=default` (no token
// overrides) must stay pixel-identical to the pre-change baseline.
const demos: Record<string, React.ReactNode> = {
  Button: (
    <Stack spacing={2} useFlexGap>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Stack key={size} direction="row" spacing={2} useFlexGap sx={{ alignItems: 'center' }}>
          <Button variant="contained" size={size}>
            Contained
          </Button>
          <Button variant="outlined" size={size}>
            Outlined
          </Button>
          <Button variant="text" size={size}>
            Text
          </Button>
        </Stack>
      ))}
    </Stack>
  ),
  MenuItem: (
    // MenuItem requires a MenuList/Menu ancestor (MenuListContext).
    <MenuList sx={{ width: 220, border: '1px solid', borderColor: 'divider' }}>
      <MenuItem>Default item</MenuItem>
      <MenuItem selected>Selected item</MenuItem>
      <MenuItem>
        <ListItemIcon>
          <InboxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>With icon</ListItemText>
      </MenuItem>
      <MenuItem divider>With divider</MenuItem>
      <MenuItem disableGutters>No gutters</MenuItem>
      <MenuItem dense>Dense item</MenuItem>
      <MenuItem dense>
        <ListItemIcon>
          <InboxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Dense + icon</ListItemText>
      </MenuItem>
      <MenuItem dense disableGutters>
        Dense no gutters
      </MenuItem>
    </MenuList>
  ),
  Tooltip: (
    // Always-open, inline tooltips (no hover/portal) so they render inside the
    // scoped screenshot. The box is left unpositioned on purpose — Popper then
    // anchors against the viewport (correct coords); the fixed height just gives
    // the scope a tall enough capture box for the bottom-placed bubbles.
    <Box sx={{ width: 320, height: 260 }}>
      <Stack spacing={10} sx={{ pt: 1, alignItems: 'flex-start' }}>
        <Tooltip title="Default tooltip" open placement="bottom" slotProps={staticTooltipSlotProps}>
          <Button variant="outlined">Default</Button>
        </Tooltip>
        <Tooltip title="Arrow tooltip" arrow open placement="bottom" slotProps={staticTooltipSlotProps}>
          <Button variant="outlined">Arrow</Button>
        </Tooltip>
      </Stack>
    </Box>
  ),
};

export default demos;
