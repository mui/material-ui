import React, { Fragment, useState } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

function KeyboardDatePickerExample(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <KeyboardDatePicker
        clearable
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        minDate={new Date()}
        format={props.__willBeReplacedGetFormatString({
          moment: 'MM/DD/YYYY',
          dateFns: 'MM/dd/yyyy',
        })}
      />

      <KeyboardDatePicker
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
