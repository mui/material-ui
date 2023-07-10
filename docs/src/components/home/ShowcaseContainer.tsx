import * as React from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import NoSsr from '@mui/material/NoSsr';
import Paper, { PaperProps } from '@mui/material/Paper';

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
    <Fade in timeout={700}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          ...sx,
        }}
      >
        <Paper
          variant="outlined"
          sx={[
            {
              display: 'flex',
              position: 'relative',
              minHeight: 220,
              justifyContent: 'center',
              alignItems: 'center',
              p: 2,
              bgcolor: 'grey.100',
              borderColor: 'grey.300',
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            },
            (theme) =>
              theme.applyDarkStyles({
                bgcolor: 'primaryDark.700',
                borderColor: 'primaryDark.600',
              }),
            ...(Array.isArray(previewSx) ? previewSx : [previewSx]),
          ]}
        >
          {preview}
        </Paper>
        <Box
          sx={[
            {
              flexGrow: 0,
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '100%',
              position: 'relative',
              minHeight: 200,
              borderWidth: '0 1px 1px 1px',
              borderStyle: 'solid',
              borderColor: 'primaryDark.900',
              bgcolor: 'primaryDark.800',
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            },
            (theme) =>
              theme.applyDarkStyles({
                borderColor: 'primaryDark.700',
              }),
            ...(Array.isArray(codeSx) ? codeSx : [codeSx]),
          ]}
        >
          <NoSsr>{code}</NoSsr>
        </Box>
      </Box>
    </Fade>
  );
}
