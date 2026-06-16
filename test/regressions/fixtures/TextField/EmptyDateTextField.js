import * as React from 'react';
import TextField from '@mui/material/TextField';

const types = ['date', 'datetime-local', 'month', 'time', 'week'];

// The empty inputs should render a dimmed placeholder, while the filled ones
// render at full color, so the two rows are visually distinguishable.
export default function EmptyDateTextField() {
  return (
    <div>
      {['standard', 'outlined', 'filled'].map((variant) => (
        <div key={variant}>
          {types.map((type) => (
            <TextField
              key={`${variant}-empty-${type}`}
              type={type}
              label={`empty ${type}`}
              variant={variant}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          ))}
          {types.map((type) => (
            <TextField
              key={`${variant}-filled-${type}`}
              type={type}
              defaultValue={
                {
                  date: '2020-01-01',
                  'datetime-local': '2020-01-01T10:30',
                  month: '2020-01',
                  time: '10:30',
                  week: '2020-W01',
                }[type]
              }
              label={`filled ${type}`}
              variant={variant}
              slotProps={{ inputLabel: { shrink: true } }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
