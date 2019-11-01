/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export default function DisabledOptions() {
  return (
    <Autocomplete
      options={timeSlots}
      getOptionDisabled={(option: TimeSlot) => option === timeSlots[0] || option === timeSlots[2]}
      style={{ width: 300 }}
      renderInput={params => (
        <TextField
          {...params}
          label="Disabled options"
          variant="outlined"
          fullWidth
          inputProps={{
            ...params.inputProps,
            autoComplete: 'disabled', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
}

type TimeSlot = string;

// One time slot every 30 minutes.
const timeSlots = Array.from(new Array(24 * 2)).map(
  (_, index) => `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${index % 2 === 0 ? '00' : '30'}`,
);
