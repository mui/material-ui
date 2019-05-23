import React, { Fragment, useState } from 'react';
import { KeyboardDatePicker, DatePicker } from '@material-ui/pickers';

function KeyboardDatePickerExample(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <DatePicker
        clearable
        label="Uncontrolled input"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        minDate={new Date()}
        format={props.__willBeReplacedGetFormatString({
          moment: 'MM/DD/YYYY',
          dateFns: 'MM/dd/yyyy',
        })}
      />

      <KeyboardDatePicker
        label="Masked input"
        placeholder="10/10/2018"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        format={props.__willBeReplacedGetFormatString({
          moment: 'YYYY/MM/DD',
          dateFns: 'yyyy/MM/dd',
        })}
      />
    </Fragment>
  );
}

export default KeyboardDatePickerExample;
