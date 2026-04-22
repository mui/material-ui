'use client';
import * as React from 'react';
import Button from '@mui/material/Button';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type ReducedMotionMode = 'never' | 'system' | 'always';

export default function ReducedMotionToggleExperiment() {
  const [mode, setMode] = React.useState<ReducedMotionMode>('system');
  const [expanded, setExpanded] = React.useState(true);
  const [highlighted, setHighlighted] = React.useState(true);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);

  const theme = React.useMemo(
    () =>
      createTheme({
        transitions: {
          reducedMotion: mode,
        },
      }),
    [mode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Stack spacing={2}>
          <Stack spacing={1}>
            <Typography variant="h6">Reduced motion toggle</Typography>
            <ToggleButtonGroup
              size="small"
              exclusive
              value={mode}
              onChange={(_event, value) => {
                if (value) {
                  setMode(value);
                }
              }}
            >
              <ToggleButton value="never">Full</ToggleButton>
              <ToggleButton value="system">System</ToggleButton>
              <ToggleButton value="always">Reduced</ToggleButton>
            </ToggleButtonGroup>
          </Stack>

          <Paper variant="outlined" sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setExpanded((prev) => !prev)}
                >
                  Toggle collapse
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setHighlighted((prev) => !prev)}
                >
                  Toggle opt-out fade
                </Button>
                <Button size="small" variant="outlined" onClick={() => setSnackbarOpen(true)}>
                  Show snackbar
                </Button>
              </Stack>

              <Collapse in={expanded}>
                <Paper variant="outlined" sx={{ p: 1.5 }}>
                  <Typography variant="body2">
                    This collapse follows the theme&apos;s reduced-motion mode.
                  </Typography>
                </Paper>
              </Collapse>

              <Fade in={highlighted} disablePrefersReducedMotion>
                <Paper variant="outlined" sx={{ p: 1.5 }}>
                  <Typography variant="body2">
                    This fade opts out with <code>disablePrefersReducedMotion</code>.
                  </Typography>
                </Paper>
              </Fade>

              <Snackbar
                open={snackbarOpen}
                autoHideDuration={2500}
                onClose={() => setSnackbarOpen(false)}
                message="Snackbar uses the same transition contract."
              />
            </Stack>
          </Paper>
        </Stack>
      </Container>
    </ThemeProvider>
  );
}
