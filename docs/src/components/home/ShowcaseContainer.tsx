import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import NoSsr from '@mui/material/NoSsr';
import Frame from 'docs/src/components/action/Frame';

export function ShowcaseCodeWrapper({
  hasDesignToggle,
  children,
  maxHeight,
  sx,
}: {
  hasDesignToggle?: boolean;
  children: React.ReactNode;
  maxHeight: number;
  sx?: BoxProps['sx'];
}) {
  return (
    <Box
      sx={{
        p: 2,
        pt: hasDesignToggle ? 7 : 2,
        maxHeight: { xs: 'auto', sm: maxHeight },
        position: 'relative',
        display: 'flex',
        overflow: 'auto',
        flexGrow: 1,
        '&::-webkit-scrollbar': {
          display: 'none',
        },
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

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
        {code ? (
          <Frame.Info data-mui-color-scheme="dark" sx={{ p: 0 }}>
            <NoSsr>{code}</NoSsr>
          </Frame.Info>
        ) : null}
      </Box>
    </Fade>
  );
}
