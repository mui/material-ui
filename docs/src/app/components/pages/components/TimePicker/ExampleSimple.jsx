import React from 'react';
import TimePicker from 'material-ui/lib/TimePicker';

const TimePickerExampleSimple = () => (
  <div>
    <TimePicker
      hintText="12hr Format"
    />
    <TimePicker
      format="24hr"
      hintText="24hr Format"
    />
  </div>
);

export default TimePickerExampleSimple;
