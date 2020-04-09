import * as React from 'react';
import { MobileDateRangePicker, DesktopDateRangePicker, DateRange } from '@material-ui/pickers';

function ResponsiveDateRangePicker() {
  const [selectedDate, handleDateChange] = React.useState<DateRange>([null, null]);

  return (
    <>
      <MobileDateRangePicker
        startText="Mobile start"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />

      <DesktopDateRangePicker
        startText="Desktop start"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
    </>
  );
}

export default ResponsiveDateRangePicker;
