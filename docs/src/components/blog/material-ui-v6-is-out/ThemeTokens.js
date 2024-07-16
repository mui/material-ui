import * as React from 'react';

import Box from '@mui/material/Box';
import { CssVarsProvider, extendTheme, styled } from '@mui/material/styles';

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
  width: 'max-content', // to keep the content in 1 line
  borderCollapse: 'separate',
  borderSpacing: 0,
  display: 'block',
  height: 'clamp(30vmax, 40vmax, 40vmin)',
  maxHeight: '40vmin',
  overflowY: 'scroll',
  th: {
    textAlign: 'left',
    padding: 8,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    backgroundColor: theme.vars.palette.background.paper,
    borderBottom: '1px solid',
    borderColor: theme.vars.palette.divider,
  },
  td: {
    verticalAlign: 'top',
    padding: '3px 6px',
    fontSize: '0.75rem',
    fontFamily: 'Menlo,Consolas,"Droid Sans Mono",monospace',
  },
}));

const ColorSwatch = styled('span')(({ theme }) => ({
  display: 'inline-block',
  marginRight: '3px',
  marginBottom: '1px',
  verticalAlign: 'middle',
  width: '0.75em',
  height: '0.75em',
  borderRadius: '2px',
  border: '1px solid',
  borderColor: theme.vars.palette.divider,
  backgroundColor: 'currentcolor',
}));

export default function TemplateCarousel() {
  const colors = traverseObject(defaultTheme.vars.palette);
  const fonts = Object.keys(defaultTheme.vars.font).map(
    (key) => `--mui-font-${key.replace('.', '-')}`,
  );
  const shadow = Object.keys(defaultTheme.vars.shadows).map((key) => `--mui-shadows-${key}`);
  const overlay = Object.keys(defaultTheme.vars.overlays).map((key) => `--mui-overlays-${key}`);
  const spacing = ['--mui-spacing'];
  const shape = ['--mui-shape-borderRadius'];
  const zIndex = Object.keys(defaultTheme.vars.zIndex).map((key) => `--mui-zIndex-${key}`);
  return (
    <CssVarsProvider theme={defaultTheme}>
      <Box
        sx={{
          mb: 4,
          overflowX: 'auto',
        }}
      >
        <Table>
          <thead>
            <tr>
              <th>Light colors</th>
              <th>Dark colors</th>
              <th>Font</th>
              <th>Overlay</th>
              <th>Shadow</th>
              <th>Spacing</th>
              <th>Shape</th>
              <th>z Index</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(colors).map((color, index) => (
              <tr key={index}>
                <td>
                  <ColorSwatch data-mui-color-scheme="light" style={{ color: color[1] }} />
                  --mui-{color[0].replace('.', '-')}
                </td>
                <td>
                  <ColorSwatch data-mui-color-scheme="dark" style={{ color: color[1] }} />
                  --mui-{color[0].replace('.', '-')}
                </td>
                <td>{fonts[index]}</td>
                <td>{overlay[index]}</td>
                <td>{shadow[index]}</td>
                <td>{spacing[index]}</td>
                <td>{shape[index]}</td>
                <td>{zIndex[index]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>
    </CssVarsProvider>
  );
}
