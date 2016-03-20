import React from 'react';
import TimePicker from 'material-ui/lib/TimePicker';

const TimePickerInternational = () => (
  <div>
    <TimePicker
      hintText="Custom Labels"
      okLabel="确定"
      cancelLabel="取消"
    />
  </div>
);

export default TimePickerInternational;
