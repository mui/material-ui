import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';
import Input from '@mui/joy/Input';

export default function DisabledOptions() {
  return (
    <FormControl id="disabled-options-demo">
      <FormLabel>Disabled options</FormLabel>
      <Autocomplete
        options={timeSlots}
        getOptionDisabled={(option) =>
          option === timeSlots[0] || option === timeSlots[2]
        }
        renderInput={(params) => (
          <Input {...params} placeholder="Disabled options" />
        )}
        sx={{ width: 300 }}
      />
    </FormControl>
  );
}

// One time slot every 30 minutes.
const timeSlots = Array.from(new Array(24 * 2)).map(
  (_, index) =>
    `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${
      index % 2 === 0 ? '00' : '30'
    }`,
);
