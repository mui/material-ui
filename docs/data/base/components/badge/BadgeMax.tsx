import * as React from 'react';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';
import BadgeUnstyled, { badgeUnstyledClasses } from '@mui/base/BadgeUnstyled';
import MailIcon from '@mui/icons-material/Mail';

const StyledBadge = styled(BadgeUnstyled)`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  list-style: none;
  font-family: IBM Plex Sans, sans-serif;
  position: relative;
  display: inline-block;
  line-height: 1;

  & .${badgeUnstyledClasses.badge} {
    z-index: auto;
    min-width: 20px;
    height: 20px;
    padding: 0 6px;
    color: #fff;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    background: #07f;
    border-radius: 10px;
    box-shadow: 0 0 0 1px #fff;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }
`;

export default function BadgeMax() {
  return (
    <Stack spacing={4} direction="row">
      <StyledBadge badgeContent={99}>
        <MailIcon />
      </StyledBadge>
      <StyledBadge badgeContent={100}>
        <MailIcon />
      </StyledBadge>
      <StyledBadge badgeContent={1000} max={999}>
        <MailIcon />
      </StyledBadge>
    </Stack>
  );
}
