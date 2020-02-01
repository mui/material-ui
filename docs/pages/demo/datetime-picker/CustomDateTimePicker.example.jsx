import React, { useState } from 'react';
import SnoozeIcon from '@material-ui/icons/Snooze';
import AlarmIcon from '@material-ui/icons/AddAlarm';
import { IconButton, InputAdornment } from '@material-ui/core';
import { DateTimePicker, MobileDateTimePicker } from '@material-ui/pickers';

function CustomDateTimePicker(props) {
  const [clearedDate, handleClearedDateChange] = useState(null);
  const [selectedDate, handleDateChange] = useState(new Date('2019-01-01T18:54'));

  return (
    <>
      <DateTimePicker
        autoOk
        disableFuture
        hideTabs
        ampm={false}
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        allowKeyboardControl={false}
        minDate={new Date('2018-01-01')}
        helperText="Hardcoded helper text"
        leftArrowIcon={<AlarmIcon />}
        leftArrowButtonProps={{ 'aria-label': 'Prev month' }}
        rightArrowButtonProps={{ 'aria-label': 'Next month' }}
        rightArrowIcon={<SnoozeIcon />}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <AlarmIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <MobileDateTimePicker
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        label="With error handler"
        onError={console.log}
        minDate={new Date('2018-01-01T00:00')}
        format={props.__willBeReplacedGetFormatString({
          moment: 'YYYY/MM/DD hh:mm A',
          dateFns: 'yyyy/MM/dd hh:mm a',
        })}
        mask="___/__/__ __:__ _M"
      />

      <DateTimePicker
        clearable
        value={clearedDate}
        onChange={handleClearedDateChange}
        helperText="Clear Initial State"
      />
    </>
  );
}

export default CustomDateTimePicker;
