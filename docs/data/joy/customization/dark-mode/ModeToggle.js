import * as React from 'react';
import { CssVarsProvider, useColorScheme, extendTheme } from '@mui/joy/styles';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

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
    <Select
      variant="soft"
      value={mode}
      onChange={(event, newMode) => {
        setMode(newMode);
      }}
    >
      <Option value="system">System</Option>
      <Option value="light">Light</Option>
      <Option value="dark">Dark</Option>
    </Select>
  );
}

const theme = extendTheme({
  cssVarPrefix: 'mode-toggle',
  colorSchemeSelector: '.demo_mode-toggle-%s',
});

export default function ModeToggle() {
  return (
    <CssVarsProvider
      // the props below are specific to this demo,
      // you might not need them in your app.
      //
      theme={theme}
      //
      // the local storage key to use.
      modeStorageKey="mode-toggle-demo"
      //
      // set as root provider
      disableNestedContext
    >
      <ModeSwitcher />
    </CssVarsProvider>
  );
}
