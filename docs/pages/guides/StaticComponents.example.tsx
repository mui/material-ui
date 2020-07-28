import * as React from 'react';
import { Paper, Button } from '@material-ui/core';
import { PickersClockView, PickersCalendarView } from '@material-ui/pickers';

export default function StaticPickers() {
  const [date, handleDateChange] = React.useState<Date | null>(new Date());
  const [calendarView, setCalendarView] = React.useState<'date' | 'year'>('date');

  return (
    <React.Fragment>
      <div>
        <Paper style={{ overflow: 'hidden' }}>
          <PickersCalendarView
            date={date}
            view={calendarView}
            views={['date', 'year']}
            // @ts-expect-error TODO FIX typings
            changeView={setCalendarView}
            onChange={handleDateChange as any}
          />
        </Paper>
        <Button fullWidth onClick={() => handleDateChange(null)}>
          Clear date ({date && date.toJSON()})
        </Button>
      </div>
      <div>
        <PickersClockView
          type="hours"
          date={date}
          ampm={false}
          onChange={handleDateChange as any}
          // TODO Fix me by generic component types
          {...({} as any)}
        />
      </div>
    </React.Fragment>
  );
}
