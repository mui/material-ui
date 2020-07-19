import * as React from 'react';
import Badge from '@material-ui/core/Badge';
import TextField from '@material-ui/core/TextField';
import { makeJSDateObject } from '../../../utils/helpers';
import { DatePicker, PickersDay } from '@material-ui/pickers';
import { CalendarSkeleton } from '@material-ui/pickers/CalendarSkeleton';

export default function ServerRequest() {
  const requestAbortController = React.useRef(null);
  const [highlightedDays, setHighlightedDays] = React.useState([1, 2, 15]);
  const [selectedDate, handleDateChange] = React.useState(new Date());

  React.useEffect(() => {
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setHighlightedDays(null);

    const controller = new AbortController();
    fetch(`/fakeApi/randomDate?month=${date.toString()}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then(({ daysToHighlight }) => setHighlightedDays(daysToHighlight))
      .catch(() => console.log('Wow, you are switching months too quickly 🐕'));

    requestAbortController.current = controller;
  };

  return (
    <DatePicker
      value={selectedDate}
      loading={highlightedDays === null}
      onChange={(date) => handleDateChange(date)}
      onMonthChange={handleMonthChange}
      // loading
      renderInput={(props) => <TextField {...props} />}
      renderLoading={() => <CalendarSkeleton />}
      renderDay={(day, selectedDate, DayComponentProps) => {
        const date = makeJSDateObject(day); // skip this step, it is required to support date libs
        const isSelected =
          DayComponentProps.inCurrentMonth && highlightedDays.includes(date.getDate());

        return (
          <Badge
            key={date.toString()}
            overlap="circle"
            badgeContent={isSelected ? '🌚' : undefined}
          >
            <PickersDay {...DayComponentProps} />
          </Badge>
        );
      }}
    />
  );
}
