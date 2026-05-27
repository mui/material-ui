'use client';
import * as React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Pagination from '@mui/material/Pagination';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Local verification fixture for the spacing-derivation rollout.
// Used by scripts/spacing-screenshots. Renders one component's load-bearing
// matrix inside #spacing-scope; the harness overrides --mui-spacing on it.
// Add a component's matrix to `demos` before verifying it. Keep matrices tight
// — every variant/size that has a distinct spacing value, nothing else.
const theme = createTheme({ cssVariables: true });

const demos: Record<string, React.ReactNode> = {
  Button: (
    <Stack spacing={2} useFlexGap>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <Stack key={size} direction="row" spacing={2} useFlexGap sx={{ alignItems: 'center' }}>
          <Button variant="contained" size={size}>
            Contained
          </Button>
          <Button variant="outlined" size={size}>
            Outlined
          </Button>
          <Button variant="text" size={size}>
            Text
          </Button>
        </Stack>
      ))}
    </Stack>
  ),
  FilledInput: (
    <Stack spacing={2} useFlexGap sx={{ maxWidth: 280 }}>
      <TextField label="filled medium" variant="filled" />
      <TextField label="filled small" variant="filled" size="small" />
      <TextField label="filled value" variant="filled" defaultValue="Value" />
      <TextField label="filled value sm" variant="filled" size="small" defaultValue="Value" />
      <TextField
        label="filled adornments"
        variant="filled"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          },
        }}
      />
      <TextField label="filled multiline" variant="filled" multiline rows={2} />
    </Stack>
  ),
  ListFamily: (
    <List sx={{ width: 320, border: '1px dashed #bbb' }}>
      <ListSubheader>Subheader</ListSubheader>
      <ListItem>
        <ListItemIcon>
          <Box sx={{ width: 24, height: 24, bgcolor: 'currentColor', borderRadius: '2px' }} />
        </ListItemIcon>
        <ListItemText primary="Single line item" />
      </ListItem>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar>A</Avatar>
        </ListItemAvatar>
        <ListItemText primary="Two line item" secondary="Secondary text here" />
      </ListItem>
      <ListItemButton>
        <ListItemText primary="Button item" />
      </ListItemButton>
      <ListItemButton dense>
        <ListItemText primary="Dense button item" />
      </ListItemButton>
      <ListItemText inset primary="Inset text" />
    </List>
  ),
  MenuItem: (
    <MenuList sx={{ width: 240, border: '1px dashed #bbb' }}>
      <MenuItem>Regular item</MenuItem>
      <MenuItem>Another item</MenuItem>
      <MenuItem dense>Dense item</MenuItem>
      <MenuItem dense>Dense item two</MenuItem>
    </MenuList>
  ),
  BottomNavigationAction: (
    <BottomNavigation showLabels value={0} sx={{ width: 360, border: '1px dashed #bbb' }}>
      <BottomNavigationAction
        label="Recents"
        icon={<Box sx={{ width: 24, height: 24, bgcolor: 'currentColor', borderRadius: '2px' }} />}
      />
      <BottomNavigationAction
        label="Favorites"
        icon={<Box sx={{ width: 24, height: 24, bgcolor: 'currentColor', borderRadius: '2px' }} />}
      />
    </BottomNavigation>
  ),
  PaginationItem: (
    <Stack spacing={2} useFlexGap>
      <Pagination count={100} page={50} />
      <Pagination count={100} page={50} size="small" />
      <Pagination count={100} page={50} size="large" />
      <Pagination count={100} page={50} variant="outlined" />
    </Stack>
  ),
  ToggleButton: (
    <Stack direction="row" spacing={2} useFlexGap sx={{ alignItems: 'center' }}>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <ToggleButtonGroup key={size} size={size} value="left">
          <ToggleButton value="left">Left</ToggleButton>
          <ToggleButton value="right">Right</ToggleButton>
        </ToggleButtonGroup>
      ))}
    </Stack>
  ),
  Tab: (
    <Tabs value={0} sx={{ border: '1px dashed #bbb' }}>
      <Tab label="Plain" />
      <Tab
        label="Top icon"
        icon={<Box sx={{ width: 24, height: 24, bgcolor: 'currentColor', borderRadius: '2px' }} />}
      />
      <Tab
        label="Start icon"
        iconPosition="start"
        icon={<Box sx={{ width: 24, height: 24, bgcolor: 'currentColor', borderRadius: '2px' }} />}
      />
    </Tabs>
  ),
  Fab: (
    <Stack direction="row" spacing={2} useFlexGap sx={{ alignItems: 'center' }}>
      <Fab variant="extended" size="small">
        Small
      </Fab>
      <Fab variant="extended" size="medium">
        Medium
      </Fab>
      <Fab variant="extended">Large</Fab>
    </Stack>
  ),
  IconButton: (
    <Stack
      direction="row"
      spacing={2}
      useFlexGap
      sx={{ alignItems: 'center', border: '1px dashed #bbb' }}
    >
      {(['small', 'medium', 'large'] as const).map((size) => (
        <IconButton key={size} size={size}>
          <Box sx={{ width: '1em', height: '1em', bgcolor: 'currentColor', borderRadius: '2px' }} />
        </IconButton>
      ))}
      <IconButton edge="start">
        <Box sx={{ width: '1em', height: '1em', bgcolor: 'currentColor', borderRadius: '2px' }} />
      </IconButton>
      <IconButton edge="end">
        <Box sx={{ width: '1em', height: '1em', bgcolor: 'currentColor', borderRadius: '2px' }} />
      </IconButton>
    </Stack>
  ),
  FormSpacing: (
    <Stack sx={{ maxWidth: 320, border: '1px dashed #bbb' }}>
      <TextField margin="normal" label="margin normal" helperText="helper text" />
      <TextField margin="dense" label="margin dense" helperText="dense helper" size="small" />
      <FormGroup row>
        <FormControlLabel control={<Checkbox />} label="One" />
        <FormControlLabel control={<Checkbox />} label="Two" />
      </FormGroup>
      <FormGroup row>
        <FormControlLabel control={<Checkbox />} label="Start" labelPlacement="start" />
        <FormControlLabel control={<Checkbox />} label="Start2" labelPlacement="start" />
      </FormGroup>
    </Stack>
  ),
  InputAdornment: (
    <Stack spacing={2} useFlexGap sx={{ maxWidth: 280 }}>
      {(['filled', 'outlined', 'standard'] as const).map((variant) => (
        <TextField
          key={variant}
          label={`${variant} adornments`}
          variant={variant}
          slotProps={{
            input: {
              startAdornment: <InputAdornment position="start">$</InputAdornment>,
              endAdornment: <InputAdornment position="end">kg</InputAdornment>,
            },
          }}
        />
      ))}
      <TextField
        label="filled value"
        variant="filled"
        defaultValue="Value"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          },
        }}
      />
    </Stack>
  ),
  StandardInput: (
    <Stack spacing={2} useFlexGap sx={{ maxWidth: 280 }}>
      <TextField label="standard medium" variant="standard" />
      <TextField label="standard small" variant="standard" size="small" />
      <TextField label="standard value" variant="standard" defaultValue="Value" />
      <TextField label="standard value sm" variant="standard" size="small" defaultValue="Value" />
      <TextField
        label="standard adornments"
        variant="standard"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          },
        }}
      />
      <TextField label="standard multiline" variant="standard" multiline rows={2} />
    </Stack>
  ),
  TextField: (
    <Stack spacing={2} useFlexGap sx={{ maxWidth: 280 }}>
      {(['medium', 'small'] as const).map((size) =>
        (['outlined', 'filled', 'standard'] as const).map((variant) => (
          <TextField
            key={`${variant}-${size}`}
            label={`${variant} ${size}`}
            variant={variant}
            size={size}
          />
        )),
      )}
      <TextField
        label="adornments"
        slotProps={{
          input: {
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            endAdornment: <InputAdornment position="end">kg</InputAdornment>,
          },
        }}
      />
      <TextField label="multiline" multiline rows={2} />
    </Stack>
  ),
};

export default function SpacingFixture() {
  const router = useRouter();
  const component = (router.query.c as string) || 'Button';
  const spacing = (router.query.spacing as string) || '8';
  const demo = demos[component] ?? <div>No demo registered for &quot;{component}&quot;.</div>;
  return (
    <ThemeProvider theme={theme}>
      <Box
        id="spacing-scope"
        sx={{ display: 'inline-block', p: 2, bgcolor: 'background.paper' }}
        style={{ '--mui-spacing': `${spacing}px` } as React.CSSProperties}
      >
        {demo}
      </Box>
    </ThemeProvider>
  );
}
