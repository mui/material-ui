import Autocomplete from '@mui/material/Autocomplete';
import {Autocomplete as MyAutocomplete} from '@mui/material';

<Autocomplete
  slots={{
    paper: CustomPaper,
    popper: CustomPopper,
    listbox: CustomListbox
  }}
  slotProps={{
    listbox: { height: 12 },
    chip: { height: 10 },
    clearIndicator: { width: 10 },
    paper: { width: 12 },
    popper: { width: 14 },
    popupIndicator: { width: 16 }
  }} />;

<Autocomplete
  slotProps={{
    listbox: { height: 12 },
    chip: { height: 10 },
    clearIndicator: { width: 10 },
    paper: { width: 12 },
    popper: { width: 14 },

    popupIndicator: {
      ...{ width: 16 },
      ...{ width: 20 }
    }
  }}
  slots={{
    paper: CustomPaper,
    popper: CustomPopper,
    listbox: CustomListbox
  }} />;

<MyAutocomplete
  slots={{
    paper: CustomPaper,
    popper: CustomPopper,
    listbox: CustomListbox
  }}
  slotProps={{
    listbox: { height: 12 },
    chip: { height: 10 },
    clearIndicator: { width: 10 },
    paper: { width: 12 },
    popper: { width: 14 },
    popupIndicator: { width: 16 }
  }} />;

<CustomAutocomplete
  ChipProps={{ height: 10 }}
  PaperComponent={CustomPaper}
  PopperComponent={CustomPopper}
  ListboxComponent={CustomListbox}
  ListboxProps={{ height: 12 }}
/>
