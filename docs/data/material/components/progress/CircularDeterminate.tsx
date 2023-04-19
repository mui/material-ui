import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { visuallyHidden } from 'packages/mui-utils/src';
import Button from '@mui/material/Button';

export default function CircularDeterminate() {
  const [progress, setProgress] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning) {
      timer = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = prevProgress + 25;
          if (nextProgress >= 100) {
            setIsRunning(false);
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
  }, [isRunning]);

  const progressDescription = `${progress}% progress`;

  const handleStart = () => {
    setIsRunning(true);
    setProgress(0);
  };

  const handleStop = () => {
    setIsRunning(false);
    setProgress(0);
  };

  return (
    <Stack spacing={2} direction="row">
      <CircularProgress variant="determinate" value={25} />
      <CircularProgress variant="determinate" value={50} />
      <CircularProgress variant="determinate" value={75} />
      <CircularProgress variant="determinate" value={100} />
      <div aria-describedby="progress-description" aria-live="polite">
        <CircularProgress
          variant="determinate"
          value={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
        <div id="progress-description" style={visuallyHidden}>
          {progressDescription}
        </div>
      </div>
      <Stack spacing={2} direction="row">
        {!isRunning && (
          <Button onClick={handleStart} variant="outlined">
            Start
          </Button>
        )}
        {isRunning && (
          <Button onClick={handleStop} variant="outlined">
            Stop
          </Button>
        )}
      </Stack>
    </Stack>
  );
}