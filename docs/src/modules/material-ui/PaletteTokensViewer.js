/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { CssVarsProvider, extendTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import LightMode from '@mui/icons-material/LightModeOutlined';
import DarkMode from '@mui/icons-material/DarkModeOutlined';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { useClipboardCopy } from '@mui/docs/CodeCopy';

const defaultTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'data-mui-color-scheme',
});

const traverseObject = (palette) => {
  const result = {};
  const traverse = (object, parts = []) => {
    if (object && typeof object === 'object') {
      for (const key of Object.keys(object)) {
        traverse(object[key], [...parts, key]);
      }
    } else if (typeof object !== 'function') {
      result[parts.join('.')] = object;
    }
  };
  traverse(palette);
  return result;
};

const Table = styled('table')(({ theme }) => ({
  borderCollapse: 'separate',
  borderSpacing: 0,
  display: 'block',
  height: 500,
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

export default function PaletteTokensViewer() {
  const { copy, isCopied } = useClipboardCopy();
  const light = traverseObject(defaultTheme.colorSchemes.light.palette);
  const dark = traverseObject(defaultTheme.colorSchemes.dark.palette);
  const paletteTokens = Array.from(new Set([...Object.keys(dark), ...Object.keys(light)]));
  const renderSwatch = (colorScheme, token) => (
    <Box
      component="span"
      data-mui-color-scheme={colorScheme}
      sx={{
        display: 'inline-block',
        flexShrink: 0,
        position: 'relative',
        width: '1em',
        height: '1em',
        fontSize: 'var(--Icon-fontSize)',
        borderRadius: '2px',
        backgroundImage: `linear-gradient(90deg, var(--joy-palette-text-tertiary) 50%, transparent 50%), linear-gradient(90deg, transparent 50%, var(--joy-palette-text-tertiary) 50%)`,
        backgroundRepeat: 'repeat-x',
        backgroundSize: '100% 50%, 100% 50%',
        backgroundPosition: '0 0, 0 100%',
        '&::after': {
          content: '""',
          position: 'absolute',
          display: 'block',
          inset: 0,
          bgcolor: token,
          borderRadius: 'inherit',
          boxShadow: 'inset 0 0 0 1px #bababa',
        },
      }}
    />
  );
  return (
    <CssVarsProvider theme={defaultTheme}>
      <Box
        sx={{
          marginBottom: '-9px',
          width: '100%',
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '4px',
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
              <th>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 600 }}>Token</Typography>
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
                  <LightMode fontSize="inherit" /> Light
                </Typography>
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
                  <DarkMode fontSize="inherit" /> Dark
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {paletteTokens
              .filter(
                (token) =>
                  token !== 'mode' && token !== 'contrastThreshold' && token !== 'tonalOffset',
              )
              .map((token) => (
                <tr key={token}>
                  <td>
                    <Link
                      color="inherit"
                      underline="hover"
                      component="button"
                      onClick={() => copy(`--mui-palette-${token.replace('.', '-')}`)}
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
                      onClick={() => copy(light[token])}
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
                      {light[token] && renderSwatch('light', token)}
                      {light[token] || '-'}
                    </Link>
                  </td>
                  <td>
                    <Link
                      underline="hover"
                      component="button"
                      onClick={() => copy(dark[token])}
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
                      {dark[token] && renderSwatch('dark', token)}
                      {dark[token]}
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Box>
    </CssVarsProvider>
  );
}
