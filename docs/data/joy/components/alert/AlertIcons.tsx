import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import * as React from 'react';
import Alert from '@mui/joy/Alert';

export default function AlertIcons() {
  return (
    <Alert icon={<CheckCircleOutlineIcon />}>
      This is a Joy Alert with an icon - check it out!
    </Alert>
  );
}
