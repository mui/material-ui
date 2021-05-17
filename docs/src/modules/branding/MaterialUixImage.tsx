import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';

interface ImageProps {
  src: string | undefined;
  sx?: BoxProps['sx'];
  onClick?: any;
}
export default function Image(props: ImageProps) {
  const { src, sx, onClick } = props;
  return (
    <Box sx={{ ...sx }} onClick={onClick}>
      <img alt={src} src={src} loading="lazy" />
    </Box>
  );
}
