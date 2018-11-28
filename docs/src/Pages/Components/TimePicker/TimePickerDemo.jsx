import React from 'react';
import PropTypesTable from '_shared/PropTypesTable';
import SourcablePanel from '_shared/SourcablePanel';
import { Typography } from '@material-ui/core';

const TimePickerDemo = () => (
  <div>
    <Typography variant="h2" gutterBottom>
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
      sourceFile="Components/TimePicker/TimePickerBasic.example.jsx"
      description={
        <Typography variant="body1" gutterBottom>
          A time picker should adjusts to a user’s preferred time setting, i.e. the 12-hour or
          24-hour format.
        </Typography>
      }
    />

    <SourcablePanel
      title="Seconds input"
      sourceFile="Components/TimePicker/SecondsTimePicker.example.jsx"
      description={
        <Typography variant="body1" gutterBottom>
          Seconds input can be used for selection of precise time point
        </Typography>
      }
    />

    <SourcablePanel
      title="Keyboard input"
      sourceFile="Components/TimePicker/KeyboardTimePicker.example.jsx"
    />

    <SourcablePanel
      title="Inline mode"
      sourceFile="Components/TimePicker/InlineTimePicker.example.jsx"
    />

    <PropTypesTable src="TimePicker/TimePickerModal.tsx" />
  </div>
);

export default TimePickerDemo;
