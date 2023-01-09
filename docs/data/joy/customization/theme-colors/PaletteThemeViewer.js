import * as React from 'react';
import { extendTheme, styled } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Tooltip from '@mui/joy/Tooltip';
import Typography from '@mui/joy/Typography';
import LightMode from '@mui/icons-material/LightModeOutlined';
import DarkMode from '@mui/icons-material/DarkModeOutlined';
import InfoOutlined from '@mui/icons-material/InfoOutlined';

const defaultTheme = extendTheme();

const traverseObject = (palette) => {
  const result = {};
  const traverse = (object, parts = []) => {
    if (object && typeof object === 'object') {
      // eslint-disable-next-line no-restricted-syntax
      for (const key of Object.keys(object)) {
        traverse(object[key], [...parts, key]);
      }
    } else {
      result[parts.join('.')] = object;
    }
  };
  traverse(palette);
  return result;
};

// https://stackoverflow.com/a/38641281/559913
const collator = new Intl.Collator(undefined, {
  numeric: true,
  sensitivity: 'base',
});

const Table = styled('table')(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.vars.palette.divider,
  borderRadius: theme.vars.radius.xs,
  borderCollapse: 'separate',
  borderSpacing: 0,
  display: 'block',
  height: 500,
  overflowY: 'scroll',
  th: {
    textAlign: 'left',
    padding: '8px 6px',
    position: 'sticky',
    top: 0,
    zIndex: 1,
    ...theme.variants.soft.neutral,
  },
  td: {
    verticalAlign: 'top',
    padding: '3px 6px',
  },
  tr: {
    '&:hover': {
      backgroundColor: theme.vars.palette.background.level1,
    },
    '&:first-of-type': {
      '& td': { paddingTop: 6 },
    },
  },
}));

export default function PaletteThemeViewer() {
  const light = traverseObject(defaultTheme.colorSchemes.light.palette);
  const dark = traverseObject(defaultTheme.colorSchemes.dark.palette);
  const paletteTokens = Array.from(
    new Set([...Object.keys(dark), ...Object.keys(light)]),
  ).sort(collator.compare);
  const renderSwatch = (colorScheme, token) => (
    <Box
      component="span"
      data-joy-color-scheme={colorScheme}
      sx={{
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
    <Box sx={{ width: '100%', overflow: 'auto' }}>
      <Table>
        <thead>
          <tr>
            <th>
              <Typography fontSize="sm" textColor="inherit">
                Token
              </Typography>
            </th>
            <th>
              <Typography
                fontSize="sm"
                startDecorator={<LightMode />}
                textColor="inherit"
              >
                Light
              </Typography>
            </th>
            <th>
              <Typography
                fontSize="sm"
                startDecorator={<DarkMode />}
                textColor="inherit"
              >
                Dark
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {paletteTokens
            .filter((token) => token !== 'mode')
            .map((token) => (
              <tr key={token}>
                <td>
                  <Typography
                    fontSize="sm"
                    endDecorator={
                      light[token].match(/^[0-9]+\s[0-9]+\s[0-9]+$/) ? (
                        <Tooltip
                          size="sm"
                          arrow
                          title={
                            <Typography>
                              Translucent color usage: <br />
                              <Typography
                                fontFamily="code"
                                component="code"
                                sx={{ py: 1, display: 'block' }}
                              >
                                rgba(var(--joy-palette-{token.replace('.', '-')}) /
                                0.6)
                              </Typography>
                            </Typography>
                          }
                          sx={{ pointerEvents: 'none' }}
                        >
                          <InfoOutlined sx={{ cursor: 'initial' }} />
                        </Tooltip>
                      ) : null
                    }
                  >
                    {token}
                  </Typography>
                </td>
                <td>
                  <Typography
                    fontSize="xs"
                    startDecorator={renderSwatch('light', token)}
                    fontFamily="code"
                    letterSpacing="sm"
                    sx={{ alignItems: 'flex-start' }}
                  >
                    {light[token]}
                  </Typography>
                </td>
                <td>
                  <Typography
                    fontSize="xs"
                    startDecorator={renderSwatch('dark', token)}
                    fontFamily="code"
                    letterSpacing="sm"
                    sx={{ alignItems: 'flex-start' }}
                  >
                    {dark[token]}
                  </Typography>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Box>
  );
}
