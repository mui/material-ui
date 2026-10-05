import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const options = ['Andorra', 'Albania', 'Belgium', 'AXndorra extended'];

export default function InlineCompletion() {
  const mode = new URLSearchParams(window.location.search).get('mode');
  const [inputValue, setInputValue] = React.useState('');
  const [value, setValue] = React.useState<string | null>(null);

  return (
    <React.StrictMode>
      <button type="button" onClick={() => setInputValue('Belgium')}>
        Set controlled input
      </button>
      <Autocomplete
        autoComplete
        autoHighlight
        freeSolo={mode === 'free-solo'}
        inputValue={mode === 'controlled' ? inputValue : undefined}
        options={options}
        onInputChange={(_event, nextInputValue) => setInputValue(nextInputValue)}
        onChange={(_event, nextValue) => setValue(nextValue)}
        renderInput={(params) => <TextField {...params} label="Country" />}
        sx={{ width: 320 }}
      />
      <output data-testid="logical-input">{inputValue}</output>
      <output data-testid="selected-value">{value}</output>
    </React.StrictMode>
  );
}
