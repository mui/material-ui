import * as React from 'react';
import { DateRangePicker, DateRange } from '@material-ui/pickers';

function BasicDateRangePicker() {
  const [selectedDate, handleDateChange] = React.useState<DateRange>([null, null]);

  return (
    <DateRangePicker
      startText="Check-in"
      endText="Check-out"
      value={selectedDate}
      onChange={date => handleDateChange(date)}
    />
  );
}

export default BasicDateRangePicker;
