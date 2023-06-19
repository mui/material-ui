import * as React from 'react';
import { styled } from '@mui/system';
import Badge, { badgeClasses } from '@mui/base/Badge';
import MailIcon from '@mui/icons-material/Mail';

function notificationsLabel(count: number) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 99) {
    return 'more than 99 notifications';
  }
  return `${count} notifications`;
}

export default function AccessibleBadges() {
  return (
    <div aria-label={notificationsLabel(100)}>
      <StyledBadge badgeContent={100}>
        <MailIcon />
      </StyledBadge>
    </div>
  );
}
const blue = {
  500: '#007FFF',
};

const grey = {
  300: '#afb8c1',
  900: '#24292f',
};

const StyledBadge = styled(Badge)(
  ({ theme }) => `
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  list-style: none;
  font-family: IBM Plex Sans, sans-serif;
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
    box-shadow: 0px 4px 6x ${theme.palette.mode === 'dark' ? grey[900] : grey[300]};
    transform: translate(50%, -50%);
    transform-origin: 100% 0; 
  }
  `,
);
