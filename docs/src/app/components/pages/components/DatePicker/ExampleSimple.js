import React from 'react';
import DatePicker from 'material-ui/DatePicker';

const DatePickerExampleSimple = () => (
  <div>
    <DatePicker hintText="Portrait Dialog" />
    <DatePicker hintText="Landscape Dialog" mode="landscape" />
    <DatePicker hintText="Dialog Disabled" disabled={true} />
    <DatePicker hintText="Portrait Dialog With Time" timeAware={true} />
  </div>
);

export default DatePickerExampleSimple;
