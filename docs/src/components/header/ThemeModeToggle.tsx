import * as React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DarkModeOutlined from '@material-ui/icons/DarkModeOutlined';
import LightModeOutlined from '@material-ui/icons/LightModeOutlined';

const ThemeModeToggle = (props: { checked: boolean; onChange: (checked: boolean) => void }) => {
  return (
    <Tooltip title={props.checked ? 'Turn on the light' : 'Switch to dark mode'}>
      <IconButton
        disableTouchRipple
        onClick={() => props.onChange(!props.checked)}
        sx={{
          color: (theme) => (theme.palette.mode === 'dark' ? 'grey.100' : 'primary.main'),
          borderRadius: 1,
          p: '11px',
          border: '1px solid',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.700' : 'transparent'),
          borderColor: (theme) => (theme.palette.mode === 'dark' ? 'primaryDark.500' : 'grey.200'),
          '& svg': {
            fontSize: 21,
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
