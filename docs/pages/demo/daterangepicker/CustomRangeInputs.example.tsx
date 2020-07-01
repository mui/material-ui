import React, { useState } from 'react';
import { DateRangePicker, DateRange } from '@material-ui/pickers';

function CustomRangeInputs() {
  const [selectedDate, handleDateChange] = useState<DateRange>([null, null]);

  return (
    <DateRangePicker
      label="Advanced keyboard"
      value={selectedDate}
      onChange={date => handleDateChange(date)}
      renderInput={(startProps, endProps) => (
        <React.Fragment>
          <input ref={startProps.ref as React.Ref<HTMLInputElement>} {...startProps.inputProps} />
          <input ref={endProps.ref as React.Ref<HTMLInputElement>} {...endProps.inputProps} />
        </React.Fragment>
      )}
    />
  );
}

export default CustomRangeInputs;
