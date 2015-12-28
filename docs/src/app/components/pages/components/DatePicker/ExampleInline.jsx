import React from 'react';
import DatePicker from 'material-ui/lib/date-picker/date-picker';

const DatePickerExampleInline = () => (
  <div>
    <DatePicker
      hintText="Inline"
      container="inline" />
    <DatePicker
      hintText="Inline (AutoOk)"
      container="inline"
      autoOk={true} />
  </div>
);

export default DatePickerExampleInline;
