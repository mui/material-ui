import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

interface ProgrammingLanguage {
  id: string;
  label: string;
}

const langs: ProgrammingLanguage[] = [
  { id: 'js', label: 'JavaScript' },
  { id: 'ts', label: 'TypeScript' },
  { id: 'py', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'cs', label: 'C#' },
  { id: 'php', label: 'PHP' },
  { id: 'ruby', label: 'Ruby' },
  { id: 'go', label: 'Go' },
  { id: 'rust', label: 'Rust' },
  { id: 'swift', label: 'Swift' },
];

export default function ControllableStates() {
  const [value, setValue] = React.useState<ProgrammingLanguage | null>(langs[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <Stack spacing={3} sx={{ width: 300 }}>
      <Stack
        spacing={0.5}
        sx={{
          typography: 'body1',
          color: 'text.secondary',
        }}
      >
        <div>
          value:{' '}
          <Box component="code" sx={{ color: 'text.primary' }}>
            {value?.label ?? 'null'}
          </Box>
        </div>
        <div>
          inputValue:{' '}
          <Box component="code" sx={{ color: 'text.primary' }}>
            {`"${inputValue}"`}
          </Box>
        </div>
      </Stack>
      <Autocomplete
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
        }}
        inputValue={inputValue}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        options={langs}
        isOptionEqualToValue={(option, selectedValue) =>
          option.id === selectedValue.id
        }
        sx={{ width: 1 }}
        renderInput={(params) => <TextField {...params} label="Languages" />}
      />
    </Stack>
  );
}
