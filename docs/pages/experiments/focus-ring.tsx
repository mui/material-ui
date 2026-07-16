'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import Link from '@mui/material/Link';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Select from '@mui/material/Select';
import Rating from '@mui/material/Rating';
import InputLabel from '@mui/material/InputLabel';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import Chip from '@mui/material/Chip';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
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
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import { createTheme, ThemeProvider } from '@mui/material/styles';

type Preset = 'off' | 'true' | 'recolor' | 'twocolor' | 'shadowonly';

const PRESETS: Record<Preset, { label: string; value: boolean | React.CSSProperties | undefined }> =
  {
    off: { label: 'off', value: undefined },
    true: { label: 'true (curated)', value: true },
    recolor: { label: 'recolor', value: { outlineColor: '#9c27b0' } },
    twocolor: {
      label: 'two-color (C40)',
      value: { boxShadow: 'var(--_focusVisible-behavior, ) 0 0 0 4px gold' },
    },
    shadowonly: {
      label: 'box-shadow only',
      value: {
        outlineColor: 'transparent',
        boxShadow: 'var(--_focusVisible-behavior, ) 0 0 0 4px gold',
      },
    },
  };

const noop = () => {};

// Resolve the element that carries `.Mui-focusVisible`. ButtonBase controls carry it on
// the root (form controls put `data-ring-target` on the inner <input>); Slider carries it
// on the thumb while focus lands on the thumb's inner <input>; Rating carries it on the root
// while focus lands on the active item's hidden <input>, and the ring is drawn on the active
// icon child only; Link carries it on itself.
const ringEl = (el: HTMLElement): HTMLElement =>
  el.closest<HTMLElement>('.MuiButtonBase-root') ??
  el.closest<HTMLElement>('.MuiSlider-thumb') ??
  el.closest<HTMLElement>('.MuiRating-root') ??
  el;

const isRingDisabled = (el: HTMLElement): boolean => {
  const root = ringEl(el);
  return (
    root.classList.contains('Mui-disabled') ||
    root.getAttribute('aria-disabled') === 'true' ||
    (el as HTMLInputElement).disabled === true
  );
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <React.Fragment>
      <Typography variant="body2" sx={{ fontWeight: 600, alignSelf: 'center' }}>
        {label}
      </Typography>
      <Stack
        direction="row"
        spacing={1.5}
        sx={{ alignItems: 'center', flexWrap: 'wrap', rowGap: 1 }}
      >
        {children}
      </Stack>
    </React.Fragment>
  );
}

