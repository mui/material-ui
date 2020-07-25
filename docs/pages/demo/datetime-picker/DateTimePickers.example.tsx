import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { MobileDateTimePicker, DesktopDateTimePicker, DateTimePicker } from '@material-ui/pickers';

export default function DateTimePickerDemo(props: any) {
  const [selectedDate, handleDateChange] = React.useState<Date | null>(
    new Date('2018-01-01T00:00:00.000Z')
  );

  return (
    <React.Fragment>
      <MobileDateTimePicker
        disableFuture
        value={selectedDate}
        onChange={handleDateChange}
        label="24h clock"
        renderInput={(props) => <TextField variant="outlined" {...props} />}
      />

      <DesktopDateTimePicker
        ampm
        disablePast
        ampmInClock
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(props) => <TextField variant="outlined" {...props} />}
      />

      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        ampm={false}
        disablePast
        value={selectedDate}
        onChange={handleDateChange}
        onError={console.log}
        disableMaskedInput
        inputFormat={props.__willBeReplacedGetFormatString({
          moment: 'YYYY/MM/DD HH:mm',
          dateFns: 'yyyy/MM/dd HH:mm',
        })}
      />
    </React.Fragment>
  );
}
