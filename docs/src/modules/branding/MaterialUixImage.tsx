import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';

interface MaterialUixImageProps {
  height?: number;
  src: string;
  sx?: BoxProps['sx'];
  width?: number;
}

export default function MaterialUixImage(props: MaterialUixImageProps) {
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
