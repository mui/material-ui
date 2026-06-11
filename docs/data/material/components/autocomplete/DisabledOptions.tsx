import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// One time slot every 30 minutes.
const timeSlots = Array.from(
  { length: 24 * 2 },
  (_, index) =>
    `${index < 20 ? '0' : ''}${Math.floor(index / 2)}:${
      index % 2 === 0 ? '00' : '30'
    }`,
);

const unavailableTimeSlots = new Set(
  timeSlots.filter((_, index) => index % 4 === 0),
);

export default function DisabledOptions() {
  return (
    <Autocomplete
      options={timeSlots}
      getOptionDisabled={(option) => unavailableTimeSlots.has(option)}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Appointment time" />}
    />
  );
}
