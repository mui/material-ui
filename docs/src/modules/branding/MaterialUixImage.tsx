import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';

interface ImageProps {
  src: string;
  sx?: BoxProps['sx'];
  width?: number;
  height?: number;
}
export default function Image(props: ImageProps) {
  const { src, width, height, ...other } = props;
  return (
    <Box
      {...other}
      sx={{
        ...other.sx,
      }}
    >
      <img alt="" src={src} width={width} height={height} loading="lazy" />
    </Box>
  );
}
