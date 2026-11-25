import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';

const theme = createTheme({
  colorSchemes: { light: true, dark: true },
});

export default function FocusVisibleInner() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    // @focus-start @padding 2
    <ThemeProvider theme={theme}>
      <Stack spacing={2} sx={{ alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          Press <kbd>Tab</kbd>, then use the arrow keys — the ring insets so the Tabs
          scroller cannot clip it.
        </Typography>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="One" />
          <Tab label="Two" />
          <Tab label="Three" />
        </Tabs>
      </Stack>
    </ThemeProvider>
    // @focus-end
  );
}
