import React, { Fragment, useState } from 'react';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { TextField } from '@material-ui/core';
import { DesktopDatePicker } from '@material-ui/pickers';

function AdvancedKeyboardExample(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <DesktopDatePicker
        autoOk
        label="Advanced keyboard"
        inputFormat={props.__willBeReplacedGetFormatString({
          moment: 'YYYY/MM/DD',
          dateFns: 'yyyy/MM/dd',
        })}
        mask="____/__/__"
        openPickerIcon={<EventNoteIcon />}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        renderInput={props => <TextField {...props} variant="outlined" />}
      />
    </Fragment>
  );
}

export default AdvancedKeyboardExample;
