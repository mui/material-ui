import * as React from 'react';
import { createTheme, enhanceDensity, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Switch from '@mui/material/Switch';
import Slider from '@mui/material/Slider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

const colorSchemes = { light: true, dark: true };

const defaultTheme = createTheme({ colorSchemes });
const densityTheme = enhanceDensity(createTheme({ colorSchemes }));

// A fixed grid keeps both sides on the same columns, so the divider always cuts
// through the same component — only its density differs across the seam.
const card = {
  p: 2,
  height: '100%',
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: 2,
  alignItems: 'center',
  alignContent: 'start',
};
const fullWidth = { gridColumn: '1 / -1' };

function Actions() {
  return (
    <Paper variant="outlined" sx={card}>
      <Button variant="contained" fullWidth>
        Create
      </Button>
      <Button variant="outlined" fullWidth>
        Neutral
      </Button>
      <Button color="error" fullWidth>
        Delete
      </Button>
      <ToggleButtonGroup
        value="bold"
        exclusive
        fullWidth
        aria-label="text formatting"
      >
        <ToggleButton value="bold" aria-label="bold">
          <FormatBoldIcon />
        </ToggleButton>
        <ToggleButton value="italic" aria-label="italic">
          <FormatItalicIcon />
        </ToggleButton>
      </ToggleButtonGroup>
      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
        <IconButton aria-label="edit">
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete">
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
        <Avatar>MU</Avatar>
        <Chip label="Platform" color="primary" />
      </Stack>
    </Paper>
  );
}

function Inputs() {
  return (
    <Paper variant="outlined" sx={card}>
      <TextField label="Project" defaultValue="Acme Corp" fullWidth />
      <TextField label="Team" select defaultValue="engineering" fullWidth>
        <MenuItem value="engineering">Engineering</MenuItem>
        <MenuItem value="design">Design</MenuItem>
      </TextField>
      <Stack direction="row" spacing={1}>
        <FormControlLabel control={<Checkbox defaultChecked />} label="Notify" />
        <FormControlLabel control={<Switch defaultChecked />} label="Public" />
      </Stack>
      <Slider defaultValue={40} sx={fullWidth} aria-label="Completion" />
    </Paper>
  );
}

function Navigation() {
  return (
    <Paper variant="outlined" sx={card}>
      <Tabs value={0} sx={fullWidth}>
        <Tab label="Overview" />
        <Tab label="Activity" />
        <Tab label="Settings" />
      </Tabs>
      <List sx={fullWidth} disablePadding>
        <ListItemButton>
          <ListItemText primary="Profile" secondary="Name, avatar, and handle" />
        </ListItemButton>
        <ListItemButton>
          <ListItemText primary="Billing" secondary="Plan and payment method" />
        </ListItemButton>
      </List>
      <Alert severity="success" sx={fullWidth}>
        Your changes have been saved.
      </Alert>
    </Paper>
  );
}

const sections = [Actions, Inputs, Navigation];

export default function DensityComparison() {
  const containerRef = React.useRef(null);
  const [position, setPosition] = React.useState(50);

  const handlePointerDown = (event) => {
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event) => {
    const container = containerRef.current;
    if (!container || !event.currentTarget.hasPointerCapture(event.pointerId)) {
      return;
    }
    const rect = container.getBoundingClientRect();
    const next = ((event.clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  };

  const handleKeyDown = (event) => {
    const step = event.shiftKey ? 10 : 2;
    if (event.key === 'ArrowLeft') {
      setPosition((prev) => Math.max(0, prev - step));
    } else if (event.key === 'ArrowRight') {
      setPosition((prev) => Math.min(100, prev + step));
    } else if (event.key === 'Home') {
      setPosition(0);
    } else if (event.key === 'End') {
      setPosition(100);
    } else {
      return;
    }
    event.preventDefault();
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Default theme
        </Typography>
        <Typography variant="caption" color="text.secondary">
          With <code>enhanceDensity</code>
        </Typography>
      </Stack>

      <Box ref={containerRef} sx={{ position: 'relative' }}>
        <Stack spacing={2}>
          {sections.map((Section, index) => (
            <Box key={index} sx={{ position: 'relative' }}>
              <ThemeProvider theme={defaultTheme}>
                <Section />
              </ThemeProvider>
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  clipPath: `inset(0 0 0 ${position}%)`,
                }}
              >
                <ThemeProvider theme={densityTheme}>
                  <Section />
                </ThemeProvider>
              </Box>
            </Box>
          ))}
        </Stack>

        <Box
          role="slider"
          tabIndex={0}
          aria-label="Compare the default theme with the density-enhanced theme"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          aria-valuetext={`${Math.round(position)}% density-enhanced`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onKeyDown={handleKeyDown}
          sx={(theme) => ({
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${position}%`,
            width: 32,
            ml: '-16px',
            cursor: 'ew-resize',
            touchAction: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              bottom: 0,
              width: 2,
              bgcolor: 'primary.main',
            },
            '&:focus-visible': { outline: 'none' },
            '&:focus-visible > div': {
              outline: `2px solid ${(theme.vars || theme).palette.primary.main}`,
              outlineOffset: 2,
            },
          })}
        >
          <Box
            sx={{
              zIndex: 1,
              width: 28,
              height: 28,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'primary.contrastText',
              bgcolor: 'primary.main',
              boxShadow: 2,
            }}
          >
            <SwapHorizIcon fontSize="small" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
