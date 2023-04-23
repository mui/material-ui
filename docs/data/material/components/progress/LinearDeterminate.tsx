import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { visuallyHidden } from 'packages/mui-utils/src';

export default function LinearDeterminate() {
  const [progress, setProgress] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (running) {
      timer = setInterval(() => {
        handleProgress();
      }, 2000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [running]);

  const handleProgress = () => {
    setProgress((oldProgress) => {
      if (oldProgress === 100) {
        setRunning(false);
        return 0;
      }
      const nextProgress = oldProgress + 25;
      return nextProgress;
    });
  };

  const handleButtonClick = () => {
    setRunning(!running);
  };

  return (
    <Stack sx={{ width: '100%', alignItems: 'center' }} spacing={2} direction="row">
      <Button variant="outlined" onClick={handleButtonClick}>{running ? 'Stop' : 'Start'}</Button>
        <Box sx={{ width: '100%' }}>
          <LinearProgress variant="determinate" value={progress} />
        </Box>
        {progress > 0 && <span style={visuallyHidden} aria-live="polite">{`${progress}% progress`}</span>}
    </Stack>
  );
}
