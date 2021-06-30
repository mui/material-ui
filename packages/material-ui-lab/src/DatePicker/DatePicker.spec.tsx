import * as React from 'react';
import moment, { Moment } from 'moment';
import DatePicker from '@material-ui/lab/DatePicker';
import { expectType } from '@material-ui/types';

// Allows to set date type right with generic JSX syntax
<DatePicker<Date>
  value={new Date()}
  onChange={(date) => date?.getDate()}
  renderInput={() => <input />}
/>;

// Throws error if passed value is invalid
<DatePicker<Date>
  // @ts-expect-error Value is invalid
  value={moment()}
  onChange={(date) => date?.getDate()}
  renderInput={() => <input />}
/>;

// Inference from the state
const InferTest = () => {
  const [date, setDate] = React.useState<Moment | null>(moment());

  return (
    <DatePicker
      value={date}
      onChange={(newDate) => setDate(newDate)}
      renderInput={() => <input />}
    />
  );
};

// Allows inferring for side props
<DatePicker
  value={moment()}
  minDate={moment()}
  renderDay={(day) => <span> {day.format('D')} </span>}
  onChange={(date) => date?.set({ second: 0 })}
  renderInput={() => <input />}
/>;

// TypeScript can't know the type of the DateAdapter in the React context.
// So in this case it is expected that type will be the type of `value` as for now.
// Argueable, this usage doesn't make sense since the component would never reflect the user picked value.
{
  <DatePicker
    value={null}
    onChange={(date) => {
      expectType<null, typeof date>(date);
    }}
    renderInput={() => <input />}
  />;
  // workaround
  <DatePicker<Date>
    value={null}
    onChange={(date) => {
      expectType<Date | null, typeof date>(date);
    }}
    renderInput={() => <input />}
  />;
}

{
  <DatePicker
    value={new Date()}
    onChange={(date) => date?.getDate()}
    renderInput={() => <input />}
    // @ts-expect-error
    displayStaticWrapperAs="desktop"
  />;
}
