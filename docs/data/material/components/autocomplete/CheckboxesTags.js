import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import top100Films from './top100Films';

export default function CheckboxesTags() {
  return (
    <Autocomplete
      multiple
      options={top100Films}
      disableCloseOnSelect
      renderOption={(props, option, { selected }) => {
        const { key, ...optionProps } = props;
        const SelectionIcon = selected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

        return (
          <li key={key} {...optionProps}>
            <SelectionIcon
              fontSize="small"
              sx={{ mr: 1, p: 1.125, boxSizing: 'content-box' }}
            />
            {option.label}
          </li>
        );
      }}
      sx={{ width: 500 }}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Favorites" />
      )}
    />
  );
}
