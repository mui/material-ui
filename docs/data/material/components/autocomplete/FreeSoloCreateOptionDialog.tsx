import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import top100Films from './top100Films';

interface Film {
  label: string;
  year: number;
}

const filter = createFilterOptions<Film | string>();
const filmOptions: readonly Film[] = top100Films;

export default function FreeSoloCreateOptionDialog() {
  const [value, setValue] = React.useState<Film | null>(null);
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      label: '',
      year: '',
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    label: '',
    year: '',
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue({
      label: dialogValue.label,
      year: Number.parseInt(dialogValue.year, 10),
    });
    handleClose();
  };

  const handleCreateOption = (inputValue: string) => {
    toggleOpen(true);
    setDialogValue({
      label: inputValue,
      year: '',
    });
  };

  return (
    <React.Fragment>
      <Autocomplete<Film | string, false, false, true>
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // Avoid instant validation of the dialog's form.
            setTimeout(() => {
              handleCreateOption(newValue);
            });
          } else {
            setValue(newValue);
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          const { inputValue, getOptionLabel } = params;
          const isExisting = options.some(
            (option) => inputValue === getOptionLabel(option),
          );

          if (inputValue !== '' && !isExisting) {
            filtered.push(inputValue);
          }

          return filtered;
        }}
        options={filmOptions}
        getOptionLabel={(option) => {
          if (typeof option === 'string') {
            return option;
          }
          return option.label;
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => {
          const { key, ...optionProps } = props;
          return (
            <li key={key} {...optionProps}>
              {typeof option === 'string' ? `Add "${option}"` : option.label}
            </li>
          );
        }}
        sx={{ width: 300 }}
        freeSolo
        resetHighlightOnMouseLeave
        renderInput={(params) => <TextField {...params} label="Free solo dialog" />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add a new film</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did you miss any film in our list? Please, add it!
            </DialogContentText>
            <Stack spacing={2}>
              <TextField
                autoFocus
                value={dialogValue.label}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    label: event.target.value,
                  })
                }
                label="title"
                type="text"
                variant="filled"
              />
              <TextField
                value={dialogValue.year}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    year: event.target.value,
                  })
                }
                label="year"
                type="number"
                variant="filled"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
