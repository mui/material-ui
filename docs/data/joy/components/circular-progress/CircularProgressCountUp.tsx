import * as React from 'react';
import Stack from '@mui/joy/Stack';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import CircularProgress from '@mui/joy/CircularProgress';
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
    <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={8}>
      <Stack spacing={2}>
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
      <Stack spacing={2}>
        <CircularProgress size="lg" determinate value={value2}>
          <Typography>{value2}%</Typography>
        </CircularProgress>
        <Button size="sm" variant="outlined" color="neutral" onClick={reset}>
          Reload
        </Button>
      </Stack>
    </Stack>
  );
}
