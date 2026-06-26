'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import ButtonBase from '@mui/material/ButtonBase';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type Preset = 'off' | 'true' | 'recolor' | 'twocolor' | 'shadowonly';

const PRESETS: Record<Preset, { label: string; value: boolean | React.CSSProperties | undefined }> = {
  off: { label: 'off', value: undefined },
  true: { label: 'true (curated)', value: true },
  recolor: { label: 'recolor', value: { outlineColor: '#9c27b0' } },
  twocolor: { label: 'two-color (C40)', value: { boxShadow: '0 0 0 4px gold' } },
  shadowonly: { label: 'box-shadow only', value: { outlineColor: 'transparent', boxShadow: '0 0 0 4px gold' } },
};

function Gallery() {
  return (
    <Stack spacing={2.5} sx={{ flexWrap: 'wrap' }}>
      <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap', rowGap: 2 }}>
        <Button variant="text" data-ring-target="Button (text)">
          Text
        </Button>
        <Button variant="outlined" data-ring-target="Button (outlined)">
          Outlined
        </Button>
        <Button variant="contained" data-ring-target="Button (contained — elevation)">
          Contained
        </Button>
        <IconButton aria-label="star" data-ring-target="IconButton">
          <StarIcon />
        </IconButton>
        <Fab size="small" color="primary" aria-label="add" data-ring-target="Fab (elevation)">
          <AddIcon />
        </Fab>
        <ButtonBase
          data-ring-target="ButtonBase (bare)"
          sx={{ px: 1.5, py: 1, border: '1px dashed', borderColor: 'divider', borderRadius: 1 }}
        >
          ButtonBase
        </ButtonBase>
      </Stack>

      <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', rowGap: 2, alignItems: 'flex-start' }}>
        <Tabs value={0} sx={{ minHeight: 0 }}>
          <Tab label="Tab one" data-ring-target="Tab" />
          <Tab label="Tab two" data-ring-target="Tab" />
        </Tabs>
        <ToggleButtonGroup value="left" exclusive>
          <ToggleButton value="left" data-ring-target="ToggleButton">
            Left
          </ToggleButton>
          <ToggleButton value="right" data-ring-target="ToggleButton">
            Right
          </ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Stack direction="row" spacing={3} sx={{ flexWrap: 'wrap', rowGap: 2, alignItems: 'flex-start' }}>
        <MenuList sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
          <MenuItem data-ring-target="MenuItem">Profile</MenuItem>
          <MenuItem data-ring-target="MenuItem">Settings</MenuItem>
        </MenuList>
        <List sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, minWidth: 180 }}>
          <ListItemButton data-ring-target="ListItemButton">
            <ListItemText primary="ListItemButton" />
          </ListItemButton>
        </List>
        <Card variant="outlined" sx={{ width: 180 }}>
          <CardActionArea data-ring-target="CardActionArea">
            <Box sx={{ p: 2 }}>
              <Typography variant="body2">CardActionArea</Typography>
            </Box>
          </CardActionArea>
        </Card>
      </Stack>
    </Stack>
  );
}

export default function FocusRing() {
  const [preset, setPreset] = React.useState<Preset>('true');
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const [focused, setFocused] = React.useState<string | null>(null);

  const theme = React.useMemo(
    () => createTheme({ palette: { mode }, focusRing: PRESETS[preset].value }),
    [mode, preset],
  );

  return (
    <Box sx={{ p: 4, maxWidth: 980 }}>
      <Typography variant="h4" gutterBottom>
        Focus ring — <code>theme.focusRing</code>
      </Typography>

      <Alert severity="info" sx={{ mb: 2 }}>
        Tab / Shift+Tab through the gallery with the <strong>keyboard</strong> — the ring shows on{' '}
        <code>:focus-visible</code> only (mouse clicks never show it). Switch presets and toggle
        dark to compare.
      </Alert>

      {/* Controls live outside the themed gallery, so they never pick up the experiment ring. */}
      <Stack direction="row" spacing={2} sx={{ mb: 1, flexWrap: 'wrap', rowGap: 1, alignItems: 'center' }}>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={preset}
          onChange={(_, v) => v && setPreset(v)}
        >
          {(Object.keys(PRESETS) as Preset[]).map((p) => (
            <ToggleButton key={p} value={p}>
              {PRESETS[p].label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
        <ToggleButtonGroup
          size="small"
          exclusive
          value={mode}
          onChange={(_, v) => v && setMode(v)}
        >
          <ToggleButton value="light">light</ToggleButton>
          <ToggleButton value="dark">dark</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 2, minHeight: 18 }}>
        Focused: <strong>{focused ?? '— (tab into the gallery)'}</strong>
      </Typography>

      <ThemeProvider theme={theme}>
        <Paper
          variant="outlined"
          onFocusCapture={(event) =>
            setFocused((event.target as HTMLElement).getAttribute('data-ring-target'))
          }
          onBlurCapture={() => setFocused(null)}
          sx={{ p: 3, bgcolor: 'background.default' }}
        >
          <Gallery />
        </Paper>
      </ThemeProvider>

      <Stack spacing={1} sx={{ mt: 3 }}>
        <Typography variant="subtitle2">Edge cases</Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Contained Button / Fab (elevation override):</strong> these animate their own{' '}
          <code>box-shadow</code> on focus, so the <em>two-color</em> preset&apos;s box-shadow may be
          overridden on them — but the <code>outline</code> baseline always shows.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • <strong>Disabled + focusVisible:</strong> Button/IconButton set their own outline on{' '}
          <code>disabled.focusVisible</code> at higher specificity, winning in that narrow state.
        </Typography>
      </Stack>
    </Box>
  );
}
