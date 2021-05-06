import * as React from 'react';
import Box, { BoxProps } from '@material-ui/core/Box';

interface ImageProps {
  src: string | undefined;
  sx?: BoxProps['sx'];
}
export default function Image(props: ImageProps) {
  const { src, sx } = props;
  return (
    <Box sx={{ ...sx }}>
      <img alt="" src={src} loading="lazy" />
    </Box>
  );
}
