import Autocomplete from '@mui/material/Autocomplete';
import {Autocomplete as MyAutocomplete} from '@mui/material';

<Autocomplete
  slotProps={{
    clearIndicator: { width: 10 },
    paper: { width: 12 },
    popper: { width: 14 },
    popupIndicator: { width: 16 },
  }}
/>;

<Autocomplete
  slotProps={{
    clearIndicator: { width: 10 },
    paper: { width: 12 },
    popper: { width: 14 },

    popupIndicator: {
      ...{ width: 16 },
      ...{ width: 20 }
    }
  }} />;

<MyAutocomplete
  slotProps={{
    clearIndicator: { width: 10 },
    paper: { width: 12 },
    popper: { width: 14 },
    popupIndicator: { width: 16 },
  }}
/>;

<CustomAutocomplete
  componentsProps={{
    clearIndicator: { width: 10 },
    paper: { width: 12 },
    popper: { width: 14 },
    popupIndicator: { width: 16 },
  }}
/>
