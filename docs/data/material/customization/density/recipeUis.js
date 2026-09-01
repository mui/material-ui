import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DescriptionIcon from '@mui/icons-material/Description';
import FolderIcon from '@mui/icons-material/Folder';
import ImageIcon from '@mui/icons-material/Image';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';

// PLACEHOLDER UIs — swapped for the curated set.

function FormUi() {
  return (
    <Stack sx={{ gap: 'medium', maxWidth: 520 }}>
      <Typography variant="h3">New project</Typography>
      <Stack direction="row" sx={{ gap: 'small' }}>
        <TextField label="Name" defaultValue="Atlas" fullWidth />
        <TextField label="Owner" select defaultValue="design" fullWidth>
          <MenuItem value="design">Design systems</MenuItem>
          <MenuItem value="platform">Platform</MenuItem>
        </TextField>
      </Stack>
      <TextField label="Description" fullWidth multiline rows={2} />
      <RadioGroup row defaultValue="team" sx={{ gap: 'medium' }}>
        <FormControlLabel value="team" control={<Radio />} label="Team" />
        <FormControlLabel value="org" control={<Radio />} label="Organization" />
      </RadioGroup>
      <FormControlLabel
        control={<Checkbox defaultChecked />}
        label="Notify members"
      />
      <Stack direction="row" sx={{ gap: 'x-small', justifyContent: 'flex-end' }}>
        <Button variant="text">Cancel</Button>
        <Button variant="contained">Create</Button>
      </Stack>
    </Stack>
  );
}

const FILES = [
  {
    icon: <FolderIcon />,
    primary: 'Components',
    secondary: '24 items',
    status: 'Synced',
  },
  {
    icon: <DescriptionIcon />,
    primary: 'Tokens.json',
    secondary: 'Edited 2h ago',
    status: 'Draft',
  },
  {
    icon: <ImageIcon />,
    primary: 'Cover.png',
    secondary: '1.2 MB',
    status: 'Synced',
  },
];

function ListUi() {
  return (
    <Paper variant="outlined" sx={{ maxWidth: 520 }}>
      <List disablePadding>
        {FILES.map((file, index) => (
          <React.Fragment key={file.primary}>
            {index > 0 ? <Divider component="li" /> : null}
            <ListItem
              disablePadding
              secondaryAction={
                <IconButton edge="end" aria-label="actions">
                  <MoreVertIcon />
                </IconButton>
              }
            >
              <ListItemButton>
                <ListItemIcon>{file.icon}</ListItemIcon>
                <ListItemText primary={file.primary} secondary={file.secondary} />
                <Chip
                  label={file.status}
                  size="small"
                  variant="outlined"
                  sx={{ mr: 'x-small' }}
                />
              </ListItemButton>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
}

function ToolbarUi() {
  return (
    <Paper variant="outlined" sx={{ maxWidth: 640 }}>
      <Stack
        direction="row"
        sx={{ alignItems: 'center', gap: 'x-small', p: 'x-small' }}
      >
        <TextField
          placeholder="Search"
          size="small"
          sx={{ flexGrow: 1 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
        <IconButton aria-label="notifications">
          <NotificationsIcon />
        </IconButton>
        <Avatar>A</Avatar>
        <Button variant="contained">Share</Button>
      </Stack>
      <Divider />
      <Tabs value={0}>
        <Tab label="Overview" />
        <Tab label="Activity" />
        <Tab label="Settings" />
      </Tabs>
    </Paper>
  );
}

function ArticleUi() {
  return (
    <Box sx={{ maxWidth: 560 }}>
      <Typography variant="h1" gutterBottom>
        Release notes
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Every control now sizes from one scale.
      </Typography>
      <Typography variant="h2" gutterBottom>
        Highlights
      </Typography>
      <Typography variant="body1" gutterBottom>
        Same-size controls share a box, so a button, an input and a checkbox line up
        on the same row without per-component tuning.
      </Typography>
      <Typography variant="h3" gutterBottom>
        Migration
      </Typography>
      <Typography variant="body2" gutterBottom>
        Nothing changes until the enhancer runs. Apply it last, on the composed
        theme.
      </Typography>
      <Typography variant="caption">Updated for the current release</Typography>
    </Box>
  );
}

const recipeUis = [
  { id: 'form', label: 'Form', Component: FormUi },
  { id: 'list', label: 'List', Component: ListUi },
  { id: 'toolbar', label: 'Toolbar', Component: ToolbarUi },
  { id: 'article', label: 'Article', Component: ArticleUi },
];

export default recipeUis;
