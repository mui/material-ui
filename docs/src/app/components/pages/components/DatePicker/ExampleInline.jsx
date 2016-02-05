import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

const DatePickerExampleInline = () => (
  <div>
    <DatePicker hintText="Portrait Inline Dialog" container="inline" />
    <DatePicker hintText="Landscape Inline Dialog" container="inline" mode="landscape" />
  </div>
);

export default DatePickerExampleInline;
