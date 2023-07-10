import * as React from 'react';
import Stack from '@mui/joy/Stack';
import LinearProgress from '@mui/joy/LinearProgress';

export default function LinearProgressDeterminate() {
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
    <Stack spacing={2} sx={{ flex: 1 }}>
      <LinearProgress determinate value={25} />
      <LinearProgress determinate value={50} />
      <LinearProgress determinate value={75} />
      <LinearProgress determinate value={100} />
      <LinearProgress determinate value={progress} />
    </Stack>
  );
}
