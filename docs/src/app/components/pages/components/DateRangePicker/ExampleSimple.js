import React from 'react';
import {DateRangePicker} from 'material-ui/DatePicker';

/**
 * The Date Picker defaults to a portrait dialog. The `mode` property can be set to `landscape`.
 * You can also disable the Dialog passing `true` to the `disabled` property.
 */
const DateRangePickerExampleSimple = () => (
  <div>
    <DateRangePicker hintText="Portrait Dialog" />
    <DateRangePicker hintText="Landscape Dialog" mode="landscape" />
    <DateRangePicker hintText="Dialog Disabled" disabled={true} />
  </div>
);

export default DateRangePickerExampleSimple;