function Bucket({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
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
    <Bucket
      title="outer-ring"
      hint="Standalone — the ring sits OUTSIDE (outlineOffset +2), renders fully."
    >
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
      <Row label="ButtonGroup">
        <ButtonGroup variant="outlined">
          <Button data-ring-target="ButtonGroup">One</Button>
          <Button data-ring-target="ButtonGroup">Two</Button>
        </ButtonGroup>
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
      <Row label="Fab">
        <Fab size="small" color="primary" aria-label="add" data-ring-target="Fab (elevation)">
          <AddIcon />
        </Fab>
      </Row>
      <Row label="Chip">
        <Chip label="Clickable" onClick={noop} data-ring-target="Chip" />
        <Chip label="Deletable" onDelete={noop} data-ring-target="Chip" />
      </Row>
      <Row label="Checkbox">
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              slotProps={{
                input: {
                  'data-ring-target': 'Checkbox',
                } as React.InputHTMLAttributes<HTMLInputElement>,
              }}
            />
          }
          label="Checkbox"
        />
      </Row>
      <Row label="Radio">
        <FormControlLabel
          control={
            <Radio
              defaultChecked
              slotProps={{
                input: {
                  'data-ring-target': 'Radio',
                } as React.InputHTMLAttributes<HTMLInputElement>,
              }}
            />
          }
          label="Radio"
        />
      </Row>
      <Row label="Switch">
        <FormControlLabel
          control={
            <Switch
              defaultChecked
              slotProps={{
                input: {
                  'data-ring-target': 'Switch',
                } as React.InputHTMLAttributes<HTMLInputElement>,
              }}
            />
          }
          label="Switch"
        />
      </Row>
      <Row label="Stepper">
        <Stepper nonLinear activeStep={0} sx={{ minWidth: 260 }}>
          <Step>
            {/* suppressFocusVisible is an internal ButtonBase escape hatch, not public-typed */}
            <StepButton
              {...({ suppressFocusVisible: true } as React.ComponentProps<typeof StepButton>)}
              data-ring-target="StepButton"
            >
              One
            </StepButton>
          </Step>
          <Step>
            <StepButton data-ring-target="StepButton">Two</StepButton>
          </Step>
        </Stepper>
      </Row>
      <Row label="Pagination">
        <Pagination
          count={3}
          renderItem={(item) => <PaginationItem {...item} data-ring-target="PaginationItem" />}
        />
      </Row>
      <Row label="ButtonBase">
        <ButtonBase
          data-ring-target="ButtonBase (bare)"
          sx={{ px: 1.5, py: 1, border: '1px dashed', borderColor: 'divider', borderRadius: 1 }}
        >
          ButtonBase
        </ButtonBase>
      </Row>
      <Row label="AccordionSummary">
        <Accordion disableGutters sx={{ width: 280 }}>
          <AccordionSummary data-ring-target="AccordionSummary">Accordion header</AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2">Details</Typography>
          </AccordionDetails>
        </Accordion>
      </Row>
      <Row label="TableSortLabel">
        <TableContainer component={Paper} variant="outlined" sx={{ width: 280 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel active direction="asc" data-ring-target="TableSortLabel">
                    Name
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel data-ring-target="TableSortLabel">Size</TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>file.txt</TableCell>
                <TableCell>12 KB</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
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
        <List
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            minWidth: 200,
            py: 0,
          }}
        >
          <ListItemButton data-ring-target="ListItemButton">
            <ListItemText primary="List item" />
          </ListItemButton>
        </List>
      </Row>
      <Row label="BottomNavigation">
        <BottomNavigation
          showLabels
          value={0}
          sx={{ width: 320, border: 1, borderColor: 'divider', borderRadius: 1 }}
        >
          <BottomNavigationAction
            label="Star"
            icon={<StarIcon />}
            data-ring-target="BottomNavigationAction"
          />
          <BottomNavigationAction
            label="Add"
            icon={<AddIcon />}
            data-ring-target="BottomNavigationAction"
          />
        </BottomNavigation>
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
      <Row label="Select">
        {/* Trigger is InputBase (no ring); its dropdown items are MenuItem (ButtonBase) → inset ring. */}
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel id="fv-select-label">Select</InputLabel>
          <Select
            labelId="fv-select-label"
            label="Select"
            defaultValue="a"
            MenuProps={{ disablePortal: true }}
          >
            <MenuItem value="a">Option A</MenuItem>
            <MenuItem value="b">Option B</MenuItem>
            <MenuItem value="c">Option C</MenuItem>
          </Select>
        </FormControl>
      </Row>
      <Row label="Autocomplete">
        {/* Input is InputBase (no ring); options are plain <li> → curated inset ring on keyboard nav. */}
        <Autocomplete
          disablePortal
          options={['Apple', 'Banana', 'Cherry']}
          sx={{ width: 220 }}
          renderInput={(params) => <TextField {...params} label="Autocomplete" size="small" />}
        />
      </Row>
    </Bucket>
  );
}

function OwnFocus() {
  return (
    <Bucket
      title="own focus (non-ButtonBase)"
      hint="Not ButtonBase — the ring comes from each component's own focus-visible state (Slider thumb, Link, Breadcrumb links), not the shared ButtonBase rule."
    >
      <Row label="Slider">
        <Slider
          defaultValue={40}
          aria-label="Volume"
          sx={{ width: 200 }}
          slotProps={{
            input: { 'data-ring-target': 'Slider' } as React.InputHTMLAttributes<HTMLInputElement>,
          }}
        />
      </Row>
      <Row label="Link">
        <Link href="#link" data-ring-target="Link">
          Text link
        </Link>
      </Row>
      <Row label="Breadcrumbs">
        <Breadcrumbs>
          <Link href="#link" data-ring-target="Breadcrumbs link">
            Home
          </Link>
          <Link href="#link" data-ring-target="Breadcrumbs link">
            Catalog
          </Link>
          <Typography color="text.primary">Item</Typography>
        </Breadcrumbs>
      </Row>
      <Row label="Rating">
        {/* Class lands on the root; the ring is drawn on the active icon only. */}
        <Rating defaultValue={3} data-ring-target="Rating" />
      </Row>
    </Bucket>
  );
}

