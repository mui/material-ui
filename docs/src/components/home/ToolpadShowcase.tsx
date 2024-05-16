import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ShowcaseContainer from 'docs/src/components/home/ShowcaseContainer';

export default function DataTable() {
  return (
    <ShowcaseContainer
      preview={
        <Paper
          variant="outlined"
          sx={(theme) => ({
            width: '100%',
            overflow: 'clip',
            boxShadow: `0 4px 8px ${alpha(theme.palette.primaryDark[300], 0.3)}`,
            bgcolor: '#fff',
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: '6px',
            ...theme.applyDarkStyles({
              bgcolor: 'primaryDark.800',
              boxShadow: `0 4px 8px ${alpha(theme.palette.common.black, 0.3)}`,
            }),
          })}
        >
          <Box sx={{ height: 600 }}>
            <Box
              component="img"
              src="/static/branding/toolpad/hero.gif"
              alt="Toolpad user management app"
              loading="lazy"
              height={620}
              sx={{ width: { xs: 'auto', sm: '100%' } }}
            />
          </Box>
        </Paper>
      }
    />
  );
}
