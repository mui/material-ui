import * as React from 'react';
import { alpha, useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeOutlined from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlined from '@mui/icons-material/LightModeOutlined';

interface ThemeModeToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ThemeModeToggle(props: ThemeModeToggleProps) {
  const theme = useTheme();
  return (
    <Tooltip title={props.checked ? 'Turn on the light' : 'Turn off the light'}>
      <IconButton
        disableTouchRipple
        onClick={() => props.onChange(!props.checked)}
        sx={{
          color: theme.palette.mode === 'dark' ? 'primary.300' : 'primary.main',
          borderRadius: 1,
          p: '6.5px',
          border: '1px solid',
          bgcolor: theme.palette.mode === 'dark' ? 'primaryDark.900' : 'transparent',
          borderColor: theme.palette.mode === 'dark' ? 'primaryDark.700' : 'grey.200',
          '&:hover': {
            background:
              theme.palette.mode === 'dark'
                ? alpha(theme.palette.primaryDark[700], 0.4)
                : alpha(theme.palette.grey[100], 0.7),
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.primaryDark[600]
                : theme.palette.grey[300],
          },
          '& svg': {
            fontSize: theme.typography.pxToRem(20),
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
}
