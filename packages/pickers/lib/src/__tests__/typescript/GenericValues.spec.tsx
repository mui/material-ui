import * as React from 'react';
import moment, { Moment } from 'moment';
// eslint-disable-next-line no-restricted-imports
import LuxonAdapter from '@material-ui/pickers/adapter/luxon';
import { DateTime } from 'luxon';
import { TextField } from '@material-ui/core';
import { DatePicker } from '@material-ui/pickers';
import { TimePicker } from '../../TimePicker';
import { ClockView } from '../../views/Clock/ClockView';
import { DateRangePicker } from '../../DateRangePicker/DateRangePicker';
import { CalendarView } from '../../views/Calendar/CalendarView';
import { Day } from '../../views/Calendar/Day';
import { DateTimePicker } from '../../DateTimePicker';

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
  renderDay={(day) => <span>{day.toFormat('dd')} </span>}
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

// Allows inferring for side props
<DatePicker
  value={new DateTime()}
  minDate={new DateTime()}
  renderDay={(day) => <span> {day.toFormat('D')} </span>}
  onChange={(date) => date?.set({ second: 0 })}
  renderInput={(props) => <TextField {...props} />}
/>;

// External components are generic as well
<CalendarView<Moment>
  view="date"
  views={['date']}
  date={moment()}
  minDate={moment()}
  maxDate={moment()}
  onChange={(date) => date?.format()}
  changeView={console.log}
/>;

<Day<Date>
  day={new Date()}
  allowSameDateSelection
  inCurrentMonth
  onDaySelect={(date) => date?.getDay()}
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

/** ****************** */
/* TimePicker */
/** ****************** */

<TimePicker
  value={new DateTime()}
  onChange={(date) => date?.set({ second: 0 })}
  renderInput={(props) => <TextField {...props} />}
/>;

// Allows inferring for side props
<TimePicker
  value={null}
  minTime={new DateTime()}
  onChange={(date) => date?.set({ second: 0 })}
  renderInput={(props) => <TextField {...props} />}
/>;

// External components are generic as well
<ClockView<Date>
  type="hours"
  date={null}
  onChange={(date) => date?.getDate()}
  // TODO cleanup public clock view props
  nextViewAvailable
  previousViewAvailable
  openNextView={console.log}
  openPreviousView={console.log}
  onDateChange={console.log}
/>;

/** ****************** */
/* DateTimePicker */
/** ****************** */

<DateTimePicker
  value={new DateTime()}
  onChange={(date) => date?.set({ second: 0 })}
  renderInput={(props) => <TextField {...props} />}
/>;
