import * as React from 'react';
import { extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import ThemeViewer, {
  useNodeIdsLazy,
} from 'docs/src/modules/components/ThemeViewer';

const defaultTheme = extendTheme();

export default function JoyDefaultTheme() {
  React.useEffect(() => {
    let expandPath;
    decodeURI(document.location.search.slice(1))
      .split('&')
      .forEach((param) => {
        const [name, value] = param.split('=');
        if (name === 'expand-path') {
          expandPath = value;
        } else if (name === 'expend-path' && !expandPath) {
          // 'expend-path' is for backwards compatibility of any external links with a prior typo.
          expandPath = value;
        }
      });
  }, []);

  const data = defaultTheme;
  const allNodeIds = useNodeIdsLazy(data);
  React.useDebugValue(allNodeIds);

  return (
    <Box sx={{ width: '100%' }}>
      <ThemeProvider theme={() => createTheme()}>
        <ThemeViewer data={data} />
      </ThemeProvider>
    </Box>
  );
}
