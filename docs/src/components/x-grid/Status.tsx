import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Chip from '@mui/material/Chip';

interface StatusProps {
  status: string;
}

const Status = React.memo((props: StatusProps) => {
  const { status } = props;
  let label = status;
  if (status === 'PartiallyFilled') {
    label = 'Partial';
  }
  return (
    <Chip
      size="small"
      label={label}
      variant="outlined"
      sx={{
        lineHeight: 1,
        fontSize: '10px',
        fontWeight: 'bold',
        ...(status === 'Open' && {
          borderColor: 'primary.500',
          bgcolor: (theme) => alpha(theme.palette.primary[500], 0.1),
          color: (theme) => (theme.palette.mode === 'dark' ? 'primary.300' : 'primary.600'),
        }),
        ...(status === 'Filled' && {
          borderColor: 'success.500',
          bgcolor: (theme) => alpha(theme.palette.success[500], 0.1),
          color: (theme) => (theme.palette.mode === 'dark' ? 'success.500' : 'success.800'),
        }),
        ...(status === 'PartiallyFilled' && {
          borderColor: 'warning.600',
          bgcolor: (theme) => alpha(theme.palette.warning[500], 0.1),
          color: (theme) => (theme.palette.mode === 'dark' ? 'warning.300' : 'warning.900'),
        }),
        ...(status === 'Rejected' && {
          borderColor: 'error.500',
          bgcolor: (theme) => alpha(theme.palette.error[500], 0.1),
          color: (theme) => (theme.palette.mode === 'dark' ? 'error.400' : 'error.600'),
        }),
      }}
    />
  );
});

export default Status;
