import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const colors = ['primary', 'secondary', 'success', 'error', 'info', 'warning', 'inherit'];

// A plain render helper (not a component) so the `mode` key does not need
// prop-types validation, matching the sibling Linear fixture's flat style.
const renderMatrix = (mode) => (
  <Box sx={{ color: 'text.primary', display: 'grid', gap: 2 }}>
    {colors.map((color) => (
      <Box key={`${mode}-${color}`} sx={{ display: 'flex', gap: 2 }}>
        <CircularProgress color={color} aria-label={`${color} indeterminate`} />
        <CircularProgress
          color={color}
          variant="determinate"
          value={60}
          aria-label={`${color} determinate`}
        />
        <CircularProgress
          color={color}
          variant="determinate"
          value={60}
          enableTrackSlot
          aria-label={`${color} determinate with track`}
        />
      </Box>
    ))}
  </Box>
);

export default function CircularProgressA11yColorMatrix() {
  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      {renderMatrix('light')}
      <ThemeProvider theme={createTheme({ palette: { mode: 'dark' } })}>
        <Box sx={{ bgcolor: 'background.default', p: 2 }}>{renderMatrix('dark')}</Box>
      </ThemeProvider>
    </Box>
  );
}
