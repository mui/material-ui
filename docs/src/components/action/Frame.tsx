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
          background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
          borderColor: 'grey.100',
          ...theme.applyDarkStyles({
            background: `${(theme.vars || theme).palette.gradients.linearSubtle}`,
            borderColor: 'primaryDark.700',
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
        bgcolor: 'common.black',
        border: '1px solid',
        borderColor: 'primaryDark.700',
        colorScheme: 'dark',
        '* pre, code': {
          bgcolor: 'common.black',
        },
        ...props.sx,
      }}
    />
  );
});

function Frame({ sx, ...props }: BoxProps) {
  return (
    <Box
      {...props}
      sx={[
        {
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
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}

Frame.Demo = FrameDemo;
Frame.Info = FrameInfo;

export default Frame;
