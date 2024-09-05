/* eslint-disable jsx-a11y/anchor-is-valid */
import * as React from 'react';
import { styled, extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import LightMode from '@mui/icons-material/LightModeOutlined';
import DarkMode from '@mui/icons-material/DarkModeOutlined';
import Check from '@mui/icons-material/CheckCircle';
import { useClipboardCopy } from '@mui/docs/CodeCopy';

const Table = styled('table')(({ theme }) => ({
  border: '1px solid',
  borderColor: theme.vars.palette.divider,
  borderRadius: theme.vars.radius.md,
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
  const { copy, isCopied } = useClipboardCopy();
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
    <Box sx={{ width: '100%', overflow: 'hidden', position: 'relative' }}>
      <Sheet
        variant="solid"
        color="success"
        sx={[
          {
            position: 'absolute',
            left: '50%',
            bottom: 0,
            transition: '0.3s',
            p: 0.5,
            px: 0.75,
            borderRadius: 'xs',
            boxShadow: 'sm',
            zIndex: 1,
          },
          isCopied
            ? { transform: `translateX(-50%) translateY(-0.5rem)` }
            : { transform: `translateX(-50%) translateY(calc(100% + 0.5rem))` },
        ]}
      >
        <Typography level="body-xs" textColor="inherit" startDecorator={<Check />}>
          Copied
        </Typography>
      </Sheet>
      <Table>
        <thead>
          <tr>
            <th>
              <Typography sx={{ fontSize: 'sm' }}>Token</Typography>
            </th>
            <th>
              <Typography sx={{ fontSize: 'sm' }}>Value</Typography>
            </th>
            <th>
              <Typography startDecorator={<LightMode />} sx={{ fontSize: 'sm' }}>
                Light
              </Typography>
            </th>
            <th>
              <Typography startDecorator={<DarkMode />} sx={{ fontSize: 'sm' }}>
                Dark
              </Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {tokens.map((token) => (
            <tr key={token}>
              <td>
                <Typography sx={{ fontSize: 'sm' }}>{token}</Typography>
              </td>
              <td>
                <Link
                  component="button"
                  color="neutral"
                  textColor="inherit"
                  onClick={() => copy(token)}
                  sx={{ textAlign: 'left', fontSize: 'xs', fontFamily: 'code' }}
                >
                  {formatShadowLayers(defaultTheme.shadow[token])}
                </Link>
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
    </Box>
  );
}
