import * as React from 'react';
import { BoxProps } from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import NoSsr from '@mui/material/NoSsr';
import { PaperProps } from '@mui/material/Paper';
import Frame from 'docs/src/components/action/Frame';

export default function ShowcaseContainer({
  preview,
  previewSx,
  code,
  codeSx,
  sx,
}: {
  preview?: React.ReactNode;
  previewSx?: PaperProps['sx'];
  code?: React.ReactNode;
  codeSx?: BoxProps['sx'];
  sx?: BoxProps['sx'];
}) {
  return (
    <Frame
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
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
    </Frame>
  );
}
