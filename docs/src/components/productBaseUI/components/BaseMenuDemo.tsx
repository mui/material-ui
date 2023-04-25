import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonUnstyled from '@mui/base/Button';
import MenuUnstyled, { MenuActions } from '@mui/base/Menu';
import MenuItemUnstyled from '@mui/base/MenuItem';
import PopperUnstyled from '@mui/base/Popper';
import { ListActionTypes } from '@mui/base/useList';
import { styled } from '@mui/system';
import Person from '@mui/icons-material/Person';

const StyledMenuButton = styled('button')`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 12px 16px;
  line-height: 1.5;
  background: var(--muidocs-palette-background-paper);
  border: 1px solid;
  border-color: var(--muidocs-palette-grey-200);
  color: var(--muidocs-palette-text-primary);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  outline-color: transparent;
  & svg {
    color: var(--muidocs-palette-grey-600);
  }
  &.Mui-focusVisible {
    outline: 3px solid;
    outline-color: var(--muidocs-palette-grey-300);
  }
  :where([data-mui-color-scheme='dark']) & {
    border-color: var(--muidocs-palette-primaryDark-700);
  }
`;
const StyledPopper = styled(PopperUnstyled)``;
const StyledListbox = styled('ul')`
  margin: 8px 0;
  padding: 4px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: 1px solid;
  border-color: var(--muidocs-palette-grey-200);
  background: var(--muidocs-palette-background-paper);
  box-shadow: 0px 4px 40px rgba(62, 80, 96, 0.1);

  :where([data-mui-color-scheme='dark']) & {
    border-color: var(--muidocs-palette-primaryDark-700);
    box-shadow: 0px 4px 40px rgba(11, 13, 14, 0.5);
  }
`;
const StyledMenuItem = styled('li')`
  display: flex;
  align-items: center;
  padding: 6px 12px;
  min-height: 24px;
  border-radius: 4px;
  border: 1px solid transparent;
  gap: 4px;
  &:hover,
  &.Mui-focusVisible {
    cursor: default;
    outline: none;
    color: var(--muidocs-palette-text-primary);
    background: var(--muidocs-palette-grey-50);
    border-color: var(--muidocs-palette-grey-100);
  }

  :where([data-mui-color-scheme='dark']) & {
    color: var(--muidocs-palette-grey-300);
    &:hover,
    &.Mui-focusVisible {
      color: var(--muidocs-palette-text-primary);
      background: var(--muidocs-palette-primaryDark-700);
      border-color: var(--muidocs-palette-primaryDark-500);
    }
  }
`;

export default function BaseMenuDemo({ styling }: { styling?: 'system' }) {
  const [buttonElement, setButtonElement] = React.useState<HTMLButtonElement | null>(null);
  const [isOpen, setOpen] = React.useState(false);
  const menuActions = React.useRef<MenuActions>(null);
  const preventReopen = React.useRef(false);

  const updateAnchor = React.useCallback((node: HTMLButtonElement | null) => {
    setButtonElement(node);
  }, []);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (preventReopen.current) {
      event.preventDefault();
      preventReopen.current = false;
      return;
    }

    setOpen((open) => !open);
  };

  const handleButtonMouseDown = () => {
    if (isOpen) {
      // Prevents the menu from reopening right after closing
      // when clicking the button.
      preventReopen.current = true;
    }
  };

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      if (event.key === 'ArrowUp') {
        // Focus the last item when pressing ArrowUp.
        menuActions.current?.dispatch({
          type: ListActionTypes.keyDown,
          key: event.key,
          event,
        });
      }
    }
  };

  const createHandleMenuClick = () => {
    return () => {
      setOpen(false);
      buttonElement?.focus();
    };
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
        height: '100%',
      }}
    >
      <ButtonUnstyled
        slots={{ root: !styling ? undefined : StyledMenuButton }}
        type="button"
        onClick={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
        onMouseDown={handleButtonMouseDown}
        ref={updateAnchor}
        aria-controls={isOpen ? 'simple-menu' : undefined}
        aria-expanded={isOpen || undefined}
        aria-haspopup="menu"
      >
        <Person />
        My account
      </ButtonUnstyled>
      <MenuUnstyled
        actions={menuActions}
        open={isOpen}
        onOpenChange={(open) => {
          setOpen(open);
        }}
        anchorEl={buttonElement}
        slots={{
          root: !styling ? undefined : StyledPopper,
          listbox: !styling ? undefined : StyledListbox,
        }}
        slotProps={{ root: { placement: 'top' }, listbox: { id: 'simple-menu' } }}
      >
        <MenuItemUnstyled
          slots={{ root: !styling ? undefined : StyledMenuItem }}
          onClick={createHandleMenuClick()}
        >
          Profile
        </MenuItemUnstyled>
        <MenuItemUnstyled
          slots={{ root: !styling ? undefined : StyledMenuItem }}
          onClick={createHandleMenuClick()}
        >
          Language settings
        </MenuItemUnstyled>
        <MenuItemUnstyled
          slots={{ root: !styling ? undefined : StyledMenuItem }}
          onClick={createHandleMenuClick()}
        >
          Log out
        </MenuItemUnstyled>
      </MenuUnstyled>
    </Box>
  );
}

BaseMenuDemo.getCode = (styling?: 'system') => {
  if (styling === 'system') {
    return `import Button from '@mui/base/Button';
import Menu, { MenuActions } from '@mui/base/Menu';
import MenuItem from '@mui/base/MenuItem';
import Popper from '@mui/base/Popper';

const StyledMenuButton = styled('button')\`/* CSS… */\`;
const StyledListbox = styled('ul')\`/* CSS… */\`;
const StyledMenuItem = styled('li')\`/* CSS… */\`;

function Demo() {
  const [buttonElement, setButtonElement] = React.useState(null);
  const updateAnchor = React.useCallback((node: HTMLButtonElement | null) => {
    setButtonElement(node);
  }, []);
  return (
    <>
      <Button
        ref={updateAnchor}
        slots={{ root: StyledMenuButton }}
        onClick={() => setOpen((open) => !open)}
      >
        My account
      </Button>
      <Menu
        slots={{
          root: Popper,
          listbox: StyledListbox,
        }}
        anchorEl={buttonElement}
      >
        <MenuItem slots={{ root: StyledMenuItem }}>Profile</MenuItem>
        <MenuItem slots={{ root: StyledMenuItem }}>Language settings</MenuItem>
        <MenuItem slots={{ root: StyledMenuItem }}>Log out</MenuItem>
      </Menu>
    </>
  )
}
`;
  }
  return `import Button from '@mui/base/Button';
import Menu, { MenuActions } from '@mui/base/Menu';
import MenuItem from '@mui/base/MenuItem';

function Demo() {
  const [buttonElement, setButtonElement] = React.useState(null);
  const updateAnchor = React.useCallback((node: HTMLButtonElement | null) => {
    setButtonElement(node);
  }, []);
  return (
    <>
      <Button
        ref={updateAnchor}
        onClick={() => setOpen((open) => !open)}
      >
        My account
      </Button>
      <Menu
        anchorEl={buttonElement}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>Language settings</MenuItem>
        <MenuItem>Log out</MenuItem>
      </Menu>
    </>
  )
}
`;
};
