import * as React from 'react';
import PickersDay from '@mui/lab/PickersDay';

<PickersDay<Date>
  day={new Date()}
  allowSameDateSelection
  outsideCurrentMonth
  onDaySelect={(date) => date?.getDay()}
/>;
