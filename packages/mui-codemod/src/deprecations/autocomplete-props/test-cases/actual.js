import Autocomplete from '@mui/material/Autocomplete';
import {Autocomplete as MyAutocomplete} from '@mui/material';

<Autocomplete
  ChipProps={{ height: 10 }}
  PaperComponent={CustomPaper}
  PopperComponent={CustomPopper}
  ListboxComponent={CustomListbox}
  ListboxProps={{ height: 12 }}
  componentsProps={{
    clearIndicator: { width: 10 },
    paper: { width: 12 },
    popper: { width: 14 },
    popupIndicator: { width: 16 },
  }}
/>;

<Autocomplete
  ChipProps={{ height: 10 }}
  PaperComponent={CustomPaper}
  PopperComponent={CustomPopper}
  ListboxComponent={CustomListbox}
  ListboxProps={{ height: 12 }}
  slotProps={{
    popupIndicator: { width: 20 }
  }}
  componentsProps={{
    clearIndicator: { width: 10 },
    paper: { width: 12 },
    popper: { width: 14 },
    popupIndicator: { width: 16 },
  }}
/>;

<MyAutocomplete
  ChipProps={{ height: 10 }}
  PaperComponent={CustomPaper}
  PopperComponent={CustomPopper}
  ListboxComponent={CustomListbox}
  ListboxProps={{ height: 12 }}
  componentsProps={{
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
/>;

<CustomAutocomplete
  ChipProps={{ height: 10 }}
  PaperComponent={CustomPaper}
  PopperComponent={CustomPopper}
  ListboxComponent={CustomListbox}
  ListboxProps={{ height: 12 }}
/>
