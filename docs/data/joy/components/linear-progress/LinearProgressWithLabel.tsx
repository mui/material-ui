import * as React from 'react';
import Box from '@mui/joy/Box';
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
    <Box sx={{ width: '50%' }}>
      <Typography textAlign="center" level="body3" fontWeight="xl" mb={1}>
        LOADING… {`${Math.round(progress)}%`}
      </Typography>
      <LinearProgress
        determinate
        variant="plain"
        color="neutral"
        size="sm"
        value={progress}
        sx={{
          '--LinearProgress-progress-thickness': '2px',
          bgcolor: 'background.surface',
        }}
      />
    </Box>
  );
}
