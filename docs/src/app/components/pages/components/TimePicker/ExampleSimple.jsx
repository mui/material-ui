import React from 'react';
import TimePicker from 'material-ui/lib/time-picker/time-picker';

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
