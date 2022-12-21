import * as React from 'react';
import { styled, extendTheme, Radius } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

const Table = styled('table')({
  width: '100%',
  borderCollapse: 'separate',
  borderSpacing: 20,
  thead: {
    height: 32,
  },
  th: {
    textAlign: 'left',
  },
});
const defaultTheme = extendTheme();

export default function RadiusThemeViewer() {
  const tokens = Object.keys(defaultTheme.radius) as Array<keyof Radius>;
  return (
    <Table>
      <thead>
        <tr>
          <th>
            <Typography fontSize="sm">Key</Typography>
          </th>
          <th>
            <Typography fontSize="sm">Value</Typography>
          </th>
          <th>
            <Typography fontSize="sm">Preview</Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {tokens.map((token) => (
          <tr key={token}>
            <td>
              <Typography level="body2">{token}</Typography>
            </td>
            <td>
              <Typography level="body2">{defaultTheme.radius[token]}</Typography>
            </td>
            <td>
              <Sheet
                variant="outlined"
                sx={{ width: 40, height: 40, borderRadius: token }}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
