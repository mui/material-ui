import * as React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';

const startDate = dayjs('2026-04-14');
const endDate = dayjs('2026-05-08');

export default function StaticDateRangePickerDemo() {
  return (
    <div data-testid="screenshot-target">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <StaticDateRangePicker
          displayStaticWrapperAs="desktop"
          defaultValue={[startDate, endDate]}
          referenceDate={dayjs('2026-04-10')}
        />
      </LocalizationProvider>
    </div>
  );
}
