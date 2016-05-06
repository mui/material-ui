import React from 'react';
import TimePicker from 'material-ui/TimePicker';

/**
 * Inline TimePicker is displayed below the input, rather than as a modal dialog.
 */
const TimePickerExampleInline = () => (
  <div>
    <TimePicker hintText="Portrait Inline Dialog" container="inline" />
  </div>
);

export default TimePickerExampleInline;
