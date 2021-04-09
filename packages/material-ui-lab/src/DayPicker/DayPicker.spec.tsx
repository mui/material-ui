import * as React from 'react';
import moment, { Moment } from 'moment';
import DayPicker from '@material-ui/lab/DayPicker';

// External components are generic as well
<DayPicker<Moment>
  view="day"
  views={['day']}
  date={moment()}
  minDate={moment()}
  maxDate={moment()}
  onChange={(date) => date?.format()}
/>;
