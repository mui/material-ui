import * as React from 'react';
import CircularProgress, {
  CircularProgressProps,
} from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { visuallyHidden } from 'packages/mui-utils/src';

function CircularProgressWithLabel(
  props: CircularProgressProps & { value: number },
) {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress variant="determinate" {...props} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant="caption"
          component="div"
          color="text.secondary"
        >
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function CircularStatic() {
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
    <>
    <Stack spacing={2} direction="row">
      <CircularProgressWithLabel value={progress} />
      <Button onClick={handleClick} variant="outlined" disabled={isRunning && progress !== 100}>
        {isRunning && progress !== 100 ? 'Stop' : 'Start'}
      </Button>
      {progress > 0 && <span style={visuallyHidden} aria-live="polite">{`${progress}% progress`}</span>}
    </Stack>
      
    </>
  );
}
