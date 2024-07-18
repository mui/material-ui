/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { CssVarsProvider, extendTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useClipboardCopy } from '@mui/docs/CodeCopy';
import TokensTable from 'docs/src/modules/material-ui/TokensTable';

const defaultTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: '.mode-%s',
});

const Table = styled('table')(({ theme }) => ({
  borderCollapse: 'separate',
  borderSpacing: 0,
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
    <CssVarsProvider theme={defaultTheme} colorSchemeNode={null} disableStyleSheetGeneration>
      <TokensTable isCopied={isCopied}>
        <thead>
          <tr>
            <th style={{ width: '50%' }}>CSS variable</th>
            <th>Value</th>
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
                    level="inherit"
                    underline="hover"
                    component="button"
                    onClick={() => copy(token)}
                    sx={{ width: '100%', cursor: 'copy' }}
                  >
                    {token}
                  </Link>
                </td>
                <td>
                  <Link
                    color="inherit"
                    level="inherit"
                    underline="hover"
                    component="button"
                    onClick={() => copy(value)}
                    sx={{ width: '100%', cursor: 'copy' }}
                  >
                    {value}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </TokensTable>
    </CssVarsProvider>
  );
}
