import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Avatar from '@mui/material/Avatar';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
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
  BottomNavigation: {
    render: () => (
      <BottomNavigation showLabels value={0} sx={{ width: 320 }}>
        <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
        <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
        <BottomNavigationAction label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
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
};

export const COMPONENT_NAMES = Object.keys(DENSITY_COMPONENTS);
