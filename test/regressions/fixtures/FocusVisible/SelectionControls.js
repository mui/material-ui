import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import Switch from '@mui/material/Switch';

// Checkbox/Radio/Switch draw the ring on a slot (the icon svg / the track), not the ButtonBase
// root — special-cased vs the outline families. Each renders already focus-visible so the
// screenshot loop captures the slot ring; the class goes on the SwitchBase root (Switch reaches it
// via `slotProps.switchBase`, since its `className` targets the outer wrapper instead).
const theme = createTheme({
  focusVisible: true,
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

const switchFocused = { switchBase: { className: 'Mui-focusVisible' } };

export default function SelectionControls() {
  return (
    <ThemeProvider theme={theme}>
      <Stack direction="row" spacing={2} sx={{ p: 2, alignItems: 'center' }}>
        <Checkbox className="Mui-focusVisible" />
        <Checkbox className="Mui-focusVisible" defaultChecked />
        <Radio className="Mui-focusVisible" />
        <Radio className="Mui-focusVisible" defaultChecked />
        <Switch slotProps={switchFocused} />
        <Switch slotProps={switchFocused} defaultChecked />
      </Stack>
    </ThemeProvider>
  );
}
