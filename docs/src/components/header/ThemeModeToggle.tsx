import * as React from 'react';
import { useColorScheme, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';

interface ThemeModeToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const CssVarsModeToggle = (props: ThemeModeToggleProps) => {
  const [mounted, setMounted] = React.useState(false);
  const { mode, setMode } = useColorScheme();
  React.useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <Tooltip title={mode === 'dark' ? 'Turn on the light' : 'Turn off the light'}>
      <IconButton
        color="primary"
        disableTouchRipple
        disabled={!mode}
        onClick={() => {
          props.onChange(!props.checked);
          setMode(mode === 'dark' ? 'light' : 'dark');
        }}
      >
        {!mode || !mounted
          ? null
          : {
              light: <DarkModeOutlined fontSize="small" />,
              system: <DarkModeOutlined fontSize="small" />,
              dark: <LightModeOutlined fontSize="small" />,
            }[mode]}
      </IconButton>
    </Tooltip>
  );
};

export default function ThemeModeToggle(props: ThemeModeToggleProps) {
  const theme = useTheme();
  if (theme.vars) {
    return <CssVarsModeToggle {...props} />;
  }
  return (
    <Tooltip title={props.checked ? 'Turn on the light' : 'Turn off the light'}>
      <IconButton
        color="primary"
        disableTouchRipple
        onClick={() => {
          try {
            localStorage.setItem('muidocs-mode', props.checked ? 'light' : 'dark');
          } catch (error) {
            // do nothing
          }
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
