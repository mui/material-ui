import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { MobileDateTimePicker, DesktopDateTimePicker, DateTimePicker } from '@material-ui/pickers';

function DateTimePickerDemo(props) {
  const [selectedDate, handleDateChange] = useState(new Date('2018-01-01T00:00:00.000Z'));

  return (
    <React.Fragment>
      <MobileDateTimePicker
        autoOk
        disableFuture
        value={selectedDate}
        onChange={handleDateChange}
        label="24h clock"
        renderInput={props => <TextField variant="outlined" {...props} />}
      />

      <DesktopDateTimePicker
        ampm
        disablePast
        ampmInClock
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={props => <TextField variant="outlined" {...props} />}
      />

      <DateTimePicker
        renderInput={props => <TextField {...props} />}
        ampm={false}
        disablePast
        value={selectedDate}
        onChange={handleDateChange}
        onError={console.log}
        inputFormat={props.__willBeReplacedGetFormatString({
          moment: 'YYYY/MM/DD HH:mm',
          dateFns: 'yyyy/MM/dd HH:mm',
        })}
        mask="___/__/__ __:__"
      />
    </React.Fragment>
  );
}

export default DateTimePickerDemo;
