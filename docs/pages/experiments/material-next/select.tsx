import * as React from 'react';
import {
  Box,
  Stack,
  createTheme,
  InputLabel,
  FormControl,
  ThemeProvider,
  Select as MaterialV5Select,
  MenuItem,
} from '@mui/material';
import { Select as MaterialNextSelect, Option, SelectChangeEvent } from '@mui/material-next';
import Typography from 'docs/src/pages/premium-themes/onepirate/modules/components/Typography';

const theme = createTheme({});

const options = [
  { value: 10, label: 'Ten' },
  { value: 20, label: 'Twenty' },
  { value: 30, label: 'Thirty' },
  { value: 40, label: 'Forty' },
  { value: 50, label: 'Fifty' },
  { value: 60, label: 'Sixty' },
  { value: 70, label: 'Seventy' },
];

function MaterialV5Example() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ pl: 2, width: 320 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <MaterialV5Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          {options.map(({ value, label, ...rest }) => (
            <MenuItem {...rest} key={value} value={value}>
              {label}
            </MenuItem>
          ))}
        </MaterialV5Select>
      </FormControl>
    </Box>
  );
}

function MaterialNextExample() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ pl: 2, width: 320 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <MaterialNextSelect
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
          label="Age"
        >
          {options.map(({ value, label, ...rest }) => (
            <Option {...rest} key={value} value={value}>
              {label}
            </Option>
          ))}
        </MaterialNextSelect>
      </FormControl>
    </Box>
  );
}

export default function Experiment() {
  return (
    <ThemeProvider theme={theme}>
      <Stack mt={4} spacing={4}>
        <Typography variant="h4">V5:</Typography>
        <MaterialV5Example />
        <Typography variant="h4">Material Next:</Typography>
        <MaterialNextExample />
      </Stack>
    </ThemeProvider>
  );
}
