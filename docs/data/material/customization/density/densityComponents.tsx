import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Fab from '@mui/material/Fab';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import LinearProgress from '@mui/material/LinearProgress';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import Select from '@mui/material/Select';
import Slider from '@mui/material/Slider';
import SnackbarContent from '@mui/material/SnackbarContent';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepContent from '@mui/material/StepContent';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Switch from '@mui/material/Switch';
import Tab from '@mui/material/Tab';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import InboxIcon from '@mui/icons-material/Inbox';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import RestoreIcon from '@mui/icons-material/Restore';
import SearchIcon from '@mui/icons-material/Search';

/**
 * Pure rendering: what each family looks like, and the props its toolbar exposes.
 * Nothing here knows that the result is measured — selectors, aspects and tokens
 * all live in `densityAnnotationSpecs`, so an annotation change never touches a
 * component.
 */
export type ControlValue = string | boolean;

export interface Control {
  /** the component's own prop, shown as the control's label. */
  prop: string;
  type: 'select' | 'switch';
  options?: string[];
  initial: ControlValue;
}

export interface ComponentSpec {
  /** at most two, rendered left to right in the toolbar. */
  controls?: Control[];
  render: (values: Record<string, ControlValue>) => React.ReactNode;
}

export const DENSITY_COMPONENTS: Record<string, ComponentSpec> = {
  Accordion: {
    render: () => (
      <Accordion defaultExpanded sx={{ width: 300 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <LocalShippingIcon />
          <Typography>Shipping</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">Free above $50.</Typography>
        </AccordionDetails>
      </Accordion>
    ),
  },
  Alert: {
    render: () => (
      <Alert severity="success" onClose={() => {}} sx={{ width: 380 }}>
        Your changes have been saved.
      </Alert>
    ),
  },
  Autocomplete: {
    controls: [{ prop: 'multiple', type: 'switch', initial: false }],
    // The listbox is absolutely positioned, so the wrapper is what reserves the
    // room the stage measures its bounds from — without it every option caption
    // lands on top of the list. `open disablePortal` keeps the popper inside the
    // demo, where the selectors can reach it.
    render: (values) => {
      const multiple = values.multiple === true;
      return (
        <Box sx={{ width: 300, height: 216 }}>
          <Autocomplete
            key={String(multiple)}
            open
            disablePortal
            multiple={multiple}
            options={['Draft', 'In review', 'Published']}
            defaultValue={multiple ? ['Draft'] : 'Draft'}
            renderInput={(params) => <TextField {...params} label="Status" />}
          />
        </Box>
      );
    },
  },
  Avatar: {
    render: () => <Avatar>M</Avatar>,
  },
  Badge: {
    controls: [
      { prop: 'variant', type: 'select', options: ['standard', 'dot'], initial: 'standard' },
    ],
    // A single digit keeps the badge square, so the height the beam reads is
    // also the `minWidth` the preset authored. The padding is what the gutters
    // need to clear the badge, which hangs outside the icon it sits on.
    render: (values) => (
      <Box sx={{ p: 2 }}>
        <Badge badgeContent={4} color="primary" variant={values.variant as 'standard' | 'dot'}>
          <MailIcon />
        </Badge>
      </Box>
    ),
  },
  BottomNavigation: {
    render: () => (
      <BottomNavigation showLabels value={0} sx={{ width: 320 }}>
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
    ),
  },
  Breadcrumbs: {
    // Three crumbs, so the list has separators between real children and the
    // gap band has somewhere to land.
    render: () => (
      <Breadcrumbs>
        <Link underline="hover" color="inherit" href="/">
          Home
        </Link>
        <Link underline="hover" color="inherit" href="/">
          Library
        </Link>
        <Typography color="text.primary">Data</Typography>
      </Breadcrumbs>
    ),
  },
  Button: {
    controls: [
      { prop: 'size', type: 'select', options: ['small', 'medium', 'large'], initial: 'medium' },
    ],
    render: (values) => (
      <Button
        variant="outlined"
        size={values.size as 'small' | 'medium' | 'large'}
        startIcon={<AddIcon />}
      >
        Button
      </Button>
    ),
  },
  Card: {
    render: () => (
      <Card variant="outlined" sx={{ width: 300 }}>
        <CardHeader
          avatar={<Avatar>R</Avatar>}
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Ratatouille"
          subheader="September 14"
        />
        <CardContent>
          <Typography variant="body2">Set aside for 10 minutes.</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn more</Button>
        </CardActions>
      </Card>
    ),
  },
  Checkbox: {
    controls: [{ prop: 'size', type: 'select', options: ['small', 'medium'], initial: 'medium' }],
    render: (values) => (
      <FormControlLabel
        control={<Checkbox defaultChecked size={values.size as 'small' | 'medium'} />}
        label="Email me updates"
      />
    ),
  },
  Chip: {
    controls: [{ prop: 'size', type: 'select', options: ['small', 'medium'], initial: 'medium' }],
    // Avatar and delete icon together: they are what gives the root three
    // children, so its gap exists, and what the negative child offsets pull on.
    render: (values) => (
      <Chip
        size={values.size as 'small' | 'medium'}
        avatar={<Avatar>M</Avatar>}
        label="Marketing"
        onDelete={() => {}}
      />
    ),
  },
  Dialog: {
    // `disablePortal` keeps the paper inside the demo subtree, and the absolute
    // positioning inside a relative box keeps the modal off the rest of the page.
    render: () => (
      <Box sx={{ position: 'relative', width: 420, height: 320 }}>
        <Dialog
          open
          fullWidth
          hideBackdrop
          disablePortal
          disableEnforceFocus
          disableAutoFocus
          disableScrollLock
          sx={{ position: 'absolute' }}
        >
          <DialogTitle
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            Use location service?
            <IconButton aria-label="close">
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Typography variant="body2">
              Let apps use your location to find nearby places. You can turn this off anytime.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button>Disagree</Button>
            <Button variant="contained">Agree</Button>
          </DialogActions>
        </Dialog>
      </Box>
    ),
  },
  Fab: {
    controls: [
      { prop: 'size', type: 'select', options: ['small', 'medium', 'large'], initial: 'medium' },
    ],
    // Circular only: the extended variant stays frozen at master, so it would
    // blank the one row this family has.
    render: (values) => (
      <Fab color="primary" size={values.size as 'small' | 'medium' | 'large'} aria-label="add">
        <AddIcon />
      </Fab>
    ),
  },
  List: {
    controls: [{ prop: 'dense', type: 'switch', initial: false }],
    // `ListItemIcon` + `ListItemText` give the row two element children, which
    // is what the gap band sits between — a bare string label is a text node.
    // `disablePadding` on the item hands the whole box to the button.
    render: (values) => (
      <List dense={values.dense === true} sx={{ width: 260 }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Inbox" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <ListItemText primary="Drafts" />
          </ListItemButton>
        </ListItem>
      </List>
    ),
  },
  Menu: {
    controls: [{ prop: 'dense', type: 'switch', initial: false }],
    // A rendered `MenuList` rather than an open `Menu`: no portal to measure
    // through, and the items get the same `ListContext` the popup would give
    // them. `ListItemText` — not a bare string — so the gap has a child to
    // start from.
    render: (values) => (
      <Paper sx={{ width: 220 }}>
        <MenuList dense={values.dense === true}>
          <MenuItem>
            <ListItemIcon>
              <ContentCopyIcon />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPasteIcon />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    ),
  },
  Pagination: {
    controls: [
      { prop: 'size', type: 'select', options: ['small', 'medium', 'large'], initial: 'medium' },
    ],
    // `count={5}` keeps every page rendered: no ellipsis, whose item drops to
    // `height: auto` and would break the row of equal boxes.
    render: (values) => <Pagination count={5} size={values.size as 'small' | 'medium' | 'large'} />,
  },
  Progress: {
    // Both components together: the bar's thickness and the spinner's diameter
    // come off the same scale. `determinate` on both, so nothing animates under
    // the stage's ResizeObserver — and no explicit `size`, or the spinner's
    // `defaultProps` emission would be overridden.
    render: () => (
      <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
        <Box sx={{ width: 200 }}>
          <LinearProgress variant="determinate" value={60} />
        </Box>
        <CircularProgress variant="determinate" value={60} />
      </Stack>
    ),
  },
  Radio: {
    controls: [{ prop: 'size', type: 'select', options: ['small', 'medium'], initial: 'medium' }],
    render: (values) => (
      <FormControlLabel
        control={<Radio defaultChecked size={values.size as 'small' | 'medium'} />}
        label="Ship to billing address"
      />
    ),
  },
  Select: {
    controls: [
      { prop: 'size', type: 'select', options: ['small', 'medium'], initial: 'medium' },
    ],
    // `standard` outside a FormControl is the only shape where the Select
    // family's own rows are the computed value — the outlined default lets
    // `MuiOutlinedInput` win the input's block padding. The adornment is what
    // gives the root a second in-flow child, so its gap exists at all.
    render: (values) => (
      <Select
        variant="standard"
        size={values.size as 'small' | 'medium'}
        value="shipped"
        startAdornment={
          <InputAdornment position="start">
            <LocalShippingIcon />
          </InputAdornment>
        }
        sx={{ width: 220 }}
      >
        <MenuItem value="shipped">Shipped</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
      </Select>
    ),
  },
  Slider: {
    controls: [
      { prop: 'size', type: 'select', options: ['small', 'medium'], initial: 'medium' },
    ],
    // The root stays 32px while the thumb shrinks — the hit area is the point.
    // `defaultValue={40}` keeps the thumb off centre so its caption and the
    // root's land in opposite gutters.
    render: (values) => (
      <Slider
        size={values.size as 'small' | 'medium'}
        defaultValue={40}
        sx={{ width: 260 }}
      />
    ),
  },
  SnackbarContent: {
    // `action` is load-bearing twice: it gives the root a second child, so the
    // gap exists at all, and it is the element the negative margin points at.
    // `fit-content` removes the slack that `marginLeft: auto` would otherwise
    // put between the message and the action.
    render: () => (
      <SnackbarContent
        sx={{ width: 'fit-content' }}
        message="Your changes have been saved to the archive."
        action={
          <Button color="secondary" size="small">
            Undo
          </Button>
        }
      />
    ),
  },
  Stepper: {
    controls: [
      {
        prop: 'orientation',
        type: 'select',
        options: ['horizontal', 'vertical'],
        initial: 'horizontal',
      },
    ],
    // The connector and the content only align off the icon box when the
    // stepper is vertical, and `StepContent` warns if mounted horizontally —
    // so the orientation is the control, and the content is conditional.
    // `activeStep={0}` keeps the first content expanded, which is the one
    // measured.
    render: (values) => {
      const vertical = values.orientation === 'vertical';
      return (
        <Stepper
          activeStep={0}
          orientation={vertical ? 'vertical' : 'horizontal'}
          sx={{ width: 300 }}
        >
          {['Select', 'Review', 'Confirm'].map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
              {vertical ? (
                <StepContent>
                  <Typography variant="body2">Free above $50.</Typography>
                </StepContent>
              ) : null}
            </Step>
          ))}
        </Stepper>
      );
    },
  },
  SvgIcon: {
    controls: [
      {
        prop: 'fontSize',
        type: 'select',
        options: ['small', 'medium', 'large'],
        initial: 'medium',
      },
    ],
    render: (values) => <FavoriteIcon fontSize={values.fontSize as 'small' | 'medium' | 'large'} />,
  },
  Switch: {
    controls: [{ prop: 'size', type: 'select', options: ['small', 'medium'], initial: 'medium' }],
    // `defaultChecked` is what separates the two rings: unchecked, the switch
    // base sits flush with the root's left edge and they read as one box.
    render: (values) => (
      <FormControlLabel
        control={<Switch defaultChecked size={values.size as 'small' | 'medium'} />}
        label="Auto-sync"
      />
    ),
  },
  Table: {
    controls: [
      { prop: 'size', type: 'select', options: ['small', 'medium'], initial: 'medium' },
    ],
    // The checkbox tracks the table's size on purpose: a 32px box in a 28px
    // dense row would push the row past the height the cell emits.
    render: (values) => {
      const size = values.size as 'small' | 'medium';
      return (
        <Table size={size} sx={{ width: 380 }}>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox size={size} defaultChecked />
              </TableCell>
              <TableCell sortDirection="asc">
                <TableSortLabel active direction="asc">
                  Order
                </TableSortLabel>
              </TableCell>
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox size={size} />
              </TableCell>
              <TableCell>#1042</TableCell>
              <TableCell align="right">$24.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      );
    },
  },
  Tabs: {
    controls: [{ prop: 'icon', type: 'switch', initial: false }],
    // The label is wrapped on purpose: `Tab` renders it straight into its own
    // flex box, and a bare string is a text node the gap band cannot start from.
    render: (values) => (
      <Tabs value={0} sx={{ maxWidth: 360 }}>
        {['Overview', 'Activity', 'Files'].map((label) => (
          <Tab
            key={label}
            icon={values.icon === true ? <FavoriteIcon /> : undefined}
            label={<span>{label}</span>}
          />
        ))}
      </Tabs>
    ),
  },
  TextField: {
    controls: [
      { prop: 'size', type: 'select', options: ['small', 'medium'], initial: 'medium' },
      { prop: 'multiline', type: 'switch', initial: false },
    ],
    // All four inputs at once: they are tuned to land on the same box, which is
    // invisible one variant at a time. The adornment is what gives the input
    // root a second child, so its gap exists at all.
    render: (values) => {
      const size = values.size as 'small' | 'medium';
      const multiline = values.multiline === true;
      const adornment = (
        <InputAdornment position="start">
          <SearchIcon fontSize="small" />
        </InputAdornment>
      );
      return (
        <Stack spacing={3} sx={{ width: 260 }}>
          <TextField
            variant="outlined"
            label="Outlined"
            defaultValue="Ada"
            helperText="Helper text"
            size={size}
            multiline={multiline}
            slotProps={{ input: { startAdornment: adornment } }}
          />
          <TextField
            variant="standard"
            label="Standard"
            defaultValue="Ada"
            size={size}
            multiline={multiline}
            slotProps={{ input: { startAdornment: adornment } }}
          />
          <TextField
            variant="filled"
            label="Filled"
            defaultValue="Ada"
            size={size}
            multiline={multiline}
            slotProps={{ input: { startAdornment: adornment } }}
          />
          <InputBase
            size={size}
            multiline={multiline}
            defaultValue="InputBase"
            startAdornment={adornment}
          />
        </Stack>
      );
    },
  },
  ToggleButton: {
    controls: [
      { prop: 'size', type: 'select', options: ['small', 'medium', 'large'], initial: 'medium' },
    ],
    // Icon-only on purpose: with no label the box collapses onto
    // `padding + icon + border`, so the square the preset claims and the padding
    // that produces it are the same picture.
    render: (values) => (
      <ToggleButtonGroup value="left" exclusive size={values.size as 'small' | 'medium' | 'large'}>
        <ToggleButton value="left">
          <FormatAlignLeftIcon />
        </ToggleButton>
        <ToggleButton value="center">
          <FormatAlignCenterIcon />
        </ToggleButton>
      </ToggleButtonGroup>
    ),
  },
  Toolbar: {
    controls: [{ prop: 'dense', type: 'switch', initial: false }],
    // No `edge="start"` on the icon button: that emits a negative margin, which
    // would pull it into the gutter the padding ring is about.
    render: (values) => (
      <AppBar position="static" sx={{ width: 360 }}>
        <Toolbar variant={values.dense === true ? 'dense' : 'regular'}>
          <IconButton color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Files
          </Typography>
          <Button color="inherit">Sign in</Button>
        </Toolbar>
      </AppBar>
    ),
  },
  Tooltip: {
    // `placement`, not `arrow`: the arrow's 11px is a width at the top and bottom
    // placements and a height at the side ones, and only a height can be drawn.
    controls: [
      { prop: 'placement', type: 'select', options: ['bottom', 'right'], initial: 'bottom' },
    ],
    // `open` + `disablePortal` put the bubble inside the demo; the padding
    // reserves the room it is positioned into.
    render: (values) => (
      <Box sx={{ py: 6, px: 12 }}>
        <Tooltip
          title="Copy to clipboard"
          arrow
          open
          placement={values.placement as 'bottom' | 'right'}
          slotProps={{ popper: { disablePortal: true } }}
        >
          <Button variant="outlined">Copy</Button>
        </Tooltip>
      </Box>
    ),
  },
};

export const COMPONENT_NAMES = Object.keys(DENSITY_COMPONENTS);
