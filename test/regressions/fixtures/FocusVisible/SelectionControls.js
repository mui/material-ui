import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import Switch from '@mui/material/Switch';

// Checkbox/Radio/Switch draw the ring on a slot (the icon svg / the track), not the ButtonBase
// root — special-cased vs the outline families. Shown both checked and unchecked.
const theme = createTheme({
  focusVisible: true,
  components: { MuiButtonBase: { defaultProps: { disableRipple: true } } },
});

export default function SelectionControls() {
  const ref = React.useRef(null);
  // Render already focus-visible so the screenshot loop captures the ring (see InsetControls).
  // Forcing on `.MuiButtonBase-root` reaches the SwitchBase root, which a `className` can't.
  React.useLayoutEffect(() => {
    ref.current
      ?.querySelectorAll('.MuiButtonBase-root')
      .forEach((el) => el.classList.add('Mui-focusVisible'));
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Stack ref={ref} direction="row" spacing={2} sx={{ p: 2, alignItems: 'center' }}>
        <Checkbox />
        <Checkbox defaultChecked />
        <Radio />
        <Radio defaultChecked />
        <Switch />
        <Switch defaultChecked />
      </Stack>
    </ThemeProvider>
  );
}
