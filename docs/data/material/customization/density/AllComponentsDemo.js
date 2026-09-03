import * as React from 'react';
import { createTheme, enhanceDensity, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import {
  Annotations,
  slotLabel,
  DENSITY_SCALE,
  DENSITY_TARGETS,
  useAnnotations,
} from './densityAnnotations';
import { annotationsFor } from './densityAnnotationSpecs';
import { COMPONENT_NAMES, DENSITY_COMPONENTS } from './densityComponents';

const colorSchemes = { light: true, dark: true };

const densityTheme = enhanceDensity(createTheme({ colorSchemes }));

// Wide enough that the captions in the side gutters have room before the canvas
// starts scrolling.
const STAGE_WIDTH = 620;
const STAGE_HEIGHT = 300;

// Stable identity, so a family without controls doesn't re-run the memos.
const NO_CONTROLS = [];

function ScaleLegend() {
  const [anchor, setAnchor] = React.useState(null);
  const rows = [
    ...Object.entries(DENSITY_SCALE),
    ...Object.entries(DENSITY_TARGETS),
  ];

  return (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="show the density scale"
        onClick={(event) => setAnchor(event.currentTarget)}
      >
        <InfoOutlinedIcon fontSize="small" />
      </IconButton>
      <Popover
        open={anchor !== null}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            The scale every caption below is named from.
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'auto auto',
              columnGap: 2,
              rowGap: 0.5,
            }}
          >
            {rows.map(([step, value]) => (
              <React.Fragment key={step}>
                <Typography variant="body2" sx={{ fontFamily: 'code' }}>
                  {step}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: 'text.secondary', textAlign: 'right' }}
                >
                  {value}px
                </Typography>
              </React.Fragment>
            ))}
          </Box>
        </Box>
      </Popover>
    </React.Fragment>
  );
}

export default function AllComponentsDemo() {
  const [component, setComponent] = React.useState(COMPONENT_NAMES[0]);
  // One set of values per component, so switching away and back keeps the choice.
  const [byComponent, setByComponent] = React.useState({});
  // Annotations the reader has switched off, per family.
  const [hidden, setHidden] = React.useState({});
  const stageRef = React.useRef(null);
  const demoRef = React.useRef(null);

  const spec = DENSITY_COMPONENTS[component];
  const controls = spec.controls ?? NO_CONTROLS;
  const values = React.useMemo(() => {
    const initial = {};
    controls.forEach((control) => {
      initial[control.prop] = control.initial;
    });
    return { ...initial, ...byComponent[component] };
  }, [controls, byComponent, component]);

  const annotations = React.useMemo(
    () => annotationsFor(component, values),
    [component, values],
  );
  const off = hidden[component];
  // One checkbox per slot — every annotation on it hides together.
  const slots = React.useMemo(
    () => [...new Set(annotations.map(slotLabel))],
    [annotations],
  );
  const shown = React.useMemo(
    () => annotations.filter((item) => !off?.includes(slotLabel(item))),
    [annotations, off],
  );
  const measured = useAnnotations(stageRef, demoRef, shown, [
    component,
    values,
    shown,
  ]);

  const toggle = (slot) =>
    setHidden((previous) => {
      const current = previous[component] ?? [];
      return {
        ...previous,
        [component]: current.includes(slot)
          ? current.filter((item) => item !== slot)
          : [...current, slot],
      };
    });

  const setValue = (prop, next) =>
    setByComponent((previous) => ({
      ...previous,
      [component]: { ...previous[component], [prop]: next },
    }));

  return (
    <Paper variant="outlined" sx={{ width: '100%' }}>
      <Box
        sx={{
          px: 2,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <TextField
          select
          size="small"
          label="Component"
          value={component}
          onChange={(event) => setComponent(event.target.value)}
          sx={{ minWidth: 180 }}
        >
          {COMPONENT_NAMES.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </TextField>

        {controls.map((control) =>
          control.type === 'select' ? (
            <TextField
              key={control.prop}
              select
              size="small"
              label={control.prop}
              value={values[control.prop]}
              onChange={(event) => setValue(control.prop, event.target.value)}
              sx={{ minWidth: 140 }}
            >
              {control.options?.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
          ) : (
            <FormControlLabel
              key={control.prop}
              control={
                <Switch
                  checked={values[control.prop] === true}
                  onChange={(event) => setValue(control.prop, event.target.checked)}
                />
              }
              label={control.prop}
            />
          ),
        )}

        <Box sx={{ ml: 'auto' }}>
          <ScaleLegend />
        </Box>
      </Box>
      <Divider />
      {slots.length > 1 ? (
        <React.Fragment>
          <Box
            sx={{
              px: 2,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              flexWrap: 'wrap',
            }}
          >
            <FormLabel sx={{ fontSize: 13 }}>Slot annotation</FormLabel>
            <FormGroup row>
              {slots.map((slot) => (
                <FormControlLabel
                  key={slot}
                  sx={{ mr: 1.5, '& .MuiFormControlLabel-label': { fontSize: 13 } }}
                  control={
                    <Checkbox
                      size="small"
                      checked={!off?.includes(slot)}
                      onChange={() => toggle(slot)}
                    />
                  }
                  label={slot}
                />
              ))}
            </FormGroup>
          </Box>
          <Divider />
        </React.Fragment>
      ) : null}
      <Box sx={{ overflowX: 'auto' }}>
        <Box
          ref={stageRef}
          sx={{
            position: 'relative',
            minWidth: STAGE_WIDTH,
            minHeight: STAGE_HEIGHT,
            px: 11,
            py: 8,
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Box ref={demoRef} sx={{ display: 'contents' }}>
            <ThemeProvider theme={densityTheme}>{spec.render(values)}</ThemeProvider>
          </Box>
          {measured ? (
            <Annotations measured={measured.measured} bounds={measured.bounds} />
          ) : null}
        </Box>
      </Box>
    </Paper>
  );
}
