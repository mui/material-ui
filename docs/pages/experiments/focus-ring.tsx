'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
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

// Inner-ring bucket: same preset, but pulled inside (offset ≤ 0) so a scrollable
// container can't clip it.
function toInset(value: boolean | React.CSSProperties | undefined): boolean | React.CSSProperties | undefined {
  if (value == null || value === false) {
    return value;
  }
  return value === true ? { outlineOffset: -2 } : { ...value, outlineOffset: -2 };
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Typography variant="body2" sx={{ fontWeight: 600, alignSelf: 'center' }}>
        {label}
      </Typography>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', flexWrap: 'wrap', rowGap: 1 }}>
        {children}
      </Stack>
    </React.Fragment>
  );
}

function Bucket({ title, hint, children }: { title: string; hint: string; children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Typography variant="overline" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1.5 }}>
        {hint}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: '150px 1fr',
          alignItems: 'center',
          columnGap: 3,
          rowGap: 2,
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

function OuterRing() {
  return (
    <Bucket title="outer-ring" hint="Standalone — the ring sits OUTSIDE (outlineOffset +2), renders fully.">
      <Row label="Button">
        <Button variant="text" data-ring-target="Button (text)">
          Text
        </Button>
        <Button variant="outlined" data-ring-target="Button (outlined)">
          Outlined
        </Button>
        <Button variant="contained" data-ring-target="Button (contained — elevation)">
          Contained
        </Button>
      </Row>
      <Row label="IconButton">
        <IconButton aria-label="star" data-ring-target="IconButton">
          <StarIcon />
        </IconButton>
      </Row>
      <Row label="Fab">
        <Fab size="small" color="primary" aria-label="add" data-ring-target="Fab (elevation)">
          <AddIcon />
        </Fab>
      </Row>
      <Row label="ToggleButton">
        <ToggleButtonGroup value="left" exclusive>
          <ToggleButton value="left" data-ring-target="ToggleButton">
            Left
          </ToggleButton>
          <ToggleButton value="right" data-ring-target="ToggleButton">
            Right
          </ToggleButton>
        </ToggleButtonGroup>
      </Row>
      <Row label="CardActionArea">
        <Card variant="outlined" sx={{ width: 160 }}>
          <CardActionArea data-ring-target="CardActionArea">
            <Box sx={{ p: 2 }}>
              <Typography variant="body2">Card</Typography>
            </Box>
          </CardActionArea>
        </Card>
      </Row>
      <Row label="ButtonBase">
        <ButtonBase
          data-ring-target="ButtonBase (bare)"
          sx={{ px: 1.5, py: 1, border: '1px dashed', borderColor: 'divider', borderRadius: 1 }}
        >
          ButtonBase
        </ButtonBase>
      </Row>
    </Bucket>
  );
}

function InnerRing() {
  return (
    <Bucket
      title="inner-ring"
      hint="Likely inside a scrollable / overflow-clipped container — the ring is INSET (outlineOffset −2) so it can't be clipped."
    >
      <Row label="Tab">
        <Tabs value={0} sx={{ minHeight: 0 }}>
          <Tab label="Tab one" data-ring-target="Tab" />
          <Tab label="Tab two" data-ring-target="Tab" />
        </Tabs>
      </Row>
      <Row label="MenuItem">
        <MenuList sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
          <MenuItem data-ring-target="MenuItem">Profile</MenuItem>
          <MenuItem data-ring-target="MenuItem">Settings</MenuItem>
        </MenuList>
      </Row>
      <Row label="ListItemButton">
        <List sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, minWidth: 200, py: 0 }}>
          <ListItemButton data-ring-target="ListItemButton">
            <ListItemText primary="List item" />
          </ListItemButton>
        </List>
      </Row>
    </Bucket>
  );
}

export default function FocusRing() {
  const [preset, setPreset] = React.useState<Preset>('true');
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const [focused, setFocused] = React.useState<string | null>(null);

  const outerTheme = React.useMemo(
    () => createTheme({ palette: { mode }, focusRing: PRESETS[preset].value }),
    [mode, preset],
  );
  const innerTheme = React.useMemo(
    () => createTheme({ palette: { mode }, focusRing: toInset(PRESETS[preset].value) }),
    [mode, preset],
  );

  return (
    <Box sx={{ maxWidth: 1120, mx: 'auto' }}>
      {/* Header band — controls live outside the themed gallery, so they never pick up the ring. */}
      <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', rowGap: 1 }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h5">
              Focus ring — <code>theme.focusRing</code>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ⌨ Press Tab / Shift+Tab — the ring shows on <code>:focus-visible</code> (keyboard) only;
              clicks never show it.
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
              Focused: <strong>{focused ?? '— (tab into the gallery)'}</strong>
            </Typography>
          </Box>
          <ToggleButtonGroup size="small" exclusive value={mode} onChange={(_, v) => v && setMode(v)}>
            <ToggleButton value="light">light</ToggleButton>
            <ToggleButton value="dark">dark</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
      </Box>

      {/* Two columns: sticky controls (left) + gallery (right). */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ p: 3, alignItems: 'flex-start' }}>
        <Paper variant="outlined" sx={{ p: 2, minWidth: 210, position: { md: 'sticky' }, top: 16 }}>
          <FormControl>
            <FormLabel sx={{ typography: 'subtitle2', mb: 1 }}>Preset</FormLabel>
            <RadioGroup value={preset} onChange={(event) => setPreset(event.target.value as Preset)}>
              {(Object.keys(PRESETS) as Preset[]).map((p) => (
                <FormControlLabel
                  key={p}
                  value={p}
                  control={<Radio size="small" />}
                  label={PRESETS[p].label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>

        <Box
          sx={{ flex: 1, minWidth: 0 }}
          onFocusCapture={(event) =>
            setFocused((event.target as HTMLElement).getAttribute('data-ring-target'))
          }
          onBlurCapture={() => setFocused(null)}
        >
          <Stack spacing={3}>
            <Paper variant="outlined" sx={{ p: 3, bgcolor: 'background.default' }}>
              <ThemeProvider theme={outerTheme}>
                <OuterRing />
              </ThemeProvider>
            </Paper>
            <Paper variant="outlined" sx={{ p: 3, bgcolor: 'background.default' }}>
              <ThemeProvider theme={innerTheme}>
                <InnerRing />
              </ThemeProvider>
            </Paper>
          </Stack>

          <Stack spacing={1} sx={{ mt: 3 }}>
            <Typography variant="subtitle2">Edge cases</Typography>
            <Typography variant="body2" color="text.secondary">
              • <strong>Contained Button / Fab (elevation override):</strong> these animate their own{' '}
              <code>box-shadow</code> on focus, so the <em>two-color</em> preset&apos;s box-shadow may
              be overridden on them — but the <code>outline</code> baseline always shows.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • <strong>Disabled + focusVisible:</strong> Button/IconButton set their own outline on{' '}
              <code>disabled.focusVisible</code> at higher specificity, winning in that narrow state.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
