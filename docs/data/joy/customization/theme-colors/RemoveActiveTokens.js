import * as React from 'react';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

// ⚠️ If the value is `undefined`, it should be `undefined` for other color schemes as well.
const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          solidActiveBg: undefined,
        },
      },
    },
    dark: {
      palette: {
        primary: {
          solidActiveBg: undefined,
        },
      },
    },
  },
});

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

export default function RemoveActiveTokens() {
  // the `node` is used for attaching CSS variables to this demo, you might not need it in your application.
  const [node, setNode] = React.useState(null);
  useEnhancedEffect(() => {
    setNode(document.getElementById('remove-active-tokens-demo'));
  }, []);

  return (
    <CssVarsProvider theme={theme} colorSchemeNode={node || null}>
      <Box
        id="remove-active-tokens-demo"
        sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}
      >
        <Button>Button</Button>
      </Box>
    </CssVarsProvider>
  );
}
