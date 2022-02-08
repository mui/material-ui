import * as React from 'react';
import Box from '@mui/material/Box';

interface ProgressBarProps {
  value: number;
}

const ProgressBar = React.memo(function ProgressBar(props: ProgressBarProps) {
  const { value } = props;
  const valueInPercent = value * 100;

  return (
    <Box
      sx={{
        lineHeight: 1,
        position: 'relative',
        p: 0.5,
        borderRadius: '3px',
        width: '100%',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100'),
      }}
    >
      <Box
        sx={{ fontWeight: 'bold', color: 'text.primary', position: 'relative', zIndex: 1 }}
      >{`${valueInPercent.toLocaleString()} %`}</Box>
      <Box
        sx={{
          borderRadius: '3px',
          position: 'absolute',
          height: '100%',
          left: 0,
          top: 0,
          ...(valueInPercent < 30 && {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'error.700' : 'error.200'),
          }),
          ...(valueInPercent >= 30 &&
            valueInPercent <= 70 && {
              bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'warning.900' : 'warning.400'),
            }),
          ...(valueInPercent > 70 && {
            bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'success.800' : 'success.300'),
          }),
          width: `${valueInPercent}%`,
        }}
      />
    </Box>
  );
});

export default ProgressBar;
