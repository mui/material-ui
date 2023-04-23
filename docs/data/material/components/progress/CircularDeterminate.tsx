import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { visuallyHidden } from 'packages/mui-utils/src';
import Button from '@mui/material/Button';

export default function CircularDeterminate() {
  const [progress, setProgress] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (running) {
      timer = setInterval(() => {
        setProgress((oldProgress) => {
          const nextProgress = oldProgress + 25;
          if (nextProgress >= 100) {
            setRunning(false);
            return 100;
          } else {
            return nextProgress;
          }
        });
      }, 2000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [running]);

  const handleStart = () => {
    setRunning(true);
    setProgress(0);
  };

  const handleStop = () => {
    setRunning(false);
    setProgress(0);
  };

  return (
    <Stack spacing={2} direction="row">
      <CircularProgress variant="determinate" value={25} />
      <CircularProgress variant="determinate" value={50} />
      <CircularProgress variant="determinate" value={75} />
      <CircularProgress variant="determinate" value={100} />
        <CircularProgress
          variant="determinate"
          value={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      {progress > 0 && <span style={visuallyHidden} aria-live="polite">{`${progress}% progress`}</span>}

      <Stack spacing={2} direction="row">
        {!running && (
          <Button onClick={handleStart} variant="outlined">
            Start
          </Button>
        )}
        {running && (
          <Button onClick={handleStop} variant="outlined">
            Stop
          </Button>
        )}
      </Stack>
    </Stack>
  );
}