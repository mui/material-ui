import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

const FrameDemo = React.forwardRef<HTMLDivElement, BoxProps>(function FrameDemo(props, ref) {
  return (
    <Box
      ref={ref}
      {...props}
      sx={{
        position: 'relative',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100'),
        border: '1px solid',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.600' : 'grey.200'),
        ...props.sx,
      }}
    />
  );
});

const FrameInfo = React.forwardRef<HTMLDivElement, BoxProps>(function FrameInfo(props, ref) {
  return (
    <Box
      ref={ref}
      {...props}
      sx={{
        color: '#fff',
        p: 2,
        bgcolor: 'primaryDark.800',
        border: '1px solid',
        borderColor: 'primaryDark.700',
        colorScheme: 'dark',
        ...props.sx,
      }}
    />
  );
});

const Frame = (props: BoxProps) => {
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& > div:first-of-type': {
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px',
        },
        '& > div:last-of-type': {
          borderBottomLeftRadius: '10px',
          borderBottomRightRadius: '10px',
        },
        ...props.sx,
      }}
    />
  );
};

Frame.Demo = FrameDemo;
Frame.Info = FrameInfo;

export default Frame;
