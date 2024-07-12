/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { CssVarsProvider, extendTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useClipboardCopy } from '@mui/docs/CodeCopy';

const defaultTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'data-mui-color-scheme',
});

const Table = styled('table')(({ theme }) => ({
  borderCollapse: 'separate',
  borderSpacing: 0,
  display: 'block',
  overflowY: 'scroll',
  th: {
    textAlign: 'left',
    padding: 8,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: theme.vars.palette.background.default,
  },
  td: {
    verticalAlign: 'top',
    padding: '3px 6px',
  },
  tr: {
    '&:hover': {
      backgroundColor: `rgba(${theme.vars.palette.text.primaryChannel} / 0.04)`,
    },
    '&:first-of-type': {
      '& td': { paddingTop: 6 },
    },
  },
}));

export default function ZIndexTokensViewer() {
  const { copy, isCopied } = useClipboardCopy();
  return (
    <CssVarsProvider theme={defaultTheme} disableStyleSheetGeneration>
      <Box
        sx={{
          marginBottom: '-9px',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid',
          borderColor: 'divider',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
        }}
      >
        <Paper
          variant="outlined"
          sx={[
            {
              position: 'absolute',
              left: '50%',
              bottom: 0,
              transition: '0.3s',
              p: 0.5,
              pl: 0.5,
              pr: 1,
              zIndex: 1,
            },
            isCopied
              ? { transform: `translateX(-50%) translateY(-0.5rem)` }
              : { transform: `translateX(-50%) translateY(calc(100% + 0.5rem))` },
          ]}
        >
          <Typography
            color="info"
            sx={{ fontSize: '0.875rem', display: 'flex', alignItems: 'center', gap: 0.5 }}
          >
            <CheckCircleRoundedIcon fontSize="inherit" />
            Copied
          </Typography>
        </Paper>
        <Table>
          <thead>
            <tr>
              <th style={{ width: 212 }}>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>CSS variable</Typography>
              </th>
              <th>
                <Typography
                  sx={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  Value
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.values(defaultTheme.vars.zIndex).map((reference) => {
              const [, token, value] = reference.match(/^var\(([^,]+),\s*(.*)\)$/);
              return (
                <tr key={token}>
                  <td>
                    <Link
                      color="inherit"
                      underline="hover"
                      component="button"
                      onClick={() => copy(token)}
                      sx={{
                        fontSize: '0.875rem',
                        textAlign: 'left',
                        cursor: 'copy',
                      }}
                    >
                      {token}
                    </Link>
                  </td>
                  <td>
                    <Link
                      underline="hover"
                      component="button"
                      onClick={() => copy(value)}
                      sx={{
                        fontSize: '0.875rem',
                        color: 'text.secondary',
                        fontWeight: 600,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        textAlign: 'left',
                        cursor: 'copy',
                      }}
                    >
                      {value}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Box>
    </CssVarsProvider>
  );
}
