import * as React from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';

const PickersCalendarWeekDayLabel = styled(Typography, { skipSx: true })(
  ({ theme }) => ({
    width: 36,
    height: 40,
    margin: '0 2px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: theme.palette.text.secondary,
  }),
);

export default function CustomWeekdayLabel() {
  const [value, setValue] = React.useState(new Date());

  const renderWeekdayLabel = (weekday, i) => (
    <PickersCalendarWeekDayLabel
      aria-hidden
      key={weekday + i.toString()}
      variant="caption"
    >
      {weekday}
    </PickersCalendarWeekDayLabel>
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        label="Week picker"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderWeekdayLabel={renderWeekdayLabel}
        renderInput={(params) => <TextField {...params} />}
        inputFormat="'Week of' MMM d"
      />
    </LocalizationProvider>
  );
}
