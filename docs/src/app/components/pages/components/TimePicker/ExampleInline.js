import React from 'react';
import TimePicker from 'material-ui/TimePicker';

/**
 * Inline Date Pickers are displayed below the input, rather than as a modal dialog.
 */
const TimePickerExampleInline = () => (
  <div>
    <TimePicker
      hintText="Inline Dialog"
      container="inline"
    />
    <TimePicker
      autoOk={true}
      hintText="Inline Dialog with auto ok"
      container="inline"
    />
  </div>
);

export default TimePickerExampleInline;
