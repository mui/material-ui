import Box from '@mui/joy/Box';
import CircularProgress from '@mui/joy/CircularProgress';
import * as React from 'react';

export default function CircularProgressDeterminate() {
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
      <CircularProgress determinate value={25} />
      <CircularProgress determinate value={50} />
      <CircularProgress determinate value={75} />
      <CircularProgress determinate value={100} />
      <CircularProgress determinate value={progress} />
    </Box>
  );
}
