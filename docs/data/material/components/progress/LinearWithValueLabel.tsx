import * as React from 'react';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { visuallyHidden } from 'packages/mui-utils/src';

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function LinearWithValueLabel() {
  const [progress, setProgress] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  React.useEffect(() => {
    let timerId: NodeJS.Timeout | null = null;
    if (isRunning) {
      timerId = setInterval(() => {
        handleProgress();
      }, 1800);
    }
    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [isRunning]);

  const handleProgress = () => {
    setProgress((oldProgress) => {
      if (oldProgress === 100) {
        setIsRunning(false);
        return 0;
      }
      const nextProgress = oldProgress + 20;
      return nextProgress;
    });
  };

  const handleClick = () => {
    if (progress === 100) {
      setProgress(0);
    }
    setIsRunning(!isRunning);
  };

  return (
    <Stack sx={{ width: '100%', alignItems: 'center' }} spacing={2} direction="row">
      <Button variant="outlined" onClick={handleClick}>
        {isRunning && progress !== 100 ? 'Stop' : 'Start'}
      </Button>
      <Box sx={{ width: '100%' }}>
        <LinearProgressWithLabel value={progress} />
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
