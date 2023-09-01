import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import { useCountUp } from 'use-count-up';

export default function CircularProgressCountUp() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonLabel, setButtonLabel] = React.useState('Start'); // Track button label

  const { value: value1, reset: resetValue1 } = useCountUp({
    isCounting: isLoading,
    duration: 1,
    start: 0,
    end: 25,
    onEnd: () => {
      setIsLoading(false);
      setButtonLabel('Reset'); // Change the button label when loading is complete
    },
  });

  const { value: value2, reset } = useCountUp({
    isCounting: true,
    duration: 1,
    start: 0,
    end: 75,
  });

  const handleButtonClick = () => {
    if (isLoading) {
      setIsLoading(false);
      setButtonLabel('Start');
      resetValue1(); // Reset the value
    } else {
      setIsLoading(true);
      setButtonLabel('Reset');
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
      <Stack sx={{ gap: 2 }}>
        <CircularProgress size="lg" determinate value={value1}>
          <Typography>{value1}%</Typography>
        </CircularProgress>
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={handleButtonClick} // Use a single click handler
        >
          {buttonLabel}
        </Button>
      </Stack>
      <Stack sx={{ gap: 2 }}>
        <CircularProgress size="lg" determinate value={value2}>
          <Typography>{value2}%</Typography>
        </CircularProgress>
        <Button size="sm" variant="outlined" color="neutral" onClick={reset}>
          Reload
        </Button>
      </Stack>
    </Box>
  );
}
