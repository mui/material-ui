import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { visuallyHidden } from 'packages/mui-utils/src';

export default function LinearBuffer() {
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
    const handleProgress = () => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          setRunning(false);
          return 0;
        }
        const diff2 = Math.random() * 10;
        setBuffer(progress + 20 + diff2);
        const nextProgress = oldProgress + 20;
        return nextProgress;
      });
    };
    let timer: NodeJS.Timeout | undefined;
    if (running) {
      timer = setInterval(() => {
        handleProgress();
      }, 1800);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [running, progress]);

  const handleButtonClick = () => {
    setRunning(!running);
  };

  return (
    <Stack sx={{ width: '100%', alignItems: 'center' }} spacing={2} direction="row">
      <Button variant="outlined" onClick={handleButtonClick}>
        {running ? 'Stop' : 'Start'}
      </Button>
      <Box sx={{ width: '100%' }}>
        <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
      </Box>
      {progress > 0 && (
        <span
          style={visuallyHidden}
          aria-live="polite"
        >{`${progress}% progress`}</span>
      )}
    </Stack>
  );
}
