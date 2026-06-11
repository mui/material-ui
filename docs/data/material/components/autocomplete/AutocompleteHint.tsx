import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import top100Films from './top100Films';

export default function AutocompleteHint() {
  const [inputValue, setInputValue] = React.useState('');
  const [hint, setHint] = React.useState('');

  return (
    <Autocomplete
      onKeyDown={(event) => {
        if (event.key === 'Tab' && hint) {
          setInputValue(hint);
          setHint('');
          event.preventDefault();
        }
      }}
      onClose={() => {
        setHint('');
      }}
      onChange={(event, newValue) => {
        setInputValue(newValue?.label ?? '');
        setHint('');
      }}
      onInputChange={(event, newInputValue, reason) => {
        setInputValue(newInputValue);

        if (reason !== 'input') {
          setHint('');
          return;
        }

        const matchingOption = top100Films.find((option) =>
          option.label.startsWith(newInputValue),
        );

        setHint(newInputValue && matchingOption ? matchingOption.label : '');
      }}
      disablePortal
      resetHighlightOnMouseLeave
      inputValue={inputValue}
      options={top100Films}
      sx={{ width: 300 }}
      renderInput={(params) => {
        return (
          <Box sx={{ position: 'relative' }}>
            <Typography
              aria-hidden="true"
              sx={{
                position: 'absolute',
                opacity: 0.5,
                left: 14,
                right: 61,
                top: 16,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              {hint}
            </Typography>
            <TextField {...params} label="Movie" />
          </Box>
        );
      }}
    />
  );
}
