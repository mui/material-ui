import * as React from 'react';
import LinearProgress from '@mui/joy/LinearProgress';
import Typography from '@mui/joy/Typography';

export default function LinearProgressWithLabel() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <LinearProgress
      determinate
      variant="outlined"
      color="neutral"
      size="sm"
      thickness={32}
      value={progress}
      sx={{
        '--LinearProgress-radius': '0px',
        '--LinearProgress-progressThickness': '24px',
        boxShadow: 'sm',
        borderColor: 'neutral.500',
      }}
    >
      <Typography
        level="body3"
        fontWeight="xl"
        textColor="common.white"
        sx={{ mixBlendMode: 'difference' }}
      >
        LOADING… {`${Math.round(progress)}%`}
      </Typography>
    </LinearProgress>
  );
}
