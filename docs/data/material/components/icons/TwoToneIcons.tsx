import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Icon from '@mui/material/Icon';

const useIsDarkMode = () => {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
};

export default function TwoToneIcons() {
  const isDarkMode = useIsDarkMode();

  return (
    <Icon
      baseClassName="material-icons-two-tone"
      style={isDarkMode ? { filter: 'invert(1)' } : undefined}
    >
      add_circle
    </Icon>
  );
}
