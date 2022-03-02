import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';

const adapterToUse = new AdapterDateFns();

export default function CalendarPickerYearOnly() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CalendarPicker
        views={['year']}
        date={adapterToUse.date('2019-01-01T00:00:00.000')}
        onChange={() => {}}
      />
    </LocalizationProvider>
  );
}
