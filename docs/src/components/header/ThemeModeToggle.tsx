import * as React from 'react';
import { useColorScheme, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';

function CssVarsModeToggle(props: { onChange: (checked: boolean) => void }) {
  const [mounted, setMounted] = React.useState(false);
  const { mode, systemMode, setMode } = useColorScheme();
  React.useEffect(() => {
    setMounted(true);
  }, []);
  const calculatedMode = mode === 'system' ? systemMode : mode;
  return (
    <Tooltip title={calculatedMode === 'dark' ? 'Turn on the light' : 'Turn off the light'}>
      <IconButton
        color="primary"
        disableTouchRipple
        disabled={!calculatedMode}
        onClick={() => {
          props.onChange(calculatedMode === 'light');
          setMode(calculatedMode === 'dark' ? 'light' : 'dark');
        }}
      >
        {!calculatedMode || !mounted
          ? null
          : {
              light: <DarkModeOutlined fontSize="small" />,
              dark: <LightModeOutlined fontSize="small" />,
            }[calculatedMode]}
      </IconButton>
    </Tooltip>
  );
}

export default function ThemeModeToggle(props: {
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  const theme = useTheme();
  if (theme.vars) {
    // Temporarily renders conditionally because `useColorScheme` could not be used in the pages that haven't migrated to CSS theme variables.
    return <CssVarsModeToggle {...props} />;
  }
  return (
    <Tooltip title={props.checked ? 'Turn on the light' : 'Turn off the light'}>
      <IconButton
        color="primary"
        disableTouchRipple
        onClick={() => {
          props.onChange(!props.checked);
        }}
      >
        {props.checked ? (
          <LightModeOutlined fontSize="small" />
        ) : (
          <DarkModeOutlined fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
}
