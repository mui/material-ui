import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';

const useEnhancedEffect =
  typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

function ModeSwitcher() {
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

export default function ModeToggle() {
  // the `node` is used for attaching CSS variables to this demo,
  // you might not need it in your application.
  const [node, setNode] = React.useState(null);
  useEnhancedEffect(() => {
    setNode(document.getElementById('mode-toggle'));
  }, []);

  return (
    <CssVarsProvider
      // the props below are specific to this demo,
      // you might not need them in your app.
      //
      // the element to apply [data-joy-color-scheme] attribute.
      colorSchemeNode={node || null}
      //
      // the selector to apply the CSS theme variables stylesheet.
      colorSchemeSelector="#mode-toggle"
      //
      // the local storage key to use.
      modeStorageKey="mode-toggle-demo"
    >
      <Box
        id="mode-toggle"
        sx={{
          textAlign: 'center',
          flexGrow: 1,
          p: 2,
          m: -3,
          borderRadius: [0, 'sm'],
          bgcolor: 'background.body',
        }}
      >
        <ModeSwitcher />
      </Box>
    </CssVarsProvider>
  );
}
