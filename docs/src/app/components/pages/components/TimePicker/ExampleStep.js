import React from 'react';
import TimePicker from 'material-ui/TimePicker';

const TimePickerExampleStep = () => (
  <div>
    <TimePicker
      hintText="5 minutes step"
      minutesStep={5}
    />
    <TimePicker
      hintText="10 minutes step"
      minutesStep={10}
    />
  </div>
);

export default TimePickerExampleStep;
