import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import NoSsr from '@mui/material/NoSsr';
import Frame from 'docs/src/components/action/Frame';

export default function ShowcaseContainer({
  preview,
  code,
  sx,
}: {
  preview?: React.ReactNode;
  code?: React.ReactNode;
  sx?: BoxProps['sx'];
}) {
  return (
    <Fade in timeout={700}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          '& > div:first-of-type': {
            borderTopLeftRadius: '12px',
            borderTopRightRadius: '12px',
          },
          '& > div:last-of-type': {
            borderBottomLeftRadius: '12px',
            borderBottomRightRadius: '12px',
          },
          ...sx,
        }}
      >
        <Frame.Demo
          sx={{
            display: 'flex',
            position: 'relative',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 220,
            p: 2,
          }}
        >
          {preview}
        </Frame.Demo>
        <Frame.Info data-mui-color-scheme="dark" sx={{ p: 2, borderTop: 0 }}>
          <NoSsr>{code}</NoSsr>
        </Frame.Info>
      </Box>
    </Fade>
  );
}
