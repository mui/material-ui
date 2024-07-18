/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { CssVarsProvider, extendTheme, styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import LightMode from '@mui/icons-material/LightModeOutlined';
import DarkMode from '@mui/icons-material/DarkModeOutlined';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useClipboardCopy } from '@mui/docs/CodeCopy';
import TokensTable from 'docs/src/modules/material-ui/TokensTable';

const defaultTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: '.mode-%s',
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

export default function PaletteTokensViewer() {
  const { copy, isCopied } = useClipboardCopy();
  const light = traverseObject(defaultTheme.colorSchemes.light.palette);
  const dark = traverseObject(defaultTheme.colorSchemes.dark.palette);
  const paletteTokens = Array.from(new Set([...Object.keys(dark), ...Object.keys(light)]));
  const renderSwatch = (colorScheme, token) => (
    <Box
      component="span"
      className={`mode-${colorScheme}`}
      sx={{
        marginTop: '1px',
        display: 'inline-block',
        flexShrink: 0,
        position: 'relative',
        width: '1.5em',
        height: '1.5em',
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
    <CssVarsProvider theme={defaultTheme} colorSchemeNode={null}>
      <TokensTable isCopied={isCopied}>
        <thead>
          <tr>
            <th width="60%">Token</th>
            <th>
              <Typography
                variant="inherit"
                sx={{
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
                variant="inherit"
                sx={{
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
                    variant="inherit"
                    color="inherit"
                    underline="hover"
                    component="button"
                    onClick={() => copy(`--mui-palette-${token.replace('.', '-')}`)}
                    sx={{ width: '100%', cursor: 'copy' }}
                  >
                    --mui-palette-{token.replace('.', '-')}
                  </Link>
                </td>
                <td>
                  <Tooltip title={light[token]} placement="left">
                    <Link
                      variant="inherit"
                      color="inherit"
                      underline="hover"
                      component="button"
                      onClick={() => copy(light[token])}
                      sx={{
                        paddingLeft: '20px',
                        display: 'flex',
                        gap: 0.5,
                        cursor: 'copy',
                      }}
                    >
                      {light[token] && renderSwatch('light', token)}
                    </Link>
                  </Tooltip>
                </td>
                <td>
                  <Tooltip title={dark[token]} placement="right">
                    <Link
                      variant="inherit"
                      color="inherit"
                      underline="hover"
                      component="button"
                      onClick={() => copy(dark[token])}
                      sx={{
                        paddingLeft: '20px',
                        display: 'flex',
                        gap: 0.5,
                        cursor: 'copy',
                      }}
                    >
                      {dark[token] && renderSwatch('dark', token)}
                    </Link>
                  </Tooltip>
                </td>
              </tr>
            ))}
        </tbody>
      </TokensTable>
    </CssVarsProvider>
  );
}
