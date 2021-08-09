import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DarkModeOutlined from '@material-ui/icons/DarkModeOutlined';
import LightModeOutlined from '@material-ui/icons/LightModeOutlined';

const ThemeModeToggle = (props: { checked: boolean; onChange: (checked: boolean) => void }) => {
  return (
    <IconButton
      disableTouchRipple
      onClick={() => props.onChange(!props.checked)}
      sx={{
        color: (theme) => (theme.palette.mode === 'dark' ? '#fff' : 'primary.main'),
        borderRadius: 1,
        p: 0.5,
        border: '1px solid',
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'transparent'),
        borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.200'),
      }}
    >
      {props.checked ? <LightModeOutlined /> : <DarkModeOutlined />}
    </IconButton>
  );
};

export default ThemeModeToggle;
