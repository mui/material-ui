import React from 'react';
import DatePicker from 'material-ui/DatePicker';

/**
 * The Date Picker defaults to a portrait dialog. The `mode` property can be set to `landscape`.
 * You can also disable the Dialog passing `true` to the `disabled` property.
 *
 * The property `displayMode` (possible values `year` and `month`) can be used to configure which calendar
 * view should be shown.
 */
const DatePickerExampleSimple = () => (
  <div>
    <DatePicker hintText="Portrait Dialog" />
    <DatePicker hintText="Landscape Dialog" mode="landscape" />
    <DatePicker hintText="Dialog with year view" displayMode="year" />
    <DatePicker hintText="Dialog Disabled" disabled={true} />
  </div>
);

export default DatePickerExampleSimple;
