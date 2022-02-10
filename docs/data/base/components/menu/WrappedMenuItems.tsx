import * as React from 'react';
import MenuUnstyled from '@mui/base/MenuUnstyled';
import MenuItemUnstyled, {
  menuItemUnstyledClasses,
} from '@mui/base/MenuItemUnstyled';
import { styled } from '@mui/system';

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

interface MenuSectionProps {
  children: React.ReactNode;
  label: string;
}

const MenuSectionRoot = styled('li')``;

const MenuSectionLabel = styled('span')``;

function MenuSection({ children, label }: MenuSectionProps) {
  return (
    <MenuSectionRoot>
      <MenuSectionLabel>{label}</MenuSectionLabel>
      <ul>{children}</ul>
    </MenuSectionRoot>
  );
}

export default function UnstyledMenuSimple() {
  return (
    <StyledMenu>
      <li>What would you like to do next?</li>
      <MenuSection label="Text operations">
        <StyledMenuItem>Cut</StyledMenuItem>
        <StyledMenuItem>Copy</StyledMenuItem>
        <StyledMenuItem disabled>Paste</StyledMenuItem>
      </MenuSection>
      <MenuSection label="File">
        <StyledMenuItem>Save</StyledMenuItem>
        <StyledMenuItem>Close</StyledMenuItem>
      </MenuSection>
    </StyledMenu>
  );
}
