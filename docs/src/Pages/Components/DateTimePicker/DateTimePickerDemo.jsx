import React from 'react';
import PropTypesTable from '_shared/PropTypesTable';
import SourcablePanel from '_shared/SourcablePanel';
import { Typography } from '@material-ui/core';

const DateTimePickerDemo = () => (
  <div>
    <Typography variant="h2" gutterBottom>
      Date & time picker
    </Typography>
    <Typography variant="body1" gutterBottom>
      This component is not from material design guidelines.
    </Typography>
    <Typography variant="body1">
      Its a combination of date & time picker and allows that uses the modal to
      select both date and time with one control.
    </Typography>

    <SourcablePanel
      title="Basic usage"
      sourceFile="Components/DateTimePicker/BasicDateTimePicker.example.jsx"
    />

    <SourcablePanel
      title="Inline mode"
      sourceFile="Components/DateTimePicker/InlineDateTimePicker.example.jsx"
    />

    <SourcablePanel
      title="Customization"
      sourceFile="Components/DateTimePicker/CustomDateTimePicker.example.jsx"
      description={
        <Typography variant="body1" gutterBottom>
          Applied mostly all customization, that available for date & time
          pickers
        </Typography>
      }
    />

    <PropTypesTable src="DateTimePicker/DateTimePickerModal.tsx" />
  </div>
);

export default DateTimePickerDemo;
