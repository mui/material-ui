import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';

const options = ['Option 1', 'Option 2'];

export default function ControllableStates() {
  const [value, setValue] = React.useState(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      <Typography>
        value:{' '}
        <Typography fontWeight="md" variant="soft">
          {`${value !== null ? `'${value}'` : 'null'}`}
        </Typography>
      </Typography>
      <Typography>
        inputValue:{' '}
        <Typography fontWeight="md" variant="soft">
          {`'${inputValue}'`}
        </Typography>
      </Typography>
      <br />
      <FormControl id="controllable-states-demo">
        <FormLabel>Controllable</FormLabel>
        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={options}
          renderInput={(params) => <Input {...params} placeholder="Controllable" />}
          sx={{ width: 300 }}
        />
      </FormControl>
    </div>
  );
}
