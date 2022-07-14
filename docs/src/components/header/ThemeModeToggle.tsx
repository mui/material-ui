import * as React from 'react';
import { useRouter } from 'next/router';
import { useColorScheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';

interface ThemeModeToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ThemeModeToggle(props: ThemeModeToggleProps) {
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  const { mode, setMode } = useColorScheme();
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (router.pathname === '/') {
    if (!mounted) {
      return <IconButton color="primary" disabled />;
    }
    return (
      <Tooltip title={mode === 'dark' ? 'Turn on the light' : 'Turn off the light'}>
        <IconButton
          color="primary"
          disableTouchRipple
          onClick={() => {
            props.onChange(!props.checked);
            setMode(mode === 'dark' ? 'light' : 'dark');
          }}
        >
          {mode === 'dark' ? (
            <LightModeOutlined fontSize="small" />
          ) : (
            <DarkModeOutlined fontSize="small" />
          )}
        </IconButton>
      </Tooltip>
    );
  }
  return (
    <Tooltip title={props.checked ? 'Turn on the light' : 'Turn off the light'}>
      <IconButton color="primary" disableTouchRipple onClick={() => props.onChange(!props.checked)}>
        {props.checked ? (
          <LightModeOutlined fontSize="small" />
        ) : (
          <DarkModeOutlined fontSize="small" />
        )}
      </IconButton>
    </Tooltip>
  );
}
