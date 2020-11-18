import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizaitonProvider from '@material-ui/lab/LocalizationProvider';
import DatePicker from '@material-ui/lab/DatePicker';
import PickersDay, { PickersDayProps } from '@material-ui/lab/PickersDay';
import clsx from 'clsx';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';

const useStyles = makeStyles((theme) => ({
  highlight: {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  firstHighlight: {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
  },
  endHighlight: {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
  },
}));

export default function CustomDay() {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = React.useState<Date | null>(
    new Date(),
  );

  const renderWeekPickerDay = (
    date: Date,
    _selectedDates: Date[],
    PickersDayComponentProps: PickersDayProps<Date>,
  ) => {
    if (!selectedDate) {
      return <PickersDay {...PickersDayComponentProps} />;
    }

    const start = startOfWeek(selectedDate);
    const end = endOfWeek(selectedDate);

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    return (
      <PickersDay
        {...PickersDayComponentProps}
        disableMargin
        className={clsx({
          [classes.highlight]: dayIsBetween,
          [classes.firstHighlight]: isFirstDay,
          [classes.endHighlight]: isLastDay,
        })}
      />
    );
  };

  return (
    <LocalizaitonProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Week picker"
        value={selectedDate}
        onChange={handleDateChange}
        renderDay={renderWeekPickerDay as any}
        renderInput={(params) => <TextField {...params} variant="standard" />}
        inputFormat="'Week of' MMM d"
      />
    </LocalizaitonProvider>
  );
}
