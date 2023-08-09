import * as React from 'react';
import { Badge } from '@mui/base/Badge';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledBadge() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <Badge
        slotProps={{
          root: {
            className:
              'box-border m-0 p-0 text-xs list-none relative inline-block leading-none',
          },
          badge: {
            className:
              'z-auto absolute top-0 right-0 min-w-badge min-h-badge p-0 text-white font-semibold font-xs rounded-xl bg-purple-500 leading-5.5 whitespace-nowrap text-center translate-x-1/2 -translate-y-1/2 drop-shadow-lg origin-right',
          },
        }}
        badgeContent={5}
      >
        <span className="w-10 h-10 rounded-xl bg-slate-300 dark:bg-slate-400 inline-block align-middle" />
      </Badge>
    </div>
  );
}
