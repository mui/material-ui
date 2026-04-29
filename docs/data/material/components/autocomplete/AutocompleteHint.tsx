import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import top100Films from './top100Films';

export default function AutocompleteHint() {
  const hint = React.useRef('');
  const [inputValue, setInputValue] = React.useState('');
  return (
    <Autocomplete
      onKeyDown={(event) => {
        if (event.key === 'Tab') {
          if (hint.current) {
            setInputValue(hint.current);
            event.preventDefault();
          }
        }
      }}
      onClose={() => {
        hint.current = '';
      }}
      onChange={(event, newValue) => {
        setInputValue(newValue && newValue.label ? newValue.label : '');
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
              sx={{
                position: 'absolute',
                opacity: 0.5,
                left: 14,
                top: 16,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                width: 'calc(100% - 75px)', // Adjust based on padding of TextField
              }}
            >
              {hint.current}
            </Typography>
            <TextField
              {...params}
              onChange={(event) => {
                const newValue = event.target.value;
                setInputValue(newValue);
                const matchingOption = top100Films.find((option) =>
                  option.label.startsWith(newValue),
                );

                if (newValue && matchingOption) {
                  hint.current = matchingOption.label;
                } else {
                  hint.current = '';
                }
              }}
              label="Movie"
            />
          </Box>
        );
      }}
    />
  );
}
