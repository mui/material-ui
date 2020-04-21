import React, { Fragment, useState } from 'react';
import EventNoteIcon from '@material-ui/icons/EventNote';
import { DesktopDatePicker } from '@material-ui/pickers';

function AdvancedKeyboardExample(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
    <Fragment>
      <DesktopDatePicker
        autoOk
        variant="outlined"
        label="Advanced keyboard"
        placeholder="2018/01/01"
        inputFormat={props.__willBeReplacedGetFormatString({
          moment: 'YYYY/MM/DD',
          dateFns: 'yyyy/MM/dd',
        })}
        mask="____/__/__"
        openPickerIcon={<EventNoteIcon />}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
      />
    </Fragment>
  );
}

export default AdvancedKeyboardExample;
