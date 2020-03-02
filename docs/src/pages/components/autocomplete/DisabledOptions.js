/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function DisabledOptions() {
  return (
    <Autocomplete
      id="disabled-options-demo"
      options={timeSlots}
      getOptionDisabled={option => option === timeSlots[0] || option === timeSlots[2]}
      style={{ width: 300 }}
      renderInput={params => <TextField {...params} label="Disabled options" variant="outlined" />}
    />
  );
}

// One time slot every 30 minutes.
const timeSlots = Array.from(new Array(24 * 2)).map(
  (_, index) => `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
);
