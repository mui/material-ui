/* eslint-disable no-console */

import * as React from 'react';
import MenuUnstyled from '@mui/base/MenuUnstyled';
import MenuItemUnstyled, {
  menuItemUnstyledClasses,
} from '@mui/base/MenuItemUnstyled';
import { styled } from '@mui/system';
import ContentCut from '@mui/icons-material/ContentCut';
import ContentCopy from '@mui/icons-material/ContentCopy';
import ContentPaste from '@mui/icons-material/ContentPaste';

const StyledMenu = styled(MenuUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  min-width: 200px;
  max-width: 300px;
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;

  .mode-dark & {
    border-color: #333;
  }
`;

const StyledMenuItem = styled(MenuItemUnstyled)`
  padding: 6px 20px;
  margin: 0;
  cursor: default;
  display: flex;
  gap: 10px;
  align-items: center;

  &:hover:not(.${menuItemUnstyledClasses.disabled}),
  &:focus-visible {
    background-color: #16d;
    color: #fff;
    outline: none;
  }

  &:active:not(.${menuItemUnstyledClasses.disabled}) {
    background-color: #05e;
  }

  &.${menuItemUnstyledClasses.disabled} {
    opacity: 0.5;
  }

  > svg {
    opacity: 0.6;
  }
`;

export default function UnstyledMenuSimple() {
  return (
    <StyledMenu>
      <StyledMenuItem onClick={() => console.log('Cut')}>
        <ContentCut fontSize="small" /> Cut
      </StyledMenuItem>
      <StyledMenuItem onClick={() => console.log('Copy')}>
        <ContentCopy fontSize="small" /> Copy
      </StyledMenuItem>
      <StyledMenuItem onClick={() => console.log('Paste')} disabled>
        <ContentPaste fontSize="small" /> Paste
      </StyledMenuItem>
    </StyledMenu>
  );
}
