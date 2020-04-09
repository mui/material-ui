import React, { useState } from 'react';
import { Badge } from '@material-ui/core';
import { DatePicker, Day } from '@material-ui/pickers';
import { makeJSDateObject } from '../../../utils/helpers';

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function ServerRequest() {
  const [selectedDays, setSelectedDays] = useState([1, 2, 15]);
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleMonthChange = async () => {
    // just select random days to simulate server side based data
    return new Promise(resolve => {
      setTimeout(() => {
        setSelectedDays([1, 2, 3].map(() => getRandomNumber(1, 28)));
        resolve();
      }, 1000);
    });
  };

  return (
    <>
      <DatePicker
        value={selectedDate}
        onChange={date => handleDateChange(date)}
        onMonthChange={handleMonthChange}
        renderDay={(day, selectedDate, DayComponentProps) => {
          const date = makeJSDateObject(day); // skip this step, it is required to support date libs
          const isSelected =
            DayComponentProps.inCurrentMonth && selectedDays.includes(date.getDate());

          return (
            <Badge overlap="circle" badgeContent={isSelected ? '🌚' : undefined}>
              <Day {...DayComponentProps} />
            </Badge>
          );
        }}
      />
    </>
  );
}

export default ServerRequest;
