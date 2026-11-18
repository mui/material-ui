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
import CardMedia from '@mui/material/CardMedia';
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
import Divider from '@mui/material/Divider';
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
import TableFooter from '@mui/material/TableFooter';
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
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import DraftsIcon from '@mui/icons-material/Drafts';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import InboxIcon from '@mui/icons-material/Inbox';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MenuIcon from '@mui/icons-material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonIcon from '@mui/icons-material/Person';
import RestoreIcon from '@mui/icons-material/Restore';
import SearchIcon from '@mui/icons-material/Search';

export type ControlValue = string | boolean;

export interface Control {
  prop: string;
  type: 'select' | 'switch';
  options?: string[];
  initial: ControlValue;
}

export interface ComponentSpec {
  controls?: Control[];
  render: (values: Record<string, ControlValue>) => React.ReactNode;
}

const DIALOG_STAGE_HEIGHT = 208;
const AUTOCOMPLETE_STAGE_HEIGHT = 148;

function DialogPreview({ dividers }: { dividers: boolean }) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  return (
    <Box
      ref={stageRef}
      sx={{ position: 'relative', width: 420, height: DIALOG_STAGE_HEIGHT }}
    >
      <Dialog
        open
        fullWidth
        hideBackdrop
        disablePortal
        disableEnforceFocus
        disableAutoFocus
        disableScrollLock
        container={() => stageRef.current}
        sx={{ position: 'absolute', zIndex: 1 }}
      >
        <DialogTitle
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          Use location service?
          <IconButton aria-label="close">
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers={dividers}>
          <Typography variant="body2">
            Let apps use your location to find nearby places. You can turn this off
            anytime.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button>Disagree</Button>
          <Button variant="contained">Agree</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
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
    render: (values) => {
      const multiple = values.multiple === true;
      return (
        <Box sx={{ width: 300, height: AUTOCOMPLETE_STAGE_HEIGHT }}>
          <Autocomplete
            key={String(multiple)}
            open
            disablePortal
            multiple={multiple}
            options={['Draft', 'In review', 'Published']}
            defaultValue={multiple ? ['Draft'] : 'Draft'}
            renderInput={(params) => <TextField {...params} label="Status" />}
            slotProps={{
              popper: { sx: { zIndex: 1 } },
            }}
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
      {
        prop: 'variant',
        type: 'select',
        options: ['standard', 'dot'],
        initial: 'standard',
      },
    ],
    render: (values) => (
      <Badge
        badgeContent={4}
        variant={values.variant as 'standard' | 'dot'}
        color="primary"
      >
        <Avatar>M</Avatar>
      </Badge>
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
      {
        prop: 'size',
        type: 'select',
        options: ['small', 'medium', 'large'],
        initial: 'medium',
      },
    ],
    render: (values) => (
      <Stack direction="row" spacing={3} sx={{ alignItems: 'center' }}>
        <Button
          variant="outlined"
          size={values.size as 'small' | 'medium' | 'large'}
          startIcon={<AddIcon />}
        >
          Button
        </Button>
        <IconButton size={values.size as 'small' | 'medium' | 'large'}>
          <FavoriteIcon />
        </IconButton>
      </Stack>
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
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="140"
          image="/static/images/cards/paella.jpg"
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            This impressive paella is a perfect party dish and a fun meal to cook
            together with your guests. Add 1 cup of frozen peas along with the
            mussels, if you like.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn more</Button>
        </CardActions>
      </Card>
    ),
  },
  Checkbox: {
    controls: [
      {
        prop: 'size',
        type: 'select',
        options: ['small', 'medium'],
        initial: 'medium',
      },
    ],
    render: (values) => (
      <FormControlLabel
        control={
          <Checkbox defaultChecked size={values.size as 'small' | 'medium'} />
        }
        label="Email me updates"
      />
    ),
  },
  Chip: {
    controls: [
      {
        prop: 'size',
        type: 'select',
        options: ['small', 'medium'],
        initial: 'medium',
      },
    ],
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
    controls: [
      {
        prop: 'DialogContent dividers',
        type: 'select',
        options: ['false', 'true'],
        initial: 'false',
      },
    ],
    render: (values) => (
      <DialogPreview dividers={values['DialogContent dividers'] === 'true'} />
    ),
  },
  Fab: {
    controls: [
      {
        prop: 'size',
        type: 'select',
        options: ['small', 'medium', 'large'],
        initial: 'medium',
      },
    ],
    render: (values) => (
      <Fab
        color="primary"
        size={values.size as 'small' | 'medium' | 'large'}
        aria-label="add"
      >
        <AddIcon />
      </Fab>
    ),
  },
  List: {
    controls: [{ prop: 'dense', type: 'switch', initial: false }],
    render: (values) => (
      <List dense={values.dense === true} sx={{ width: 180 }}>
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
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <FavoriteIcon />
            </ListItemIcon>
            <ListItemText primary="Saved" />
          </ListItemButton>
        </ListItem>
      </List>
    ),
  },
  Menu: {
    controls: [
      { prop: 'dense', type: 'switch', initial: false },
      { prop: 'inset', type: 'switch', initial: true },
    ],
    render: (values) => {
      const inset = values.inset === true;
      return (
        <Paper sx={{ width: 220 }}>
          <MenuList dense={values.dense === true}>
            {[
              { label: 'Copy', icon: <ContentCopyIcon />, shortcut: '⌘C' },
              { label: 'Paste', icon: <ContentPasteIcon />, shortcut: '⌘V' },
              { label: 'Cut', icon: <ContentCutIcon />, shortcut: '⌘X' },
            ].map((item) => (
              <MenuItem key={item.label}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.label}</ListItemText>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.shortcut}
                </Typography>
              </MenuItem>
            ))}
            <Divider variant={inset ? 'inset' : 'fullWidth'} component="li" />
            <MenuItem>
              <ListItemText inset={inset}>Paste as plain text</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemText inset={inset}>Paste with formatting</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
      );
    },
  },
  Pagination: {
    controls: [
      {
        prop: 'size',
        type: 'select',
        options: ['small', 'medium', 'large'],
        initial: 'medium',
      },
    ],
    render: (values) => (
      <Pagination count={5} size={values.size as 'small' | 'medium' | 'large'} />
    ),
  },
  Progress: {
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
    controls: [
      {
        prop: 'size',
        type: 'select',
        options: ['small', 'medium'],
        initial: 'medium',
      },
    ],
    render: (values) => (
      <FormControlLabel
        control={<Radio defaultChecked size={values.size as 'small' | 'medium'} />}
        label="Same as billing"
      />
    ),
  },
  Select: {
    controls: [
      {
        prop: 'size',
        type: 'select',
        options: ['small', 'medium'],
        initial: 'medium',
      },
    ],
    render: (values) => {
      const size = values.size as 'small' | 'medium';
      const adornment = (
        <InputAdornment position="start">
          <LocalShippingIcon />
        </InputAdornment>
      );
      return (
        <Stack spacing={3} sx={{ width: 220 }}>
          <Select
            variant="outlined"
            size={size}
            value="shipped"
            startAdornment={adornment}
          >
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
          <Select
            variant="filled"
            hiddenLabel
            size={size}
            value="shipped"
            startAdornment={adornment}
          >
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
          <Select
            variant="standard"
            size={size}
            value="shipped"
            startAdornment={adornment}
          >
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </Stack>
      );
    },
  },
  Slider: {
    controls: [
      {
        prop: 'size',
        type: 'select',
        options: ['small', 'medium'],
        initial: 'medium',
      },
    ],
    render: (values) => (
      <Slider
        size={values.size as 'small' | 'medium'}
        defaultValue={40}
        sx={{ width: 260 }}
      />
    ),
  },
  SnackbarContent: {
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
    render: (values) => {
      const vertical = values.orientation === 'vertical';
      return (
        <Stepper
          activeStep={0}
          orientation={vertical ? 'vertical' : 'horizontal'}
          sx={{ width: vertical ? 190 : 300 }}
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
    render: (values) => (
      <FavoriteIcon fontSize={values.fontSize as 'small' | 'medium' | 'large'} />
    ),
  },
  Switch: {
    controls: [
      {
        prop: 'size',
        type: 'select',
        options: ['small', 'medium'],
        initial: 'medium',
      },
    ],
    render: (values) => (
      <FormControlLabel
        control={<Switch defaultChecked size={values.size as 'small' | 'medium'} />}
        label="Auto-sync"
      />
    ),
  },
  Table: {
    controls: [
      {
        prop: 'size',
        type: 'select',
        options: ['small', 'medium'],
        initial: 'medium',
      },
    ],
    render: (values) => {
      const size = values.size as 'small' | 'medium';
      return (
        <Table size={size} sx={{ width: 240 }}>
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
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>1 order</TableCell>
              <TableCell align="right">$24.00</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      );
    },
  },
  Tabs: {
    controls: [{ prop: 'icon', type: 'switch', initial: false }],
    render: (values) => (
      <Tabs value={0} variant="scrollable" scrollButtons sx={{ maxWidth: 360 }}>
        {[
          'Overview',
          'Activity',
          'Files',
          'Members',
          'Settings',
          'Billing',
          'Usage',
          'Alerts',
          'Audit',
          'Archive',
        ].map((label) => (
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
      {
        prop: 'size',
        type: 'select',
        options: ['small', 'medium'],
        initial: 'medium',
      },
      { prop: 'multiline', type: 'switch', initial: false },
    ],
    render: (values) => {
      const size = values.size as 'small' | 'medium';
      const multiline = values.multiline === true;
      const adornment = (
        <InputAdornment position="start">
          <SearchIcon />
        </InputAdornment>
      );
      return (
        <Stack spacing={3} sx={{ width: 260, mr: '120px' }}>
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
      {
        prop: 'size',
        type: 'select',
        options: ['small', 'medium', 'large'],
        initial: 'medium',
      },
    ],
    render: (values) => (
      <ToggleButtonGroup
        value="left"
        exclusive
        size={values.size as 'small' | 'medium' | 'large'}
      >
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
    render: (values) => (
      <AppBar position="static" sx={{ width: 260 }}>
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
    controls: [
      {
        prop: 'placement',
        type: 'select',
        options: ['bottom', 'right'],
        initial: 'bottom',
      },
    ],
    render: (values) => (
      <Box
        sx={
          values.placement === 'right' ? { py: 2, pl: 0, pr: 12 } : { py: 6, px: 12 }
        }
      >
        <Tooltip
          title="Copy to clipboard"
          arrow
          open
          placement={values.placement as 'bottom' | 'right'}
          slotProps={{ popper: { disablePortal: true, sx: { zIndex: 1 } } }}
        >
          <Button variant="outlined">Copy</Button>
        </Tooltip>
      </Box>
    ),
  },
};

export const COMPONENT_NAMES = Object.keys(DENSITY_COMPONENTS);