export default function FocusVisible() {
  const [preset, setPreset] = React.useState<Preset>('true');
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');
  const [vars, setVars] = React.useState(false); // N3
  const [disableRipple, setDisableRipple] = React.useState(false); // N6
  const [customJson, setCustomJson] = React.useState(''); // N2
  const [focused, setFocused] = React.useState<string | null>(null);
  const [ringIdx, setRingIdx] = React.useState(-1); // N1
  const [total, setTotal] = React.useState(0); // N1

  // N2 — a non-empty, valid JSON object overrides the selected preset.
  const custom = React.useMemo(() => {
    const text = customJson.trim();
    if (!text) {
      return {
        value: undefined as boolean | React.CSSProperties | undefined,
        error: false,
        active: false,
      };
    }
    try {
      return { value: JSON.parse(text) as React.CSSProperties, error: false, active: true };
    } catch {
      return { value: undefined, error: true, active: true };
    }
  }, [customJson]);

  const focusVisibleValue = custom.active && !custom.error ? custom.value : PRESETS[preset].value;

  const theme = React.useMemo(
    () =>
      createTheme({
        cssVariables: vars,
        palette: { mode },
        focusVisible: focusVisibleValue,
        // N6 — opt into the flat look: no ripple, so keyboard focus relies entirely on the ring.
        // ButtonGroup re-broadcasts its own `disableRipple` (default false) to child buttons via
        // context, which shadows the MuiButtonBase default — so set it on MuiButtonGroup too.
        ...(disableRipple && {
          components: {
            MuiButtonBase: { defaultProps: { disableRipple: true } },
            MuiButtonGroup: { defaultProps: { disableRipple: true } },
          },
        }),
      }),
    [vars, mode, focusVisibleValue, disableRipple],
  );

  // N4 — the normalized, resolved ring object the gallery actually renders.
  const resolved = JSON.stringify(theme.focusVisible ?? null, null, 2);

  let customHelp = 'Empty → use the preset above';
  if (custom.error) {
    customHelp = 'Invalid JSON';
  } else if (custom.active) {
    customHelp = 'Overrides the preset above';
  }

  // N1 — pointer-driven ring shim (experiment-only): forces `.Mui-focusVisible`
  // on the ring-bearing root so reviewers can step through with the mouse.
  // `data-ring-target` lives only in the gallery, so a document query is safe.
  const ringTargets = React.useCallback(
    () => Array.from(document.querySelectorAll<HTMLElement>('[data-ring-target]')),
    [],
  );
  // The walk steps over enabled targets only — disabled controls take no ring.
  const walkTargets = React.useCallback(
    () => ringTargets().filter((el) => !isRingDisabled(el)),
    [ringTargets],
  );
  const applyRing = React.useCallback(
    (idx: number) => {
      const targets = walkTargets();
      ringTargets().forEach((el) => ringEl(el).classList.remove('Mui-focusVisible'));
      const el = targets[idx];
      if (el) {
        ringEl(el).classList.add('Mui-focusVisible');
      }
      setRingIdx(idx);
      setFocused(el?.getAttribute('data-ring-target') ?? null);
    },
    [walkTargets, ringTargets],
  );
  const step = (delta: number) => {
    const targets = walkTargets();
    if (targets.length === 0) {
      return;
    }
    const base = ringIdx < 0 ? -1 : ringIdx;
    applyRing((base + delta + targets.length) % targets.length);
  };

  React.useEffect(() => {
    setTotal(walkTargets().length);
  }, [walkTargets, preset, vars, mode, focusVisibleValue, disableRipple]);

  return (
    <Box sx={{ maxWidth: 1120, mx: 'auto' }}>
      {/* Header band — controls live outside the themed gallery, so they never pick up the ring. */}
      <Box sx={{ px: 3, py: 2, borderBottom: 1, borderColor: 'divider' }}>
        <Stack
          direction="row"
          spacing={2}
          sx={{
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            rowGap: 1,
          }}
        >
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h5">
              Focus visible — <code>theme.focusVisible</code>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ⌨ Press Tab / Shift+Tab — the ring shows on <code>:focus-visible</code> (keyboard)
              only; clicks never show it.
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
              Focused: <strong>{focused ?? '— (tab into the gallery)'}</strong>
            </Typography>
          </Box>
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
      </Box>

      {/* Two columns: sticky controls (left) + gallery (right). */}
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        sx={{ p: 3, alignItems: 'flex-start' }}
      >
        <Paper
          variant="outlined"
          sx={{ p: 2, width: 260, flexShrink: 0, position: { md: 'sticky' }, top: 16 }}
        >
          <Stack spacing={2}>
            <FormControl disabled={custom.active}>
              <FormLabel sx={{ typography: 'subtitle2', mb: 1 }}>Preset</FormLabel>
              <RadioGroup
                value={preset}
                onChange={(event) => setPreset(event.target.value as Preset)}
              >
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

            <Divider />

            {/* N3 — CSS vars on/off */}
            <FormControlLabel
              control={<Switch size="small" checked={vars} onChange={(_, v) => setVars(v)} />}
              label={
                <Typography variant="body2">
                  CSS variables (<code>theme.vars</code>)
                </Typography>
              }
            />

            {/* N6 — disable ripple app-wide via MuiButtonBase defaultProps */}
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  checked={disableRipple}
                  onChange={(_, v) => setDisableRipple(v)}
                />
              }
              label={
                <Typography variant="body2">
                  Disable ripple (<code>MuiButtonBase</code>)
                </Typography>
              }
            />

            {/* N2 — custom JSON editor */}
            <TextField
              label="Custom focusVisible (JSON)"
              value={customJson}
              onChange={(event) => setCustomJson(event.target.value)}
              placeholder={'{ "boxShadow": "var(--_focusVisible-behavior, ) 0 0 0 4px gold" }'}
              error={custom.error}
              helperText={customHelp}
              multiline
              minRows={3}
              size="small"
              slotProps={{ htmlInput: { style: { fontFamily: 'monospace', fontSize: 12 } } }}
            />

            <Divider />

            {/* N1 — pointer toolbar (experiment-only shim) */}
            <div>
              <FormLabel sx={{ typography: 'subtitle2', mb: 1, display: 'block' }}>
                Pointer walk (no keyboard)
              </FormLabel>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                <Button size="small" variant="outlined" onClick={() => step(-1)}>
                  ‹ Prev
                </Button>
                <Button size="small" variant="outlined" onClick={() => step(1)}>
                  Next ›
                </Button>
                <Typography variant="caption" color="text.secondary">
                  {ringIdx < 0 ? 0 : ringIdx + 1}/{total}
                </Typography>
              </Stack>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
                Experiment-only shim: forces <code>.Mui-focusVisible</code> so you can preview the
                ring with the mouse. Real keyboard <kbd>Tab</kbd> stays the source of truth.
              </Typography>
            </div>

            <Divider />

            {/* N4 — resolved value */}
            <div>
              <FormLabel sx={{ typography: 'subtitle2', mb: 1, display: 'block' }}>
                Resolved <code>theme.focusVisible</code>
              </FormLabel>
              <Box
                component="pre"
                sx={{
                  m: 0,
                  p: 1,
                  borderRadius: 1,
                  bgcolor: 'action.hover',
                  fontSize: 11,
                  overflowX: 'auto',
                  whiteSpace: 'pre-wrap',
                }}
              >
                {resolved}
              </Box>
            </div>
          </Stack>
        </Paper>

        <Box
          sx={{ flex: 1, minWidth: 0 }}
          onFocusCapture={(event) => {
            const target = event.target as HTMLElement;
            setFocused(target.getAttribute('data-ring-target'));
            // Real keyboard focus wins: drop the pointer shim from every ring root
            // except the one being focused, so there's never a double-ring.
            const focusedRing = ringEl(target);
            ringTargets().forEach((el) => {
              const root = ringEl(el);
              if (root !== focusedRing) {
                root.classList.remove('Mui-focusVisible');
              }
            });
            setRingIdx(-1);
          }}
          onBlurCapture={() => setFocused(null)}
        >
          <ThemeProvider theme={theme}>
            <Stack spacing={3}>
              <Paper variant="outlined" sx={{ p: 3, bgcolor: 'background.default' }}>
                <OuterRing />
              </Paper>
              <Paper variant="outlined" sx={{ p: 3, bgcolor: 'background.default' }}>
                <InnerRing />
              </Paper>
              <Paper variant="outlined" sx={{ p: 3, bgcolor: 'background.default' }}>
                <OwnFocus />
              </Paper>
            </Stack>
          </ThemeProvider>

          <Stack spacing={1} sx={{ mt: 3 }}>
            <Typography variant="subtitle2">Edge cases</Typography>
            <Typography variant="body2" color="text.secondary">
              • <strong>Contained Button / Fab (elevation override):</strong> these animate their
              own <code>box-shadow</code> on focus, so the <em>two-color</em> preset&apos;s
              box-shadow may be overridden on them — but the <code>outline</code> baseline always
              shows.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • <strong>Disabled + focusVisible:</strong> Button/IconButton set their own outline on{' '}
              <code>disabled.focusVisible</code> at higher specificity, winning in that narrow
              state.
            </Typography>
            {/* N5 — extra edge callouts */}
            <Typography variant="body2" color="text.secondary">
              •{' '}
              <strong>
                <code>overflow: hidden</code> clip:
              </strong>{' '}
              a standalone outer ring is clipped to nothing inside an <code>overflow: hidden</code>{' '}
              ancestor (e.g. Card). The inner-ring families set two private vars the ring reads —{' '}
              <code>--_focusVisible-offset: -1</code> flips the outline inward, and{' '}
              <code>--_focusVisible-behavior: inset</code> insets a custom box-shadow — so both
              techniques draw inside the box.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • <strong>Forced colors:</strong> in forced-colors mode the UA paints its own focus
              indicator and <code>outline-color</code> is overridden by the system, so the curated
              color is not guaranteed there — by design.
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
