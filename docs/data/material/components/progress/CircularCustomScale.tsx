import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularCustomScale() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 20 ? 0 : prevProgress + 2));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <CircularProgress
      variant="determinate"
      min={0}
      max={20}
      value={progress}
      aria-label="Loading"
    />
  );
}
