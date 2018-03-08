import React from 'react';
import SourcablePanel from '_shared/SourcablePanel';
import { Typography } from 'material-ui';

const DateTimePickerDemo = () => (
  <div>
    <Typography variant="display2" gutterBottom>
      Date & time picker
    </Typography>
    <Typography variant="body1" gutterBottom>
      This component is not from material design guidelines.
    </Typography>
    <Typography variant="body1">
      Its a combination of date & time picker and allows
      that uses the modal to select both date and time with one control.
    </Typography>

    <SourcablePanel
      title="Basic usage"
      sourceFile="Demo/BasicDateTimePicker.jsx"
    />
    <SourcablePanel
      title="Customization"
      sourceFile="Demo/CustomDateTimePicker.jsx"
      description={
        <Typography variant="body1" gutterBottom>
          Applied mostly all customization, that available for date & time pickers
        </Typography>
      }
    />
  </div>
);

export default DateTimePickerDemo;

