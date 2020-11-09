/* eslint-disable no-underscore-dangle */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { MobileDatePicker, DesktopDatePicker, DatePicker } from '@material-ui/pickers';

export default function DatePickersVariants(demoProps: any) {
  const [value, setValue] = React.useState<Date | null>(new Date());

  return (
    <React.Fragment>
      <MobileDatePicker
        clearable
        label="For mobile"
        inputFormat={demoProps.__willBeReplacedGetFormatString({
          moment: 'MM/DD/YYYY',
          dateFns: 'MM/dd/yyyy',
        })}
        toolbarPlaceholder="Enter Date"
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(props) => <TextField {...props} />}
      />
      <DesktopDatePicker
        label="For desktop"
        value={value}
        minDate={new Date('2017-01-01')}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(props) => <TextField {...props} />}
      />
      <DatePicker
        disableFuture
        label="Responsive"
        openTo="year"
        views={['year', 'month', 'date']}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        renderInput={(props) => <TextField {...props} />}
      />
    </React.Fragment>
  );
}
