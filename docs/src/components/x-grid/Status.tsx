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
      sx={(theme) => ({
        lineHeight: 1,
        fontSize: '10px',
        fontWeight: 'bold',
        ...(status === 'Open' && {
          borderColor: 'primary.500',
          bgcolor: alpha(theme.palette.primary[500], 0.1),
          color: 'primary.600',
        }),
        ...(status === 'Filled' && {
          borderColor: 'success.500',
          bgcolor: alpha(theme.palette.success[500], 0.1),
          color: 'success.800',
        }),
        ...(status === 'PartiallyFilled' && {
          borderColor: 'warning.600',
          bgcolor: alpha(theme.palette.warning[500], 0.1),
          color: 'warning.900',
        }),
        ...(status === 'Rejected' && {
          borderColor: 'error.500',
          bgcolor: alpha(theme.palette.error[500], 0.1),
          color: 'error.600',
        }),
        ...theme.applyDarkStyles({
          ...(status === 'Open' && {
            color: 'primary.300',
          }),
          ...(status === 'Filled' && {
            color: 'success.500',
          }),
          ...(status === 'PartiallyFilled' && {
            color: 'warning.300',
          }),
          ...(status === 'Rejected' && {
            color: 'error.400',
          }),
        }),
      })}
    />
  );
});

export default Status;
