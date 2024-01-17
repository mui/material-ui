import * as React from 'react';
import { styled, Box } from '@mui/system';
import { Badge as BaseBadge, badgeClasses } from '@mui/base/Badge';

function BadgeContent() {
  return (
    <Box
      component="span"
      sx={{
        width: 40,
        height: 40,
        borderRadius: '12px',
        background: (theme) =>
          theme.palette.mode === 'dark' ? grey[400] : grey[300],
        display: 'inline-block',
        verticalAlign: 'middle',
      }}
    />
  );
}

export default function UnstyledBadge() {
  return (
    <Badge badgeContent={5}>
      <BadgeContent />
    </Badge>
  );
}

const blue = {
  500: '#007FFF',
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

const Badge = styled(BaseBadge)(
  ({ theme }) => `
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

  & .${badgeClasses.badge} {
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
    background: ${blue[500]};
    box-shadow: 0px 4px 8px ${theme.palette.mode === 'dark' ? grey[900] : grey[300]};
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
  `,
);
