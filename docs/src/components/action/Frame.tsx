import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';

const Demo = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
  return (
    <Box
      ref={ref}
      {...props}
      sx={{
        position: 'relative',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100'),
        border: '1px solid',
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.200'),
        ...props.sx,
      }}
    />
  );
});

const Info = React.forwardRef<HTMLDivElement, BoxProps>((props, ref) => {
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

Frame.Demo = Demo;
Frame.Info = Info;

export default Frame;
