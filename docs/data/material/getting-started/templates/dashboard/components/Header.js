import * as React from 'react';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

export default function Header() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
      <div>
        <Typography gutterBottom variant="h4" component="h1">
          Dashboard
        </Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 500 }}>
          Explore real-time analytics and trends on user behavior to enhance
          engagement and drive strategic decisions.
        </Typography>
      </div>
      <Stack direction="row" alignItems="center" gap={1}>
        <OutlinedInput
          size="small"
          placeholder="Search"
          startAdornment={<SearchRoundedIcon />}
          inputProps={{ 'aria-label': 'Search in dashboard' }}
        />
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<CalendarMonthRoundedIcon />}
        >
          March, 2024
        </Button>
        <IconButton>
          <MoreVertRoundedIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}
