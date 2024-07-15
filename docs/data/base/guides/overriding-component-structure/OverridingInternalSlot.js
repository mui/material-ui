import * as React from 'react';
import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function OverridingInternalSlot() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <Select
      slots={{ listbox: 'ol' }}
      slotProps={{
        listbox: {
          style: {
            backgroundColor: isDarkMode ? 'black' : 'white',
            padding: '8px 12px',
            listStylePosition: 'inside',
            boxSizing: 'border-box',
          },
        },
      }}
      defaultValue="First option"
    >
      <Option value="First option">First option</Option>
      <Option value="Second option">Second option</Option>
    </Select>
  );
}
