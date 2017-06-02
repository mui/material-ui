import React from 'react';
import TimePicker from 'material-ui/TimePicker';

const TimePickerExampleSimple = () => (
  <div>
    <TimePicker
      hintText="12hr Format"
    />
    <TimePicker
      hintText="12hr Format with auto ok"
      autoOk={true}
    />
    <TimePicker
      format="24hr"
      hintText="24hr Format"
    />
    <TimePicker
      disabled={true}
      format="24hr"
      hintText="Disabled TimePicker"
    />
  </div>
);

export default TimePickerExampleSimple;
