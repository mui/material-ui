import * as React from 'react';
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

// Shared density demo matrices for the CSS-var density adapter (docs/adr/0001).
// Consumed by both the screenshot fixture (density-fixture) and the client
// showcase (density-showcase). Each entry renders one component's load-bearing
// size/variant matrix. `level=default` (no token overrides) must stay
// pixel-identical to the pre-change baseline.
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
        <Stack key={size} direction="row" spacing={1} useFlexGap sx={{ alignItems: 'center' }}>
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
    <Stack spacing={2} direction="row" sx={{ alignItems: 'center' }}>
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
      <List dense>
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
    <Stack direction="row" spacing={4} useFlexGap sx={{ alignItems: 'center' }}>
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
    <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
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
        <Stack
          key={size}
          direction="row"
          useFlexGap
          spacing={2}
          sx={{ alignItems: 'center', flexWrap: 'wrap' }}
        >
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

export default demos;
