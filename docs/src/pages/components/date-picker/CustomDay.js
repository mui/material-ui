import * as React from 'react';
import { makeStyles } from '@material-ui/styles';
import { createTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import StaticDatePicker from '@material-ui/lab/StaticDatePicker';
import PickersDay from '@material-ui/lab/PickersDay';
import clsx from 'clsx';
import endOfWeek from 'date-fns/endOfWeek';
import isSameDay from 'date-fns/isSameDay';
import isWithinInterval from 'date-fns/isWithinInterval';
import startOfWeek from 'date-fns/startOfWeek';

const defaultTheme = createTheme();

const useStyles = makeStyles(
  (theme) => ({
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
  }),
  { defaultTheme },
);

export default function CustomDay() {
  const classes = useStyles();
  const [value, setValue] = React.useState(new Date());

  const renderWeekPickerDay = (date, selectedDates, pickersDayProps) => {
    if (!value) {
      return <PickersDay {...pickersDayProps} />;
    }

    const start = startOfWeek(value);
    const end = endOfWeek(value);

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    return (
      <PickersDay
        {...pickersDayProps}
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
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        label="Week picker"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderDay={renderWeekPickerDay}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="'Week of' MMM d"
      />
    </LocalizationProvider>
  );
}
