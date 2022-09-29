import Box from '@mui/joy/Box';
import LinearProgress from '@mui/joy/LinearProgress';
import * as React from 'react';

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
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <LinearProgress determinate value={25} />
      <LinearProgress determinate value={50} />
      <LinearProgress determinate value={75} />
      <LinearProgress determinate value={100} />
      <LinearProgress determinate value={progress} />
    </Box>
  );
}
