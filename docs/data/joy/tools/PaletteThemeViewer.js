import * as React from 'react';
import { extendTheme, styled } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import LightMode from '@mui/icons-material/LightModeOutlined';
import DarkMode from '@mui/icons-material/DarkModeOutlined';
import Close from '@mui/icons-material/CloseOutlined';

const defaultTheme = extendTheme();

const traverseObject = (palette) => {
  const result = {};
  const traverse = (object, parts = []) => {
    if (object && typeof object === 'object') {
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

const Table = styled('table')({
  thead: {
    height: 32,
  },
  th: {
    textAlign: 'left',
  },
  td: {
    verticalAlign: 'top',
  },
});

export default function PaletteThemeViewer() {
  const [text, setText] = React.useState('');
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
        width: '1em',
        height: '1em',
        fontSize: 'var(--Icon-fontSize)',
        borderRadius: '2px',
        bgcolor: token,
        boxShadow: 'inset 0 0 0 1px #bababa',
      }}
    />
  );
  return (
    <Box sx={{ width: '100%' }}>
      <Input
        placeholder="Search token"
        size="sm"
        value={text}
        onChange={(event) => setText(event.target.value)}
        endDecorator={
          text ? (
            <IconButton variant="plain" color="neutral" onClick={() => setText('')}>
              <Close />
            </IconButton>
          ) : null
        }
        sx={{ maxWidth: 300, mb: 2 }}
      />
      <Table>
        <thead>
          <tr>
            <th>
              <Typography fontSize="sm">Token</Typography>
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
          {paletteTokens
            .filter((token) => (text ? token.toLowerCase().includes(text) : true))
            .map((token) => (
              <tr key={token}>
                <td>
                  <Typography level="body2">{token}</Typography>
                </td>
                <td>
                  <Typography
                    level="body2"
                    startDecorator={renderSwatch('light', token)}
                    sx={{ alignItems: 'flex-start' }}
                  >
                    {light[token]}
                  </Typography>
                </td>
                <td>
                  <Typography
                    level="body2"
                    startDecorator={renderSwatch('dark', token)}
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
