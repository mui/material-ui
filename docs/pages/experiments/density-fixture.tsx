'use client';
import * as React from 'react';
import { useRouter } from 'next/router';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Toolbar from '@mui/material/Toolbar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Select from '@mui/material/Select';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Badge from '@mui/material/Badge';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import FaceIcon from '@mui/icons-material/Face';
import DeleteIcon from '@mui/icons-material/Delete';
import InboxIcon from '@mui/icons-material/Inbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import FavoriteIcon from '@mui/icons-material/Favorite';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Local verification fixture for the CSS-var density adapter (docs/adr/0001).
// Used by scripts/density-screenshots. Renders one component's load-bearing
// matrix inside #density-scope; the harness sets `level` (default | dense |
// loose), which the scope translates into per-component density-token overrides.
// `level=default` sets no tokens, so the render must be pixel-identical to the
// pre-change baseline. Add a component's matrix to `demos` before verifying it.
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
  OutlinedInput: (
    <Stack spacing={2} useFlexGap sx={{ maxWidth: 320 }}>
      {(['small', 'medium'] as const).map((size) => (
        <Stack key={size} direction="row" spacing={1} useFlexGap sx={{ alignItems: 'flex-start' }}>
          <OutlinedInput size={size} placeholder={size} />
          <OutlinedInput size={size} placeholder="multiline" multiline />
          <OutlinedInput
            size={size}
            placeholder="adornment"
            startAdornment={<InputAdornment position="start">@</InputAdornment>}
          />
        </Stack>
      ))}
    </Stack>
  ),
  TextField: (
    <Stack spacing={2} useFlexGap sx={{ maxWidth: 280 }}>
      {(['medium', 'small'] as const).map((size) => (
        <FormControl key={size} size={size}>
          <InputLabel>{`outlined ${size}`}</InputLabel>
          <OutlinedInput label={`outlined ${size}`} />
        </FormControl>
      ))}
      <TextField label="value" defaultValue="Value" />
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
  Chip: (
    <Stack spacing={2} useFlexGap>
      {(['small', 'medium'] as const).map((size) => (
        <Stack key={size} direction="row" spacing={2} useFlexGap sx={{ alignItems: 'center' }}>
          <Chip label="Filled" size={size} />
          <Chip label="Outlined" variant="outlined" size={size} />
          <Chip label="Avatar" size={size} avatar={<Avatar>A</Avatar>} />
          <Chip label="Icon" size={size} icon={<FaceIcon />} />
          <Chip label="Deletable" size={size} onDelete={() => {}} />
          <Chip
            label="Out+Del"
            variant="outlined"
            size={size}
            onDelete={() => {}}
            icon={<FaceIcon />}
          />
        </Stack>
      ))}
    </Stack>
  ),
  IconButton: (
    <Stack spacing={2}>
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton size="small">
          <DeleteIcon />
        </IconButton>
        <IconButton size="medium">
          <DeleteIcon />
        </IconButton>
        <IconButton size="large">
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton size="small" color="primary">
          <DeleteIcon />
        </IconButton>
        <IconButton size="medium" color="primary">
          <DeleteIcon />
        </IconButton>
        <IconButton size="large" color="primary">
          <DeleteIcon />
        </IconButton>
      </Stack>
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton size="small" edge="start">
          <DeleteIcon />
        </IconButton>
        <IconButton size="medium" loading>
          <DeleteIcon />
        </IconButton>
        <IconButton size="large" disabled>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </Stack>
  ),
  MenuItem: (
    // MenuItem requires a MenuList/Menu ancestor (MenuListContext).
    <MenuList sx={{ width: 220, border: '1px solid', borderColor: 'divider' }}>
      <MenuItem>Default item</MenuItem>
      <MenuItem selected>Selected item</MenuItem>
      <MenuItem>
        <ListItemIcon>
          <InboxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>With icon</ListItemText>
      </MenuItem>
      <MenuItem divider>With divider</MenuItem>
      <MenuItem disableGutters>No gutters</MenuItem>
      <MenuItem dense>Dense item</MenuItem>
      <MenuItem dense>
        <ListItemIcon>
          <InboxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Dense + icon</ListItemText>
      </MenuItem>
      <MenuItem dense disableGutters>
        Dense no gutters
      </MenuItem>
    </MenuList>
  ),
  ListItem: (
    <Stack spacing={2} sx={{ width: 320 }}>
      <List>
        <ListItem>Default item</ListItem>
        <ListItem
          secondaryAction={
            <IconButton edge="end">
              <DeleteIcon />
            </IconButton>
          }
        >
          With secondary action
        </ListItem>
        <ListItem divider>Divider item</ListItem>
        <ListItem alignItems="flex-start">
          <ListItemText primary="Two-line" secondary="alignItems flex-start" />
        </ListItem>
      </List>
      <List dense>
        <ListItem>Dense item</ListItem>
        <ListItem
          secondaryAction={
            <IconButton edge="end">
              <DeleteIcon />
            </IconButton>
          }
        >
          Dense with action
        </ListItem>
        <ListItem disableGutters>Dense, no gutters</ListItem>
      </List>
    </Stack>
  ),
  ListItemButton: (
    <Stack spacing={2} direction="row">
      <List sx={{ width: 240, bgcolor: 'background.paper' }}>
        <ListItemButton>
          <ListItemText primary="Default" secondary="gutters on" />
        </ListItemButton>
        <ListItemButton selected>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Selected + icon" />
        </ListItemButton>
        <ListItemButton divider>
          <ListItemText primary="Divider" />
        </ListItemButton>
        <ListItemButton disableGutters>
          <ListItemText primary="disableGutters (no inline)" />
        </ListItemButton>
      </List>
      <List dense sx={{ width: 240, bgcolor: 'background.paper' }}>
        <ListItemButton>
          <ListItemText primary="Dense" secondary="gutters on" />
        </ListItemButton>
        <ListItemButton selected>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Dense selected + icon" />
        </ListItemButton>
        <ListItemButton disableGutters>
          <ListItemText primary="Dense disableGutters" />
        </ListItemButton>
      </List>
    </Stack>
  ),
  ListItemIcon: (
    <Stack spacing={1} sx={{ maxWidth: 360 }}>
      <List>
        <ListItem>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </ListItem>
      </List>
      <List>
        <ListItem alignItems="flex-start">
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText
            primary="Top-aligned"
            secondary="Two line secondary text to exercise alignItems=flex-start marginTop offset"
          />
        </ListItem>
      </List>
    </Stack>
  ),
  ListItemText: (
    <Stack direction="row" spacing={4} useFlexGap>
      {([false, true] as const).map((dense) => (
        <List key={String(dense)} dense={dense} sx={{ width: 220, bgcolor: 'background.paper' }}>
          <ListItem>
            <ListItemText primary={`single ${dense ? 'dense' : 'regular'}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="two-line" secondary="secondary text" />
          </ListItem>
          <ListItem>
            <ListItemText inset primary="inset" />
          </ListItem>
          <ListItem>
            <ListItemText inset primary="inset two-line" secondary="secondary text" />
          </ListItem>
        </List>
      ))}
    </Stack>
  ),
  ListSubheader: (
    <Stack spacing={2} useFlexGap sx={{ maxWidth: 320 }}>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <ListSubheader>Gutters (default)</ListSubheader>
      </Box>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <ListSubheader inset>Inset</ListSubheader>
      </Box>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <ListSubheader disableGutters>Disable gutters</ListSubheader>
      </Box>
      <Box sx={{ bgcolor: 'background.paper' }}>
        <ListSubheader color="primary">Primary color</ListSubheader>
      </Box>
    </Stack>
  ),
  Toolbar: (
    <React.Fragment>
      {(['regular', 'dense'] as const).map((variant) => (
        <Stack key={variant} spacing={1} useFlexGap sx={{ width: 360 }}>
          <Toolbar
            variant={variant}
            sx={{ bgcolor: 'primary.main', color: 'primary.contrastText' }}
          >
            <Box sx={{ flexGrow: 1 }}>{variant} gutters</Box>
            <span>action</span>
          </Toolbar>
          <Toolbar
            variant={variant}
            disableGutters
            sx={{ bgcolor: 'secondary.main', color: 'secondary.contrastText' }}
          >
            <Box sx={{ flexGrow: 1 }}>{variant} no-gutters</Box>
            <span>action</span>
          </Toolbar>
        </Stack>
      ))}
    </React.Fragment>
  ),
  Tab: (
    // Tab requires a Tabs ancestor (RovingTabIndexContext).
    <Stack spacing={2} useFlexGap sx={{ alignItems: 'flex-start' }}>
      <Tabs value={0} onChange={() => {}}>
        <Tab label="Plain" value={0} />
        <Tab label="Selected" value={1} />
        <Tab label="Full width" value={2} sx={{ minWidth: 160 }} />
      </Tabs>
      <Tabs value={0} onChange={() => {}}>
        <Tab icon={<FavoriteIcon />} label="Top" iconPosition="top" value={0} />
        <Tab icon={<FavoriteIcon />} label="Bottom" iconPosition="bottom" value={1} />
        <Tab icon={<FavoriteIcon />} label="Start" iconPosition="start" value={2} />
        <Tab icon={<FavoriteIcon />} label="End" iconPosition="end" value={3} />
      </Tabs>
      <Tabs value={0} onChange={() => {}}>
        <Tab icon={<FavoriteIcon />} aria-label="icon only" value={0} />
        <Tab
          label="Wrapped long label that wraps to two lines"
          wrapped
          value={1}
          sx={{ maxWidth: 120 }}
        />
      </Tabs>
    </Stack>
  ),
  Tabs: (
    <Stack spacing={2} alignItems="flex-start">
      <Tabs value={0}>
        <Tab label="One" />
        <Tab label="Two" />
        <Tab label="Three" />
      </Tabs>
      <Tabs value={0}>
        <Tab icon={<FavoriteIcon />} label="Top" iconPosition="top" />
        <Tab icon={<FavoriteIcon />} label="Bottom" iconPosition="bottom" />
        <Tab icon={<FavoriteIcon />} label="Start" iconPosition="start" />
        <Tab icon={<FavoriteIcon />} label="End" iconPosition="end" />
      </Tabs>
      <Tabs value={0}>
        <Tab icon={<FavoriteIcon />} aria-label="fav" />
        <Tab icon={<DeleteIcon />} aria-label="del" />
      </Tabs>
    </Stack>
  ),
  TablePagination: (
    <Stack spacing={2}>
      <Table>
        <TableBody>
          <TableRow>
            <TablePagination
              count={100}
              page={1}
              rowsPerPage={10}
              rowsPerPageOptions={[10, 25, 50, 100]}
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
            />
          </TableRow>
          <TableRow>
            <TablePagination
              count={100}
              page={1}
              rowsPerPage={10}
              rowsPerPageOptions={[10, 25, 50, 100]}
              showFirstButton
              showLastButton
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
            />
          </TableRow>
          <TableRow>
            <TablePagination
              count={-1}
              page={1}
              rowsPerPage={10}
              rowsPerPageOptions={[10]}
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
            />
          </TableRow>
        </TableBody>
      </Table>
    </Stack>
  ),
  CardContent: (
    <Stack direction="row" spacing={2} flexWrap="wrap">
      <Card variant="outlined" sx={{ maxWidth: 240 }}>
        <CardContent>
          <Typography variant="h6">Default</Typography>
          <Typography variant="body2">All-sides padding via --CardContent-pad.</Typography>
        </CardContent>
      </Card>
      <Card variant="outlined" sx={{ maxWidth: 240 }}>
        <CardContent>
          <Typography variant="h6">Last-child</Typography>
          <Typography variant="body2">
            Extra bottom inset (--CardContent-padBottom) since this is the last child.
          </Typography>
        </CardContent>
      </Card>
      <Card variant="outlined" sx={{ maxWidth: 240 }}>
        <CardContent>
          <Typography variant="h6">Above actions</Typography>
          <Typography variant="body2">Not last child -&gt; base pad only on the bottom.</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Action</Button>
        </CardActions>
      </Card>
    </Stack>
  ),
  Select: (
    <Stack spacing={2} sx={{ width: 320 }}>
      <Select size="small" defaultValue={10}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>
      <Select defaultValue={10}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>
      <Select variant="filled" defaultValue={10}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>
      <Select variant="standard" defaultValue={10}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>
      <Select multiple defaultValue={[10, 20]} renderValue={(s) => s.join(', ')}>
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>
    </Stack>
  ),
  Breadcrumbs: (
    <Stack spacing={2}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Catalog
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Shoes</Typography>
      </Breadcrumbs>
      <Breadcrumbs separator="›" aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Library
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Data
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Reports</Typography>
      </Breadcrumbs>
      <Breadcrumbs maxItems={2} aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="#">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Catalog
        </Link>
        <Link underline="hover" color="inherit" href="#">
          Accessories
        </Link>
        <Typography sx={{ color: 'text.primary' }}>Belts</Typography>
      </Breadcrumbs>
    </Stack>
  ),
  InputAdornment: (
    <Stack spacing={2} sx={{ p: 2 }}>
      {(['small', 'medium'] as const).map((size) => (
        <Stack key={size} direction="row" spacing={2} alignItems="flex-start">
          <TextField
            size={size}
            label="Outlined"
            defaultValue="abc"
            slotProps={{
              input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
            }}
          />
          <TextField
            size={size}
            label="End icon"
            defaultValue="abc"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" size={size}>
                      <VisibilityIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <TextField
            size={size}
            variant="filled"
            label="Filled start"
            defaultValue="abc"
            slotProps={{
              input: { startAdornment: <InputAdornment position="start">kg</InputAdornment> },
            }}
          />
          <TextField
            size={size}
            variant="filled"
            hiddenLabel
            defaultValue="abc"
            slotProps={{
              input: { startAdornment: <InputAdornment position="start">kg</InputAdornment> },
            }}
          />
        </Stack>
      ))}
    </Stack>
  ),
  Badge: (
    <Stack direction="row" spacing={4} useFlexGap sx={{ alignItems: 'center', p: 3 }}>
      <Badge badgeContent={4} color="primary">
        <Box sx={{ width: 40, height: 40, bgcolor: 'action.hover', borderRadius: 1 }} />
      </Badge>
      <Badge badgeContent={99} color="error">
        <Box sx={{ width: 40, height: 40, bgcolor: 'action.hover', borderRadius: 1 }} />
      </Badge>
      <Badge badgeContent={1000} max={999} color="secondary">
        <Box sx={{ width: 40, height: 40, bgcolor: 'action.hover', borderRadius: 1 }} />
      </Badge>
      <Badge variant="dot" color="primary">
        <Box sx={{ width: 40, height: 40, bgcolor: 'action.hover', borderRadius: 1 }} />
      </Badge>
      <Badge
        badgeContent={7}
        color="primary"
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Box sx={{ width: 40, height: 40, bgcolor: 'action.hover', borderRadius: '50%' }} />
      </Badge>
    </Stack>
  ),
  Checkbox: (
    <Stack spacing={2} useFlexGap>
      {(['small', 'medium'] as const).map((size) => (
        <Stack key={size} direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center' }}>
          <Checkbox size={size} />
          <Checkbox size={size} defaultChecked />
          <Checkbox size={size} defaultChecked color="secondary" />
          <Checkbox size={size} indeterminate />
          <Checkbox size={size} disabled defaultChecked />
          <Checkbox size={size} edge="start" />
        </Stack>
      ))}
    </Stack>
  ),
  Radio: (
    <Stack spacing={2} useFlexGap>
      {(['small', 'medium'] as const).map((size) => (
        <Stack key={size} direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center' }}>
          <Radio size={size} />
          <Radio size={size} defaultChecked />
          <Radio size={size} defaultChecked color="secondary" />
          <Radio size={size} disabled defaultChecked />
          <Radio size={size} edge="start" />
        </Stack>
      ))}
    </Stack>
  ),
  Switch: (
    <Stack spacing={2} useFlexGap>
      {(['small', 'medium'] as const).map((size) => (
        <Stack key={size} direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center' }}>
          <Switch size={size} />
          <Switch size={size} defaultChecked />
          <Switch size={size} defaultChecked color="secondary" />
          <Switch size={size} disabled defaultChecked />
          <Switch size={size} edge="start" />
        </Stack>
      ))}
    </Stack>
  ),
};

// Per-component density-token overrides for the review levels. `default` is
// empty on purpose — that render is the pixel-identical regression gate.
const scopes: Record<string, Record<string, React.CSSProperties>> = {
  Button: {
    dense: {
      ['--Button-small-pad' as any]: '2px 6px',
      ['--Button-medium-pad' as any]: '3px 10px',
      ['--Button-large-pad' as any]: '4px 14px',
    },
    loose: {
      ['--Button-small-pad' as any]: '8px 14px',
      ['--Button-medium-pad' as any]: '12px 22px',
      ['--Button-large-pad' as any]: '16px 30px',
    },
  },
  OutlinedInput: {
    dense: {
      ['--OutlinedInput-small-padBlock' as any]: '4px',
      ['--OutlinedInput-medium-padBlock' as any]: '10px',
      ['--OutlinedInput-small-padInline' as any]: '6px',
      ['--OutlinedInput-medium-padInline' as any]: '8px',
    },
    loose: {
      ['--OutlinedInput-small-padBlock' as any]: '14px',
      ['--OutlinedInput-medium-padBlock' as any]: '28px',
      ['--OutlinedInput-small-padInline' as any]: '20px',
      ['--OutlinedInput-medium-padInline' as any]: '24px',
    },
  },
  Chip: {
    dense: {
      ['--Chip-small-height' as any]: '18px',
      ['--Chip-medium-height' as any]: '24px',
      ['--Chip-small-padInline' as any]: '4px',
      ['--Chip-medium-padInline' as any]: '6px',
    },
    loose: {
      ['--Chip-small-height' as any]: '32px',
      ['--Chip-medium-height' as any]: '44px',
      ['--Chip-small-padInline' as any]: '14px',
      ['--Chip-medium-padInline' as any]: '20px',
    },
  },
  IconButton: {
    dense: {
      ['--IconButton-small-pad' as any]: '1px',
      ['--IconButton-medium-pad' as any]: '3px',
      ['--IconButton-large-pad' as any]: '6px',
    },
    loose: {
      ['--IconButton-small-pad' as any]: '10px',
      ['--IconButton-medium-pad' as any]: '16px',
      ['--IconButton-large-pad' as any]: '22px',
    },
  },
  MenuItem: {
    dense: {
      ['--MenuItem-minHeight' as any]: '36px',
      ['--MenuItem-dense-minHeight' as any]: '24px',
      ['--MenuItem-padBlock' as any]: '2px',
      ['--MenuItem-dense-padBlock' as any]: '1px',
      ['--MenuItem-padInline' as any]: '8px',
      ['--MenuItem-dense-padInline' as any]: '6px',
    },
    loose: {
      ['--MenuItem-minHeight' as any]: '64px',
      ['--MenuItem-dense-minHeight' as any]: '48px',
      ['--MenuItem-padBlock' as any]: '14px',
      ['--MenuItem-dense-padBlock' as any]: '10px',
      ['--MenuItem-padInline' as any]: '28px',
      ['--MenuItem-dense-padInline' as any]: '24px',
    },
  },
  ListItemButton: {
    dense: {
      ['--ListItemButton-padBlock' as any]: '2px',
      ['--ListItemButton-dense-padBlock' as any]: '0px',
      ['--ListItemButton-padInline' as any]: '8px',
      ['--ListItemButton-dense-padInline' as any]: '4px',
    },
    loose: {
      ['--ListItemButton-padBlock' as any]: '16px',
      ['--ListItemButton-dense-padBlock' as any]: '12px',
      ['--ListItemButton-padInline' as any]: '32px',
      ['--ListItemButton-dense-padInline' as any]: '24px',
    },
  },
  ListItemIcon: {
    dense: { ['--ListItemIcon-minWidth' as any]: '24px' },
    loose: { ['--ListItemIcon-minWidth' as any]: '56px' },
  },
  ListItemText: {
    dense: {
      ['--ListItemText-marginBlock' as any]: '1px',
      ['--ListItemText-dense-marginBlock' as any]: '0px',
      ['--ListItemText-insetPad' as any]: '32px',
      ['--ListItemText-dense-insetPad' as any]: '24px',
    },
    loose: {
      ['--ListItemText-marginBlock' as any]: '12px',
      ['--ListItemText-dense-marginBlock' as any]: '8px',
      ['--ListItemText-insetPad' as any]: '72px',
      ['--ListItemText-dense-insetPad' as any]: '64px',
    },
  },
  ListSubheader: {
    dense: {
      ['--ListSubheader-height' as any]: '32px',
      ['--ListSubheader-padInline' as any]: '8px',
      ['--ListSubheader-inset' as any]: '48px',
    },
    loose: {
      ['--ListSubheader-height' as any]: '64px',
      ['--ListSubheader-padInline' as any]: '28px',
      ['--ListSubheader-inset' as any]: '96px',
    },
  },
  Toolbar: {
    dense: {
      ['--Toolbar-dense-minHeight' as any]: '32px',
      ['--Toolbar-padInline' as any]: '8px',
    },
    loose: {
      ['--Toolbar-dense-minHeight' as any]: '72px',
      ['--Toolbar-padInline' as any]: '40px',
    },
  },
  Tab: {
    dense: {
      ['--Tab-padBlock' as any]: '4px',
      ['--Tab-padInline' as any]: '8px',
      ['--Tab-minHeight' as any]: '32px',
      ['--Tab-iconSpacing' as any]: '2px',
    },
    loose: {
      ['--Tab-padBlock' as any]: '20px',
      ['--Tab-padInline' as any]: '28px',
      ['--Tab-minHeight' as any]: '72px',
      ['--Tab-iconSpacing' as any]: '14px',
    },
  },
  Tabs: {
    dense: {
      ['--Tab-padBlock' as any]: '4px',
      ['--Tab-padInline' as any]: '8px',
      ['--Tab-minHeight' as any]: '32px',
      ['--Tab-iconSpacing' as any]: '2px',
    },
    loose: {
      ['--Tab-padBlock' as any]: '20px',
      ['--Tab-padInline' as any]: '32px',
      ['--Tab-minHeight' as any]: '72px',
      ['--Tab-iconSpacing' as any]: '14px',
    },
  },
  TablePagination: {
    dense: {
      ['--TablePagination-minHeight' as any]: '36px',
      ['--TablePagination-actionsSpacing' as any]: '8px',
      ['--TablePagination-selectSpacing' as any]: '12px',
    },
    loose: {
      ['--TablePagination-minHeight' as any]: '72px',
      ['--TablePagination-actionsSpacing' as any]: '40px',
      ['--TablePagination-selectSpacing' as any]: '56px',
    },
  },
  CardContent: {
    dense: {
      ['--CardContent-pad' as any]: '8px',
      ['--CardContent-padBottom' as any]: '10px',
    },
    loose: {
      ['--CardContent-pad' as any]: '32px',
      ['--CardContent-padBottom' as any]: '40px',
    },
  },
  Select: {
    dense: { ['--Select-minHeight' as any]: '0.8em' },
    loose: { ['--Select-minHeight' as any]: '2.4em' },
  },
  Breadcrumbs: {
    dense: { ['--Breadcrumbs-separatorGap' as any]: '2px' },
    loose: { ['--Breadcrumbs-separatorGap' as any]: '20px' },
  },
  InputAdornment: {
    dense: {
      ['--InputAdornment-small-gap' as any]: '2px',
      ['--InputAdornment-medium-gap' as any]: '3px',
      ['--InputAdornment-small-marginTop' as any]: '6px',
      ['--InputAdornment-medium-marginTop' as any]: '10px',
    },
    loose: {
      ['--InputAdornment-small-gap' as any]: '16px',
      ['--InputAdornment-medium-gap' as any]: '24px',
      ['--InputAdornment-small-marginTop' as any]: '24px',
      ['--InputAdornment-medium-marginTop' as any]: '32px',
    },
  },
  Badge: {
    dense: {
      ['--Badge-standard-pad' as any]: '0 3px',
      ['--Badge-standard-size' as any]: '14px',
      ['--Badge-dot-size' as any]: '5px',
    },
    loose: {
      ['--Badge-standard-pad' as any]: '0 10px',
      ['--Badge-standard-size' as any]: '28px',
      ['--Badge-dot-size' as any]: '12px',
    },
  },
  Checkbox: {
    dense: {
      ['--Checkbox-small-pad' as any]: '3px',
      ['--Checkbox-medium-pad' as any]: '5px',
    },
    loose: {
      ['--Checkbox-small-pad' as any]: '7px',
      ['--Checkbox-medium-pad' as any]: '13px',
    },
  },
  Radio: {
    dense: {
      ['--Radio-small-pad' as any]: '3px',
      ['--Radio-medium-pad' as any]: '5px',
    },
    loose: {
      ['--Radio-small-pad' as any]: '7px',
      ['--Radio-medium-pad' as any]: '13px',
    },
  },
  Switch: {
    dense: {
      ['--Switch-small-pad' as any]: '2px',
      ['--Switch-medium-pad' as any]: '6px',
    },
    loose: {
      ['--Switch-small-pad' as any]: '7px',
      ['--Switch-medium-pad' as any]: '12px',
    },
  },
};
// TextField rides the same OutlinedInput tokens; OutlinedInput's `:has` rule
// drives the label's --InputLabel-y, so input box + label move together.
scopes.TextField = scopes.OutlinedInput;

export default function DensityFixture() {
  const router = useRouter();
  const component = (router.query.c as string) || 'Button';
  const level = (router.query.level as string) || 'default';
  const demo = demos[component] ?? <div>No demo registered for &quot;{component}&quot;.</div>;
  const tokens = scopes[component]?.[level] ?? {};
  return (
    <ThemeProvider theme={theme}>
      <Box
        id="density-scope"
        sx={{ display: 'inline-block', p: 2, bgcolor: 'background.paper' }}
        style={tokens}
      >
        {demo}
      </Box>
    </ThemeProvider>
  );
}
