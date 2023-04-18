import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function CircularDeterminate() {
  const [progress, setProgress] = React.useState(0);
  const srOnlyStyle: React.CSSProperties = {
    position: 'absolute',
    width: '1px',
    height: '1px',
    padding: '0',
    margin: '-1px',
    overflow: 'hidden',
    clip: 'rect(0,0,0,0)',
    whiteSpace: 'nowrap',
    border: '0'
  };
  
  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 25));
    }, 2500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const progressDescription = `${progress}% progress`;

  return (
    <Stack spacing={2} direction="row">
      <CircularProgress variant="determinate" value={25} />
      <CircularProgress variant="determinate" value={50} />
      <CircularProgress variant="determinate" value={75} />
      <CircularProgress variant="determinate" value={100} />
      <div aria-describedby='progress-description' aria-live="polite" >
        <CircularProgress 
        variant="determinate" 
        value={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuetext={progressDescription}
        />
        <div id="progress-description" style={srOnlyStyle}>
          {progressDescription}
        </div>
      </div>

    </Stack>
  );
}
