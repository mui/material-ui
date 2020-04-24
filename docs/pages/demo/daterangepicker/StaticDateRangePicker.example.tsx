import * as React from 'react';
import { TextField } from '@material-ui/core';
import { StaticDateRangePicker, DateRange } from '@material-ui/pickers';

function StaticDateRangePickerExample() {
  const [selectedDate, handleDateChange] = React.useState<DateRange>([null, null]);

  return (
    <>
      <StaticDateRangePicker
        displayStaticWrapperAs="desktop"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        renderInput={props => <TextField {...props} />}
      />

      <StaticDateRangePicker
        displayStaticWrapperAs="mobile"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        renderInput={props => <TextField {...props} />}
      />
    </>
  );
}

export default StaticDateRangePickerExample;
