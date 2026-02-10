import * as React from 'react';
import { Badge } from '@mui/base/Badge';
import { useTheme } from '@mui/system';

export default function UnstyledBadge() {
  return (
    <React.Fragment>
      <Badge
        slotProps={{
          root: { className: 'CustomBadge' },
          badge: { className: 'CustomBadge--badge' },
        }}
        badgeContent={5}
      >
        <span className="CustomBadge--content" />
      </Badge>
      <Styles />
    </React.Fragment>
  );
}

const cyan = {
  50: '#E9F8FC',
  100: '#BDEBF4',
  200: '#99D8E5',
  300: '#66BACC',
  400: '#1F94AD',
  500: '#0D5463',
  600: '#094855',
  700: '#063C47',
  800: '#043039',
  900: '#022127',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();
  return (
    <style>
      {`
      .CustomBadge {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-size: 14px;
        font-variant: tabular-nums;
        list-style: none;
        font-family: 'IBM Plex Sans', sans-serif;
        position: relative;
        display: inline-block;
        line-height: 1;
      }

      .CustomBadge--badge {
        z-index: auto;
        position: absolute;
        top: 0;
        right: 0;
        min-width: 22px;
        height: 22px;
        padding: 0 6px;
        color: #fff;
        font-weight: 600;
        font-size: 12px;
        line-height: 22px;
        white-space: nowrap;
        text-align: center;
        border-radius: 12px;
        background: ${cyan[500]};
        box-shadow: 0px 4px 8px ${isDarkMode ? grey[900] : grey[300]};
        transform: translate(50%, -50%);
        transform-origin: 100% 0;
      }

      .CustomBadge--content {
        width: 40px;
        height: 40px;
        border-radius: 12px;
        background: ${isDarkMode ? grey[400] : grey[300]};
        display: inline-block;
        vertical-align: middle;
      }
      `}
    </style>
  );
}
