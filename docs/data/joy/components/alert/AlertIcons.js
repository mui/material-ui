import * as React from 'react';
import Alert from '@mui/joy/Alert';
import PlaylistAddCheckCircleRoundedIcon from '@mui/icons-material/PlaylistAddCheckCircleRounded';

export default function AlertIcons() {
  return (
    <Alert icon={<PlaylistAddCheckCircleRoundedIcon />}>
      This is a Joy UI Alert with an icon - check it out!
    </Alert>
  );
}
