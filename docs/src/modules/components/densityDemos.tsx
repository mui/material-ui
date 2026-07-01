import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Fab from '@mui/material/Fab';
import Pagination from '@mui/material/Pagination';
import SnackbarContent from '@mui/material/SnackbarContent';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Alert from '@mui/material/Alert';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import InboxIcon from '@mui/icons-material/Inbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Force the tooltip open + inline (no portal) so it renders inside
// `#density-scope` and lands in the scoped screenshot; snap the transition so
// the capture is deterministic.
const staticTooltipSlotProps = {
  popper: { disablePortal: true },
  transition: { appear: false, timeout: 0 },
} as const;

// Shared density demo matrix for the CSS-var density adapter.
// Consumed by the screenshot fixture (density-fixture). `level=default` (no token
// overrides) must stay pixel-identical to the pre-change baseline.
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
  Tooltip: (
    // Always-open, inline tooltips (no hover/portal) so they render inside the
    // scoped screenshot. The box is left unpositioned on purpose — Popper then
    // anchors against the viewport (correct coords); the fixed height just gives
    // the scope a tall enough capture box for the bottom-placed bubbles.
    <Box sx={{ width: 320, height: 260 }}>
      <Stack spacing={10} sx={{ pt: 1, alignItems: 'flex-start' }}>
        <Tooltip title="Default tooltip" open placement="bottom" slotProps={staticTooltipSlotProps}>
          <Button variant="outlined">Default</Button>
        </Tooltip>
        <Tooltip title="Arrow tooltip" arrow open placement="bottom" slotProps={staticTooltipSlotProps}>
          <Button variant="outlined">Arrow</Button>
        </Tooltip>
      </Stack>
    </Box>
  ),
  OutlinedInput: (
    // Labelled outlined fields, one per token group: size axis (medium/small) +
    // start/end adornment. Each floating label exercises the `:has()` bridge.
    <Stack spacing={3} sx={{ width: 260 }}>
      {/* Empty + unfocused → resting label, centered on the block padding (the
          `--InputLabel-y` bridge crux). */}
      <TextField label="Medium" variant="outlined" />
      <TextField label="Small" variant="outlined" size="small" />
      <TextField
        label="Start adornment"
        variant="outlined"
        slotProps={{
          input: { startAdornment: <InputAdornment position="start">$</InputAdornment> },
        }}
      />
      <TextField
        label="End adornment"
        variant="outlined"
        slotProps={{
          input: { endAdornment: <InputAdornment position="end">kg</InputAdornment> },
        }}
      />
    </Stack>
  ),
  FilledInput: (
    // Empty (resting label, inside the box) + valued (shrunk label, in the top
    // strip) exercise both Y seams of the two-value label bridge.
    <Stack spacing={3} sx={{ width: 260 }}>
      <TextField label="Medium" variant="filled" />
      <TextField label="Small" variant="filled" size="small" />
      <TextField label="Filled value" variant="filled" defaultValue="Value" />
    </Stack>
  ),
  Input: (
    // Standard fields, label floats above (no bridge). Empty → input top/bottom
    // padding is the whole density lever.
    <Stack spacing={3} sx={{ width: 260 }}>
      <TextField label="Medium" variant="standard" />
      <TextField label="Small" variant="standard" size="small" />
    </Stack>
  ),
  Tab: (
    // Text tabs (default state → block/inline pad + Tab/Tabs minHeight pairing),
    // icon-top tabs (icon+label state → iconLabel block/minHeight + stackGap),
    // icon-start tabs (inlineGap).
    <Stack spacing={2} sx={{ width: 420 }}>
      <Tabs value={0}>
        <Tab label="One" />
        <Tab label="Two" />
        <Tab label="Three" />
      </Tabs>
      <Tabs value={0}>
        <Tab icon={<InboxIcon />} label="Top" iconPosition="top" />
        <Tab icon={<InboxIcon />} label="Top" iconPosition="top" />
      </Tabs>
      <Tabs value={0}>
        <Tab icon={<InboxIcon />} label="Start" iconPosition="start" />
        <Tab icon={<InboxIcon />} label="Start" iconPosition="start" />
      </Tabs>
    </Stack>
  ),
  Checkbox: (
    // Touch-target padding around the icon (medium + small).
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      <Checkbox defaultChecked />
      <Checkbox defaultChecked size="small" />
    </Stack>
  ),
  Radio: (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      <Radio checked />
      <Radio checked size="small" />
    </Stack>
  ),
  Avatar: (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      <Avatar>A</Avatar>
      <Avatar>B</Avatar>
    </Stack>
  ),
  Fab: (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
      <Fab size="small" color="primary">
        <InboxIcon />
      </Fab>
      <Fab size="medium" color="primary">
        <InboxIcon />
      </Fab>
      <Fab color="primary">
        <InboxIcon />
      </Fab>
    </Stack>
  ),
  PaginationItem: (
    <Stack spacing={2}>
      <Pagination count={5} size="small" />
      <Pagination count={5} />
      <Pagination count={5} size="large" />
    </Stack>
  ),
  BottomNavigation: (
    <BottomNavigation value={0} showLabels sx={{ width: 400 }}>
      <BottomNavigationAction label="Recents" icon={<InboxIcon />} />
      <BottomNavigationAction label="Favorites" icon={<InboxIcon />} />
      <BottomNavigationAction label="Nearby" icon={<InboxIcon />} />
    </BottomNavigation>
  ),
  SnackbarContent: (
    <SnackbarContent
      message="Something happened"
      action={
        <Button color="secondary" size="small">
          Undo
        </Button>
      }
      sx={{ width: 320 }}
    />
  ),
  ButtonGroup: (
    <ButtonGroup variant="outlined">
      <Button>One</Button>
      <Button>Two</Button>
      <Button>Three</Button>
    </ButtonGroup>
  ),
  Toolbar: (
    <Stack spacing={2} sx={{ width: 400 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Regular</Typography>
        </Toolbar>
      </AppBar>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6">Dense</Typography>
        </Toolbar>
      </AppBar>
    </Stack>
  ),
  Stepper: (
    <Stepper activeStep={1} sx={{ width: 360 }}>
      <Step>
        <StepLabel>One</StepLabel>
      </Step>
      <Step>
        <StepLabel>Two</StepLabel>
      </Step>
      <Step>
        <StepLabel>Three</StepLabel>
      </Step>
    </Stepper>
  ),
  Autocomplete: (
    // Open + inline so the option list (the density lever) renders in the scope.
    <Autocomplete
      open
      disablePortal
      options={['Apple', 'Banana', 'Cherry']}
      sx={{ width: 260 }}
      renderInput={(params) => <TextField {...params} label="Fruit" />}
    />
  ),
  TableCell: (
    <Stack spacing={2} sx={{ width: 320 }}>
      {(['medium', 'small'] as const).map((size) => (
        <Table key={size} size={size}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Row one</TableCell>
              <TableCell align="right">42</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </Stack>
  ),
  Badge: (
    <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
      <Badge badgeContent={4} color="primary">
        <InboxIcon />
      </Badge>
      <Badge variant="dot" color="primary">
        <InboxIcon />
      </Badge>
    </Stack>
  ),
  ToggleButton: (
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }} useFlexGap>
      {(['small', 'medium', 'large'] as const).map((size) => (
        <ToggleButtonGroup key={size} value="left" size={size} exclusive>
          <ToggleButton value="left">L</ToggleButton>
          <ToggleButton value="center">C</ToggleButton>
          <ToggleButton value="right">R</ToggleButton>
        </ToggleButtonGroup>
      ))}
    </Stack>
  ),
  Breadcrumbs: (
    <Breadcrumbs>
      <Link underline="hover" color="inherit" href="#">
        Home
      </Link>
      <Link underline="hover" color="inherit" href="#">
        Catalog
      </Link>
      <Typography color="text.primary">Current</Typography>
    </Breadcrumbs>
  ),
  Accordion: (
    <Box sx={{ width: 340 }}>
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Expanded summary</AccordionSummary>
        <AccordionDetails>Details content with top/inline/bottom padding.</AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>Collapsed summary</AccordionSummary>
        <AccordionDetails>Hidden details.</AccordionDetails>
      </Accordion>
    </Box>
  ),
  Chip: (
    <Stack direction="row" useFlexGap sx={{ flexWrap: 'wrap', gap: 1, width: 380 }}>
      <Chip label="Plain" />
      <Chip avatar={<Avatar>A</Avatar>} label="Avatar" />
      <Chip icon={<InboxIcon />} label="Icon" onDelete={() => {}} />
      <Chip label="Outlined" variant="outlined" onDelete={() => {}} />
      <Chip label="Small" size="small" onDelete={() => {}} />
      <Chip label="Small outlined" size="small" variant="outlined" />
    </Stack>
  ),
  Alert: (
    <Stack spacing={2} sx={{ width: 360 }}>
      <Alert severity="info">Info alert — icon gap + root padding.</Alert>
      <Alert severity="success" onClose={() => {}}>
        Success alert with a close action.
      </Alert>
    </Stack>
  ),
  Select: (
    <FormControl sx={{ width: 200 }}>
      <InputLabel id="density-select-label">Age</InputLabel>
      <Select labelId="density-select-label" value={10} label="Age">
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
      </Select>
    </FormControl>
  ),
  CardContent: (
    <Card variant="outlined" sx={{ width: 240 }}>
      <CardContent>
        <Typography variant="h6">Card title</Typography>
        <Typography variant="body2" color="text.secondary">
          Body content with the last-child bottom padding.
        </Typography>
      </CardContent>
    </Card>
  ),
};

export default demos;
