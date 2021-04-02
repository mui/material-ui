import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';

interface ImageProps {
  src: string;
  sx?: BoxProps['sx'];
}
export default function Image(props: ImageProps) {
  const { src, ...other } = props;
  return (
    <Box
      {...other}
      sx={{
        ...other.sx,
      }}
    >
      <img alt="" src={src} loading="lazy" />
    </Box>
  );
}
