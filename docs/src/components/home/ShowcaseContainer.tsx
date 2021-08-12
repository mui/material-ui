import * as React from 'react';
import Box from '@material-ui/core/Box';
import NoSsr from '@material-ui/core/NoSsr';
import Paper, { PaperProps } from '@material-ui/core/Paper';

export default function ShowcaseContainer({
  preview,
  previewSx,
  code,
}: {
  preview?: React.ReactNode;
  previewSx?: PaperProps['sx'];
  code?: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minWidth: { lg: 600 },
      }}
    >
      <Paper
        variant="outlined"
        sx={{
          display: 'flex',
          position: 'relative',
          minHeight: 220,
          justifyContent: 'center',
          alignItems: 'center',
          px: 2,
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.100'),
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.400' : 'grey.300'),
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          ...previewSx,
        }}
      >
        {preview}
      </Paper>
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '100%',
          position: 'relative',
          minHeight: 200,
          maxHeight: 516,
          borderWidth: '0 1px 1px 1px',
          borderStyle: 'solid',
          borderColor: (theme) =>
            theme.palette.mode === 'dark' ? 'primaryDark.700' : 'primaryDark.900',
          bgcolor: 'primaryDark.800',
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <NoSsr>{code}</NoSsr>
      </Box>
    </Box>
  );
}
