import * as React from 'react';
import { CssVarsProvider, useColorScheme, extendTheme } from '@mui/joy/styles';
import Typography from '@mui/joy/Typography';

const theme = extendTheme({ cssVarPrefix: 'demo' });

function Identifier() {
  const { systemMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <Typography component="div" sx={{ fontSize: 'lg', opacity: 0 }}>
        Calculating…
      </Typography>
    );
  }
  return (
    <Typography component="div" sx={{ fontSize: 'lg' }}>
      Your system is in{' '}
      <Typography
        variant="outlined"
        sx={{
          fontSize: 'md',
          boxShadow: 'sm',
          fontFamily: 'code',
          bgcolor: 'background.level1',
        }}
      >
        {systemMode}
      </Typography>{' '}
      mode.
    </Typography>
  );
}

export default function IdentifySystemMode() {
  return (
    <CssVarsProvider
      // The props below are specific to this demo,
      // you might not need them in your app.
      //
      theme={theme}
      // the local storage key to use.
      modeStorageKey="demo_identify-system-mode"
      // set as root provider
      disableNestedContext
    >
      <Identifier />
    </CssVarsProvider>
  );
}
