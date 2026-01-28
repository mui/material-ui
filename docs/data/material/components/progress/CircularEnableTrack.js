import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularEnableTrack() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Stack spacing={2} direction="row">
      <CircularProgress enableTrackSlot size="30px" />
      <CircularProgress enableTrackSlot size={40} />
      <CircularProgress enableTrackSlot size="3rem" />
      <CircularProgress enableTrackSlot variant="determinate" value={70} />
      <CircularProgress
        enableTrackSlot
        variant="determinate"
        color="secondary"
        value={progress}
      />
    </Stack>
  );
}
