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
      sx={(theme) => ({
        lineHeight: 1,
        position: 'relative',
        p: 0.5,
        borderRadius: '3px',
        width: '100%',
        bgcolor: 'grey.100',
        ...theme.applyDarkStyles({
          bgcolor: 'primaryDark.700',
        }),
      })}
    >
      <Box
        sx={{ fontWeight: 'bold', color: 'text.primary', position: 'relative', zIndex: 1 }}
      >{`${valueInPercent.toLocaleString()} %`}</Box>
      <Box
        sx={(theme) => ({
          borderRadius: '3px',
          position: 'absolute',
          height: '100%',
          left: 0,
          top: 0,
          ...(valueInPercent < 30 && {
            bgcolor: 'error.200',
          }),
          ...(valueInPercent >= 30 &&
            valueInPercent <= 70 && {
              bgcolor: 'warning.400',
            }),
          ...(valueInPercent > 70 && {
            bgcolor: 'success.300',
          }),
          width: `${valueInPercent}%`,
          ...theme.applyDarkStyles({
            ...(valueInPercent < 30 && {
              bgcolor: 'error.700',
            }),
            ...(valueInPercent >= 30 &&
              valueInPercent <= 70 && {
                bgcolor: 'warning.900',
              }),
            ...(valueInPercent > 70 && {
              bgcolor: 'success.800',
            }),
          }),
        })}
      />
    </Box>
  );
});

export default ProgressBar;
