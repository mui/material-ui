import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

const DatePickerExampleSimple = () => (
  <div>
    <DatePicker hintText="Portrait Dialog" />
    <DatePicker
      hintText="Landscape Dialog"
      mode="landscape"
    />
  </div>
);

export default DatePickerExampleSimple;
