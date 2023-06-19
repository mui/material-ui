import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';

const FrameDemo = React.forwardRef<HTMLDivElement, BoxProps>(function FrameDemo(props, ref) {
  return (
    <Box
      ref={ref}
      {...props}
      sx={[
        (theme) => ({
          position: 'relative',
          border: '1px solid',
          bgcolor: 'grey.100',
          borderColor: 'grey.200',
          ...theme.applyDarkStyles({
            bgcolor: 'primaryDark.700',
            borderColor: 'primaryDark.600',
          }),
        }),
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
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

function Frame(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        '& > div:first-of-type': {
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
        },
        '& > div:last-of-type': {
          borderBottomLeftRadius: '12px',
          borderBottomRightRadius: '12px',
        },
        ...props.sx,
      }}
    />
  );
}

Frame.Demo = FrameDemo;
Frame.Info = FrameInfo;

export default Frame;
