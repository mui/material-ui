import React from 'react';
import DatePicker from 'material-ui/DatePicker';

const DatePickerExampleInline = () => (
  <div>
    <DatePicker hintText="Portrait Inline Dialog" container="inline" />
    <DatePicker hintText="Portrait Inline With Time" container="inline" timeAware={true} />
    <DatePicker hintText="Landscape Inline Dialog" container="inline" mode="landscape" />
  </div>
);

export default DatePickerExampleInline;
