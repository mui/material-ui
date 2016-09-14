import React from 'react';
import {DateRangePicker} from 'material-ui/DatePicker';

/**
 * Inline Date Pickers are displayed below the input, rather than as a modal dialog.
 */
const DateRangePickerExampleInline = () => (
  <div>
    <DateRangePicker hintText="Portrait Inline Dialog" container="inline" />
    <DateRangePicker hintText="Landscape Inline Dialog" container="inline" mode="landscape" />
  </div>
);

export default DateRangePickerExampleInline;
