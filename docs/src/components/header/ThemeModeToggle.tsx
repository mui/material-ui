import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';

const ThemeModeToggle = (props: { checked: boolean; onChange: (checked: boolean) => void }) => {
  return (
    <Tooltip title={props.checked ? 'Turn on the light' : 'Switch to dark mode'}>
      <IconButton
        disableTouchRipple
        onClick={() => props.onChange(!props.checked)}
        sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.100' : 'primary.main'),
          borderRadius: 1,
          p: '6.5px',
          border: '1px solid',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'transparent'),
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.200'),
          '& svg': {
            fontSize: 18,
          },
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
};

export default ThemeModeToggle;
