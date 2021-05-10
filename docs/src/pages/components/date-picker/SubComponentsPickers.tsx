import * as React from 'react';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import CalendarPicker from '@material-ui/lab/CalendarPicker';
import MonthPicker from '@material-ui/lab/MonthPicker';
import YearPicker from '@material-ui/lab/YearPicker';

const minDate = new Date('2020-01-01T00:00:00.000');
const maxDate = new Date('2034-01-01T00:00:00.000');

const useYearPickerStyles = makeStyles({
  root: {
    maxWidth: '30ch',
  },
});

export default function SubComponentsPickers() {
  const [date, setDate] = React.useState<Date | null>(new Date());

  const yearPickerClasses = useYearPickerStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'start',
          flexDirection: 'row',
          '& > div': { margin: 2 },
        }}
      >
        <CalendarPicker
          allowKeyboardControl={false}
          date={date}
          onChange={(newDate) => setDate(newDate)}
        />
        <MonthPicker
          date={date}
          minDate={minDate}
          maxDate={maxDate}
          onChange={(newDate) => setDate(newDate)}
        />
        <YearPicker
          className={yearPickerClasses.root}
          date={date}
          isDateDisabled={() => false}
          minDate={minDate}
          maxDate={maxDate}
          onChange={(newDate) => setDate(newDate)}
        />
      </Box>
    </LocalizationProvider>
  );
}
