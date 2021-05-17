import * as React from 'react';
import moment from 'moment';
import { DateTimePicker } from '@material-ui/lab';

<DateTimePicker
  value={moment()}
  onChange={(date) => date?.set({ second: 0 })}
  renderInput={() => <input />}
/>;
