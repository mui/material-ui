import * as React from 'react';
import { extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ThemeViewer, {
  useItemIdsLazy,
} from 'docs/src/modules/components/ThemeViewer';

const defaultTheme = extendTheme();

export default function JoyDefaultTheme() {
  const [expandPaths, setExpandPaths] = React.useState(null);

  React.useEffect(() => {
    let expandPath;
    decodeURI(document.location.search.slice(1))
      .split('&')
      .forEach((param) => {
        const [name, value] = param.split('=');
        if (name === 'expand-path') {
          expandPath = value;
        }
      });

    if (!expandPath) {
      return;
    }

    setExpandPaths(
      expandPath
        .replace('$.', '')
        .split('.')
        .reduce((acc, path) => {
          const last = acc.length > 0 ? `${acc[acc.length - 1]}.` : '';
          acc.push(last + path);
          return acc;
        }, []),
    );
  }, []);

  const data = defaultTheme;
  const allNodeIds = useItemIdsLazy(data);
  React.useDebugValue(allNodeIds);

  return (
    <Box sx={{ width: '100%' }}>
      <ThemeProvider theme={() => createTheme()}>
        <ThemeViewer data={data} expandPaths={expandPaths} />
      </ThemeProvider>
    </Box>
  );
}
