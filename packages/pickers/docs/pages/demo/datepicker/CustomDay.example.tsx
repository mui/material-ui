/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import clsx from 'clsx';
import isSameDay from 'date-fns/isSameDay';
import endOfWeek from 'date-fns/endOfWeek';
import startOfWeek from 'date-fns/startOfWeek';
import TextField from '@material-ui/core/TextField';
import isWithinInterval from 'date-fns/isWithinInterval';
import { makeStyles } from '@material-ui/core';
// this guy required only on the docs site to work with dynamic date library
import { DatePicker, PickersDay, PickersDayProps } from '@material-ui/pickers';
// TODO remove relative import
import { makeJSDateObject } from '../../../utils/helpers';

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

export default function CustomDay(demoProps: any) {
  const classes = useStyles();
  const [selectedDate, handleDateChange] = React.useState<Date | null>(new Date());

  const renderWeekPickerDay = (
    date: Date,
    _selectedDates: Date[],
    DayComponentProps: PickersDayProps<Date>
  ) => {
    const dateClone = makeJSDateObject(date);
    const selectedDateClone = makeJSDateObject(selectedDate ?? new Date());

    const start = startOfWeek(selectedDateClone);
    const end = endOfWeek(selectedDateClone);

    const dayIsBetween = isWithinInterval(dateClone, { start, end });
    const isFirstDay = isSameDay(dateClone, start);
    const isLastDay = isSameDay(dateClone, end);

    return (
      <PickersDay
        {...DayComponentProps}
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
    <DatePicker
      disableMaskedInput
      showDaysOutsideCurrentMonth
      label="Week picker"
      value={selectedDate}
      onChange={handleDateChange}
      renderDay={renderWeekPickerDay as any}
      renderInput={(props) => <TextField {...props} />}
      inputFormat={demoProps.__willBeReplacedGetFormatString({
        moment: `[Week of] MMM D`,
        dateFns: "'Week of' MMM d",
      })}
    />
  );
}
