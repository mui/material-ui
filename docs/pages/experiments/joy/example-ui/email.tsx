import * as React from 'react';
import { GlobalStyles } from '@mui/system';
import { CssVarsProvider, Theme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';

export default function EmailExample() {
  return (
    <CssVarsProvider>
      <GlobalStyles<Theme>
        styles={(theme) => ({
          body: {
            margin: 0,
            fontFamily: theme.vars.fontFamily.body,
          },
        })}
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '0px 0px 1fr',
            sm: '64px minmax(200px, 1fr) minmax(500px, 1fr)',
            md: 'minmax(160px, 220px) minmax(200px, 351px) minmax(700px, 1fr)',
          },
          gridTemplateRows: '64px 1fr',
          minHeight: '100vh',
        }}
      >
        <Box
          className="Header"
          sx={{
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gridColumn: '1 / -1',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        >
          Header
        </Box>
        <Box
          className="Navigation"
          sx={{
            borderRight: '1px solid',
            borderColor: 'divider',
            p: 2,
          }}
        >
          Navigation
        </Box>
        <Box
          className="Inbox"
          sx={{
            borderRight: '1px solid',
            borderColor: 'divider',
            p: 2,
          }}
        >
          Inbox
        </Box>
        <Box component="main" className="Main" sx={{ p: 2, bgcolor: 'background.level1' }}>
          <Sheet variant="outlined" sx={{ minHeight: 500, borderRadius: 'sm' }} />
        </Box>
      </Box>
    </CssVarsProvider>
  );
}
