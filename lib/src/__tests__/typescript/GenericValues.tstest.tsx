/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import moment, { Moment } from 'moment';
import LuxonAdapter from '@material-ui/pickers/adapter/luxon';
import { DateTime } from 'luxon';
import { TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { DateRangePicker } from '../../DateRangePicker/DateRangePicker';

// Allows to set date type right with generic JSX syntax
<DatePicker<Date>
  value={new Date()}
  onChange={(date) => date?.getDate()}
  renderInput={(props) => <TextField {...props} />}
/>;

// Also works for DateRangePicker
<DateRangePicker<DateTime>
  value={[new DateTime(), new DateTime()]}
  onChange={(date) => date[0]?.set({ second: 15 })}
  renderInput={(props) => <TextField {...props} />}
/>;

// Throws error if passed value is invalid
<DatePicker<Date>
  // @ts-expect-error Value is invalid
  value={new DateTime()}
  onChange={(date) => date?.getDate()}
  renderInput={(props) => <TextField {...props} />}
/>;

// Inference from the state
const InferTest = () => {
  const [date, setDate] = React.useState<DateTime | null>(new DateTime());

  return (
    <DatePicker
      value={date}
      onChange={(date) => setDate(date)}
      renderInput={(props) => <TextField {...props} />}
    />
  );
};

// Infer value type from the dateAdapter
<DatePicker
  value={new DateTime()}
  onChange={(date) => console.log(date)}
  renderInput={(props) => <TextField {...props} />}
  dateAdapter={new LuxonAdapter()}
/>;

// Conflict between value type and date adapter causes error
<DatePicker
  value={moment()}
  onChange={(date) => console.log(date)}
  renderInput={(props) => <TextField {...props} />}
  // @ts-expect-error
  dateAdapter={new LuxonAdapter()}
/>;

// Conflict between explicit generic type and date adapter causes error
<DatePicker<Moment>
  value={moment()}
  onChange={(date) => console.log(date)}
  renderInput={(props) => <TextField {...props} />}
  // @ts-expect-error
  dateAdapter={new LuxonAdapter()}
/>;

// Edge case and known issue. When the passed `value` is not a date type
// We cannot infer the type properly without explicit generic type or `dateAdapter` prop
// So in this case it is expected that type will be `null` as for now
<DatePicker
  value={null}
  // @ts-expect-error `Property 'getDate' does not exist on type 'never'.`
  onChange={(date) => date?.getDate()}
  renderInput={(props) => <TextField {...props} />}
/>;
