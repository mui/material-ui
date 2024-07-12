/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Slider from '@mui/material/Slider';

const defaultTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'data-mui-color-scheme',
  defaultColorScheme: 'dark',
});

export default function ShadowsOverlaysViewer() {
  const [index, setIndex] = React.useState(1);
  return (
    <CssVarsProvider disableStyleSheetGeneration theme={defaultTheme}>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          border: 1,
          borderColor: 'divider',
          borderRadius: '4px',
          overflow: 'hidden',
        }}
      >
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
          <Paper
            elevation={index}
            sx={{ width: '50%', minWidth: 100, maxWidth: 160, aspectRatio: '5/7' }}
          />
        </Box>
        <Box
          data-mui-color-scheme="dark"
          sx={{ bgcolor: 'background.paper', p: 3, display: 'flex', justifyContent: 'center' }}
        >
          <Paper
            elevation={index}
            sx={{ width: '50%', minWidth: 100, maxWidth: 160, aspectRatio: '5/7' }}
          />
        </Box>
        <Box
          sx={{
            gridColumn: '1/-1',
            justifySelf: 'center',
            px: 1,
            pt: 3,
            pb: 2,
            width: '100%',
            textAlign: 'center',
            borderTop: 1,
            borderColor: 'divider',
          }}
        >
          <Slider
            value={index}
            onChange={(event, newValue) => setIndex(newValue)}
            step={1}
            max={24}
            valueLabelDisplay="auto"
            sx={{ width: '75%', minWidth: 260 }}
          />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
