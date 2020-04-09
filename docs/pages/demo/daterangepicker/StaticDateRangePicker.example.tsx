import * as React from 'react';
import { StaticDateRangePicker, DateRange } from '@material-ui/pickers';

function StaticDateRangePickerExample() {
  const [selectedDate, handleDateChange] = React.useState<DateRange>([null, null]);

  return (
    <>
      <StaticDateRangePicker
        displayStaticWrapperAs="desktop"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <StaticDateRangePicker
        displayStaticWrapperAs="mobile"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
    </>
  );
}

export default StaticDateRangePickerExample;
