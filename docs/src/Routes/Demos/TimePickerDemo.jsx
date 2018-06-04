import React from 'react';
import PropTypesTable from '_shared/PropTypesTable';
import SourcablePanel from '_shared/SourcablePanel';
import { Typography } from '@material-ui/core';

const DatePickerDemoDemo = () => (
  <div>
    <Typography variant="display2" gutterBottom>
      Time picker
    </Typography>
    <Typography variant="body1" gutterBottom>
      Time pickers use a dialog to select a single time (in the hours:minutes format).
    </Typography>
    <Typography variant="body1">
      The selected time is indicated by the filled circle at the end of the clock hand.
    </Typography>

    <SourcablePanel
      title="Basic usage"
      sourceFile="Demo/TimePickerBasic.jsx"
      description={
        <Typography variant="body1" gutterBottom>
          A time picker should adjusts to a user’s preferred time setting,
          i.e. the 12-hour or 24-hour format.
        </Typography>
      }
    />

    <SourcablePanel
      title="Keyboard input"
      sourceFile="Demo/KeyboardTimePicker.jsx"
    />

    <PropTypesTable src="TimePicker/TimePickerWrapper.jsx" />
  </div>
);

export default DatePickerDemoDemo;

