import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import Typography from '@mui/joy/Typography';

const options = ['Option 1', 'Option 2'];

export default function ControllableStates() {
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState('');

  return (
    <div>
      <Typography level="body-sm" sx={{ mb: 1 }}>
        <code>value: </code>
        <Typography variant="soft" sx={{ py: 0.4 }}>
          <code>
            <strong>{`${value !== null ? `'${value}'` : 'null'}`}</strong>
          </code>
        </Typography>
      </Typography>
      <Typography level="body-sm">
        <code>inputValue: </code>
        <Typography variant="soft" sx={{ py: 0.4 }}>
          <code>
            <strong>{`'${inputValue}'`}</strong>
          </code>
        </Typography>
      </Typography>
      <br />
      <FormControl id="controllable-states-demo">
        <FormLabel>Controllable</FormLabel>
        <Autocomplete
          placeholder="Controllable"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
          }}
          options={options}
          sx={{ width: 300 }}
        />
      </FormControl>
    </div>
  );
}
