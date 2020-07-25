import * as React from 'react';
import { DateRangePicker, DateRange } from '@material-ui/pickers';

export default function CustomRangeInputs() {
  const [selectedDate, handleDateChange] = React.useState<DateRange<Date>>([null, null]);

  return (
    <DateRangePicker
      label="Advanced keyboard"
      value={selectedDate}
      onChange={(date) => handleDateChange(date)}
      renderInput={(startProps, endProps) => (
        <React.Fragment>
          <input ref={startProps.ref as React.Ref<HTMLInputElement>} {...startProps.inputProps} />
          <input ref={endProps.ref as React.Ref<HTMLInputElement>} {...endProps.inputProps} />
        </React.Fragment>
      )}
    />
  );
}
