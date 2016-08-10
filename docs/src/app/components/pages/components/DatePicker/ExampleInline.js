import React from 'react';
import DatePicker from 'material-ui/DatePicker';

/**
 * Inline Date Pickers are displayed below the input, rather than as a modal dialog.
 */
const DatePickerExampleInline = () => (
  <div>
    <DatePicker hintText="Portrait Inline Dialog" container="inline" />
    <DatePicker hintText="Landscape Inline Dialog" container="inline" mode="landscape" />
    <DatePicker
      hintText="Keyboard Enabled Dialog"
      container="inline"
      mode="landscape"
      keyboardEnabled={true}
    />
  </div>
);

export default DatePickerExampleInline;
