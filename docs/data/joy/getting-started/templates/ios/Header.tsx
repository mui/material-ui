import * as React from 'react';
import { useColorScheme } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import InsertPhotoOutlinedIcon from '@mui/icons-material/InsertPhotoOutlined';
import HideImageOutlinedIcon from '@mui/icons-material/HideImageOutlined';
import GitHubIcon from '@mui/icons-material/GitHub';

function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size="sm" variant="outlined" color="neutral" />;
  }
  return (
    <IconButton
      id="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      onClick={() => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
      }}
    >
      {mode === 'light' ? <DarkModeRoundedIcon /> : <LightModeRoundedIcon />}
    </IconButton>
  );
}

export default function Navigation() {
  const [hasWallpaper, setHasWallpaper] = React.useState(true);
  return (
    <Sheet
      component="header"
      sx={(theme) => ({
        px: 2,
        gridArea: 'header',
        display: 'flex',
        gap: 1,
        alignItems: 'center',
        boxShadow:
          '0 0 0 0.5px rgba(0 0 0 / .04), 0 3px 8px 0px rgba(0 0 0 / .15), 0 3px 1px 0 rgba(0 0 0 / .06)',
        zIndex: 1,
        ...theme.materials.navbar,
      })}
    >
      {hasWallpaper && (
        <GlobalStyles
          styles={(theme) => ({
            body: {
              backgroundImage: `url(/static/images/templates/ios-wallpaper-light.png)`,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              [theme.getColorSchemeSelector('dark')]: {
                backgroundImage: `url(/static/images/templates/ios-wallpaper-dark.png)`,
              },
            },
          })}
        />
      )}
      <Typography component="h1" level="headline" sx={{ mr: 'auto' }}>
        Joy UI — iOS Theme
      </Typography>
      <IconButton
        variant="outlined"
        color="neutral"
        size="sm"
        component="a"
        href="https://github.com/mui/material-ui/pull/34994"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
      </IconButton>
      <IconButton
        onClick={() => setHasWallpaper(!hasWallpaper)}
        variant="outlined"
        color="neutral"
        size="sm"
      >
        {hasWallpaper ? <HideImageOutlinedIcon /> : <InsertPhotoOutlinedIcon />}
      </IconButton>
      <ModeToggle />
    </Sheet>
  );
}
