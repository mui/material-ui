/* eslint-disable no-underscore-dangle, no-console */
import * as React from 'react';
import TextField from '@material-ui/core/TextField';
import { MobileDateTimePicker, DesktopDateTimePicker, DateTimePicker } from '@material-ui/pickers';

export default function DateTimePickerDemo(demoProps: any) {
  const [value, setValue] = React.useState<Date | null>(new Date('2018-01-01T00:00:00.000Z'));

  return (
    <React.Fragment>
      <MobileDateTimePicker
        disableFuture
        value={value}
        onChange={(newValue) => setValue(newValue)}
        label="24h clock"
        renderInput={(props) => <TextField variant="outlined" {...props} />}
      />
      <DesktopDateTimePicker
        ampm
        disablePast
        ampmInClock
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(props) => <TextField variant="outlined" {...props} />}
      />
      <DateTimePicker
        renderInput={(props) => <TextField {...props} />}
        ampm={false}
        disablePast
        value={value}
        onChange={(newValue) => setValue(newValue)}
        onError={console.log}
        disableMaskedInput
        inputFormat={demoProps.__willBeReplacedGetFormatString({
          moment: 'YYYY/MM/DD HH:mm',
          dateFns: 'yyyy/MM/dd HH:mm',
        })}
      />
    </React.Fragment>
  );
}
