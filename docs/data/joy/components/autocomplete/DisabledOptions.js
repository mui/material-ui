import * as React from 'react';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Autocomplete from '@mui/joy/Autocomplete';

export default function DisabledOptions() {
  return (
    <FormControl>
      <FormLabel>Disabled options</FormLabel>
      <Autocomplete
        id="disabled-options-demo"
        options={timeSlots}
        getOptionDisabled={(option) =>
          option === timeSlots[0] || option === timeSlots[2]
        }
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
