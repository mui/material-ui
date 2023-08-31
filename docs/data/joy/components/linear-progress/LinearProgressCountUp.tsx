import * as React from 'react';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';
import { useCountUp } from "use-count-up";

export default function LinearProgressCountUp() {
  const { value } = useCountUp({
    isCounting: true,
    duration: 5,
    easing: "linear",
    start: 0,
    end: 75
  });

  return (
    <LinearProgress
      determinate
      variant="outlined"
      color="neutral"
      size="sm"
      thickness={24}
      value={value}
      sx={{
        '--LinearProgress-radius': '20px',
        '--LinearProgress-progressThickness': '24px',
        boxShadow: 'sm',
        borderColor: 'neutral.500',
      }}
    >
      <Typography
        level="body-xs"
        fontWeight="xl"
        textColor="common.white"
        sx={{ mixBlendMode: 'difference' }}
      >
        LOADING… {`${Math.round(value)}%`}
      </Typography>
    </LinearProgress>
  );
}
