import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <Button
      variant="outlined"
      color="neutral"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
    >
      {mode === 'dark' ? 'Turn light' : 'Turn dark'}
    </Button>
  );
}

export default function BootstrapVariantTokens() {
  // the `node` is used for attaching CSS variables to this demo, you might not need it in your application.
  const [node, setNode] = React.useState(null);
  useEnhancedEffect(() => {
    setNode(document.getElementById('mode-toggle'));
  }, []);

  return (
    <CssVarsProvider
      colorSchemeNode={node || null}
      modeStorageKey="mode-toggle-demo"
      colorSchemeStorageKey="mode-toggle-demo"
      colorSchemeSelector="#mode-toggle"
    >
      <Box
        id="mode-toggle"
        sx={{
          textAlign: 'center',
          flexGrow: 1,
          p: 2,
          m: -3,
          borderRadius: 'sm',
          bgcolor: 'background.body',
        }}
      >
        <ModeToggle />
      </Box>
    </CssVarsProvider>
  );
}
