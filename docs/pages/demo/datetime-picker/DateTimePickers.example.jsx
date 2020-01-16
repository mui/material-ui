import React, { useState } from 'react';
import { MobileDateTimePicker, DesktopDateTimePicker, DateTimePicker } from '@material-ui/pickers';

function DateTimePickerDemo(props) {
  const [selectedDate, handleDateChange] = useState(new Date('2018-01-01T00:00:00.000Z'));

  return (
    <>
      <MobileDateTimePicker
        autoOk
        disableFuture
        value={selectedDate}
        onChange={handleDateChange}
        label="24h clock"
      />

      <DesktopDateTimePicker
        ampm
        disablePast
        ampmInClock
        value={selectedDate}
        onChange={handleDateChange}
      />

      <DateTimePicker
        value={selectedDate}
        onChange={handleDateChange}
        onError={console.log}
        disablePast
        format={props.__willBeReplacedGetFormatString({
          moment: 'YYYY/MM/DD HH:mm',
          dateFns: 'yyyy/MM/dd HH:mm',
        })}
      />
    </>
  );
}

export default DateTimePickerDemo;
