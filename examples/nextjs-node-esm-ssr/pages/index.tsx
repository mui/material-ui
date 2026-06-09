import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// Server-render the page on every request so `next start` exercises the same
// Node module resolution path on each reload.
export function getServerSideProps() {
  return { props: {} };
}

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack spacing={2} sx={{ maxWidth: 480, mx: 'auto', p: 4 }}>
        <Typography variant="h5" component="h1">
          Next.js Node ESM SSR with Material UI
        </Typography>
        <Typography>
          The date picker reaches Material UI transition internals through the server-external
          @mui/x-date-pickers package.
        </Typography>
        <DatePicker label="Pick a date" defaultValue={dayjs('2026-06-13')} />
      </Stack>
    </LocalizationProvider>
  );
}
