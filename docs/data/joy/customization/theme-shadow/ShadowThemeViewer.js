import * as React from 'react';
import { styled, extendTheme } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import LightMode from '@mui/icons-material/LightModeOutlined';
import DarkMode from '@mui/icons-material/DarkModeOutlined';

const Table = styled('table')(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.vars.palette.divider,
  borderRadius: theme.vars.radius.xs,
  borderCollapse: 'separate',
  borderSpacing: 0,
  width: '100%',
  overflowY: 'scroll',
  th: {
    textAlign: 'left',
    padding: 12,
    position: 'sticky',
    top: 0,
    zIndex: 1,
    ...theme.variants.soft.neutral,
  },
  td: {
    verticalAlign: 'top',
    padding: '8px 12px',
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
const defaultTheme = extendTheme();

export default function ShadowThemeViewer() {
  const tokens = Object.keys(defaultTheme.shadow);
  const formatShadowLayers = (shadow) =>
    React.Children.toArray(
      shadow
        .split(', ')
        .reduce(
          (result, curr, index, array) =>
            array.length - 1 !== index
              ? [...result, `${curr},`, <br />]
              : [...result, curr],
          [],
        ),
    );

  return (
    <Table>
      <thead>
        <tr>
          <th>
            <Typography fontSize="sm">Token</Typography>
          </th>
          <th>
            <Typography fontSize="sm">Value</Typography>
          </th>
          <th>
            <Typography fontSize="sm" startDecorator={<LightMode />}>
              Light
            </Typography>
          </th>
          <th>
            <Typography fontSize="sm" startDecorator={<DarkMode />}>
              Dark
            </Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((token) => (
          <tr key={token}>
            <td>
              <Typography fontSize="sm">{token}</Typography>
            </td>
            <td>
              <Typography level="body2">
                {formatShadowLayers(defaultTheme.shadow[token])}
              </Typography>
            </td>
            <td data-joy-color-scheme="light">
              <Sheet
                variant="outlined"
                sx={{
                  width: 64,
                  height: 64,
                  boxShadow: (theme) => theme.shadow[token],
                  borderRadius: 'xs',
                  mr: 2,
                }}
              />
            </td>
            <td data-joy-color-scheme="dark">
              <Sheet
                variant="outlined"
                sx={{
                  width: 64,
                  height: 64,
                  boxShadow: (theme) => theme.shadow[token],
                  borderRadius: 'xs',
                }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
