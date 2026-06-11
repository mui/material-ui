import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import useTimeout from '@mui/utils/useTimeout';
import top100Films from './top100Films';

const LOAD_DELAY = 1000;
const topFilms = top100Films.slice(0, 30);

export default function Asynchronous() {
  const loadOptions = useTimeout();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly (typeof topFilms)[number][]>(
    [],
  );
  const [loading, setLoading] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
    setLoading(true);

    loadOptions.start(LOAD_DELAY, () => {
      setOptions([...topFilms]);
      setLoading(false);
    });
  };

  const handleClose = () => {
    loadOptions.clear();
    setOpen(false);
    setOptions([]);
    setLoading(false);
  };

  return (
    <Autocomplete
      sx={{ width: 300 }}
      open={open}
      onOpen={handleOpen}
      onClose={handleClose}
      options={options}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Asynchronous"
          slotProps={{
            ...params.slotProps,
            input: {
              ...params.slotProps.input,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.slotProps.input.endAdornment}
                </React.Fragment>
              ),
            },
          }}
        />
      )}
    />
  );
}
