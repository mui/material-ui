import React, { Fragment, useState } from 'react';
import { KeyboardDatePicker } from 'material-ui-pickers';

function KeyboardDatePickerExample(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <KeyboardDatePicker
        clearable
        label="Uncontrolled input"
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        minDate={new Date()}
        format={props.getFormatString({
          moment: 'MM/DD/YYYY',
          dateFns: 'MM/dd/yyyy',
        })}
      />

      <KeyboardDatePicker
        label="Masked input"
        placeholder="10/10/2018"
        value={selectedDate}
        onChange={handleDateChange}
        format={props.getFormatString({
          moment: 'YYYY/MM/DD',
          dateFns: 'yyyy/MM/dd',
        })}
      />
    </Fragment>
  );
}

export default KeyboardDatePickerExample;
