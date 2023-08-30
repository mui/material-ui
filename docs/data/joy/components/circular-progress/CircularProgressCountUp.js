import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import * as React from 'react';
import { useCountUp } from 'use-count-up';

export default function CircularProgressDeterminate() {
  const [isLoading, setIsLoading] = React.useState(false);

  const { value: value1 } = useCountUp({
    isCounting: isLoading,
    duration: 1,
    start: 0,
    end: 25,
  });

  const { value: value2, reset } = useCountUp({
    isCounting: true,
    duration: 1,
    start: 0,
    end: 75,
  });

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
      <Stack sx={{ gap: 2 }}>
        <CircularProgress size="lg" determinate value={value1}>
          <Typography>{value1}%</Typography>
        </CircularProgress>
        <Button size="sm" onClick={() => setIsLoading(true)}>
          Start
        </Button>
      </Stack>
      <Stack sx={{ gap: 2 }}>
        <CircularProgress size="lg" determinate value={value2}>
          <Typography>{value2}%</Typography>
        </CircularProgress>
        <Button size="sm" onClick={reset}>
          Reset
        </Button>
      </Stack>
    </Box>
  );
}
