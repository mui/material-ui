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
    chip: { height: 10 }
  }} />;

<Autocomplete
  slotProps={{
    popupIndicator: { width: 20 },
    listbox: { height: 12 },
    chip: { height: 10 }
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
    chip: { height: 10 }
  }} />;

<CustomAutocomplete
  ChipProps={{ height: 10 }}
  PaperComponent={CustomPaper}
  PopperComponent={CustomPopper}
  ListboxComponent={CustomListbox}
  ListboxProps={{ height: 12 }}
/>
