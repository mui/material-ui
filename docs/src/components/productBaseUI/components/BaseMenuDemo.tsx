import * as React from 'react';
import Box from '@mui/material/Box';
import ButtonUnstyled from '@mui/base/Button';
import MenuUnstyled, { MenuActions } from '@mui/base/Menu';
import MenuItemUnstyled from '@mui/base/MenuItem';
import PopperUnstyled from '@mui/base/Popper';
import { ListActionTypes } from '@mui/base/useList';
import { styled, GlobalStyles } from '@mui/system';
import Person from '@mui/icons-material/Person';

const buttonStyles = `
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: calc(1.5em + 22px);
  border-radius: 12px;
  padding: 10px 14px 10px 8px;
  line-height: 1.5;
  background: var(--muidocs-palette-background-paper);
  border: 1px solid;
  border-color: var(--muidocs-palette-grey-200);
  color: var(--muidocs-palette-text-primary);
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 120ms;
  outline-color: transparent;

  &:hover {
    background: var(--muidocs-palette-grey-50);
  }

  & svg {
    color: var(--palette-primary);
  }

  &.Mui-focusVisible {
    outline: 3px solid;
    outline-color: var(--focus-ring);
  }

  :where([data-mui-color-scheme='dark']) & {
    border-color: var(--muidocs-palette-primaryDark-700);

    &:hover {
      background: var(--muidocs-palette-primaryDark-800);
    }
  }`;
const StyledMenuButton = styled('button')(buttonStyles);

const popperStyles = `
  z-index: 1000;`;
const StyledPopper = styled(PopperUnstyled)(popperStyles);

const listboxStyles = `
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
  }`;
const StyledListbox = styled('ul')(listboxStyles);

const menuItemStyles = `
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
  }`;
const StyledMenuItem = styled('li')(menuItemStyles);

const CSS = `.Mui-base.MuiButton-root{${buttonStyles}};

.Mui-base.MuiMenu-root{${popperStyles}};

.Mui-base.MuiMenu-listbox{${listboxStyles}};

.Mui-base.MuiMenuItem-root{${menuItemStyles}};`;

export default function BaseMenuDemo({ styling }: { styling?: 'system' | 'tailwindcss' | 'css' }) {
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
      {styling === 'css' && <GlobalStyles styles={CSS} />}
      {styling === 'tailwindcss' && (
        <React.Fragment>
          <ButtonUnstyled
            className="min-h-[calc(1.5em + 22px)] inline-flex items-center gap-[0.5rem] rounded-[12px] border border-solid border-[--muidocs-palette-grey-200] bg-[--muidocs-palette-background-paper] p-[10px_14px_10px_8px] text-[0.875rem] leading-[1.5] transition-all [font-family:IBM_Plex_sans] hover:bg-[--muidocs-palette-grey-50]  ui-focus-visible:[outline:3px_solid_var(--focus-ring)] dark:border-[--muidocs-palette-primaryDark-700] dark:hover:bg-[--muidocs-palette-primaryDark-800]"
            type="button"
            onClick={handleButtonClick}
            onKeyDown={handleButtonKeyDown}
            onMouseDown={handleButtonMouseDown}
            ref={updateAnchor}
            aria-controls={isOpen ? 'simple-menu' : undefined}
            aria-expanded={isOpen || undefined}
            aria-haspopup="menu"
          >
            <Person className="text-[--palette-primary]" />
            My account
          </ButtonUnstyled>
          <MenuUnstyled
            actions={menuActions}
            open={isOpen}
            onOpenChange={(open) => {
              setOpen(open);
            }}
            anchorEl={buttonElement}
            slots={{ root: PopperUnstyled }}
            slotProps={{
              root: { placement: 'top', className: 'z-[1000]' },
              listbox: {
                id: 'simple-menu',
                className:
                  'mx-0 my-[8px] p-[4px] flex flex-col rounded-[8px] border border-solid border-[--muidocs-palette-grey-200] bg-[--muidocs-palette-background-paper] shadow-[0px_4px_40px_rgba(62,80,96,0.1)] dark:border-[--muidocs-palette-primaryDark-700] dark:shadow-[0px_4px_40px_rgba(11,13,14,0.5)]',
              },
            }}
          >
            <MenuItemUnstyled
              className="hover:color-[--muidocs-palette-text-primary] flex min-h-[24px] items-center gap-[4px] rounded-[4px] border border-solid border-transparent px-[12px] py-[6px] hover:cursor-default hover:border-[--muidocs-palette-grey-100] hover:bg-[--muidocs-palette-grey-50] ui-focus-visible:cursor-default ui-focus-visible:border-[--muidocs-palette-grey-100] ui-focus-visible:bg-[--muidocs-palette-grey-50] ui-focus-visible:outline-none"
              onClick={createHandleMenuClick()}
            >
              Profile
            </MenuItemUnstyled>
            <MenuItemUnstyled
              className="hover:color-[--muidocs-palette-text-primary] flex min-h-[24px] items-center gap-[4px] rounded-[4px] border border-solid border-transparent px-[12px] py-[6px] hover:cursor-default hover:border-[--muidocs-palette-grey-100] hover:bg-[--muidocs-palette-grey-50] ui-focus-visible:cursor-default ui-focus-visible:border-[--muidocs-palette-grey-100] ui-focus-visible:bg-[--muidocs-palette-grey-50] ui-focus-visible:outline-none"
              onClick={createHandleMenuClick()}
            >
              Language settings
            </MenuItemUnstyled>
            <MenuItemUnstyled
              className="hover:color-[--muidocs-palette-text-primary] flex min-h-[24px] items-center gap-[4px] rounded-[4px] border border-solid border-transparent px-[12px] py-[6px] hover:cursor-default hover:border-[--muidocs-palette-grey-100] hover:bg-[--muidocs-palette-grey-50] ui-focus-visible:cursor-default ui-focus-visible:border-[--muidocs-palette-grey-100] ui-focus-visible:bg-[--muidocs-palette-grey-50] ui-focus-visible:outline-none"
              onClick={createHandleMenuClick()}
            >
              Log out
            </MenuItemUnstyled>
          </MenuUnstyled>
        </React.Fragment>
      )}
      {(styling === 'css' || styling === 'system') && (
        <React.Fragment>
          <ButtonUnstyled
            className="Mui-base"
            slots={{ root: styling !== 'system' ? undefined : StyledMenuButton }}
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
              root: styling !== 'system' ? undefined : StyledPopper,
              listbox: styling !== 'system' ? undefined : StyledListbox,
            }}
            slotProps={{
              root: { placement: 'top', className: 'Mui-base' },
              listbox: { id: 'simple-menu', className: 'Mui-base' },
            }}
          >
            <MenuItemUnstyled
              className="Mui-base"
              slots={{ root: styling !== 'system' ? undefined : StyledMenuItem }}
              onClick={createHandleMenuClick()}
            >
              Profile
            </MenuItemUnstyled>
            <MenuItemUnstyled
              className="Mui-base"
              slots={{ root: styling !== 'system' ? undefined : StyledMenuItem }}
              onClick={createHandleMenuClick()}
            >
              Language settings
            </MenuItemUnstyled>
            <MenuItemUnstyled
              className="Mui-base"
              slots={{ root: styling !== 'system' ? undefined : StyledMenuItem }}
              onClick={createHandleMenuClick()}
            >
              Log out
            </MenuItemUnstyled>
          </MenuUnstyled>
        </React.Fragment>
      )}
    </Box>
  );
}

BaseMenuDemo.getCode = (styling?: 'system') => {
  if (styling === 'system') {
    return `import Button from '@mui/base/Button';
import Menu from '@mui/base/Menu';
import MenuItem from '@mui/base/MenuItem';
import Popper from '@mui/base/Popper';

const StyledMenuButton = styled('button')\`${buttonStyles}\`;
const StyledListbox = styled('ul')\`${listboxStyles}\`;
const StyledMenuItem = styled('li')\`${menuItemStyles}\`;

function Demo() {
  const [buttonElement, setButtonElement] = React.useState(null);
  const updateAnchor = React.useCallback((node) => {
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
        <MenuItem slots={{ root: StyledMenuItem }}>
          Profile
        </MenuItem>
        <MenuItem slots={{ root: StyledMenuItem }}>
          Language settings
        </MenuItem>
        <MenuItem slots={{ root: StyledMenuItem }}>
          Log out
        </MenuItem>
      </Menu>
    </>
  )
}
`;
  }
  if (styling === 'css') {
    return `import Button from '@mui/base/Button';
import Menu from '@mui/base/Menu';
import MenuItem from '@mui/base/MenuItem';
import Popper from '@mui/base/Popper';
import './styles.css';

function Demo() {
  const [buttonElement, setButtonElement] = React.useState(null);
  const updateAnchor = React.useCallback((node) => {
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
        slots={{ root: Popper }}
        anchorEl={buttonElement}
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>Language settings</MenuItem>
        <MenuItem>Log out</MenuItem>
      </Menu>
    </>
  )
}

/* styles.css */
${CSS}
`;
  }
  if (styling === 'tailwindcss') {
    return `import Button from '@mui/base/Button';
import Menu from '@mui/base/Menu';
import MenuItem from '@mui/base/MenuItem';
import Popper from '@mui/base/Popper';

function Demo() {
  const [buttonElement, setButtonElement] = React.useState(null);
  const updateAnchor = React.useCallback((node) => {
    setButtonElement(node);
  }, []);
  return (
    <>
      <ButtonUnstyled
        className="min-h-[calc(1.5em + 22px)] inline-flex 
        items-center gap-[0.5rem] rounded-[12px] border 
        border-solid border-[--muidocs-palette-grey-200] 
        bg-[--muidocs-palette-background-paper] 
        p-[10px_14px_10px_8px] text-[0.875rem] 
        leading-[1.5] transition-all [font-family:IBM_Plex_sans] 
        hover:bg-[--muidocs-palette-grey-50] 
        ui-focus-visible:[outline:3px_solid_var(--focus-ring)]
        dark:border-[--muidocs-palette-primaryDark-700] 
        dark:hover:bg-[--muidocs-palette-primaryDark-800]"
        type="button"
        onClick={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
        onMouseDown={handleButtonMouseDown}
        ref={updateAnchor}
        aria-controls={isOpen ? 'simple-menu' : undefined}
        aria-expanded={isOpen || undefined}
        aria-haspopup="menu"
      >
        <Person className="text-[--palette-primary]" />
        My account
      </ButtonUnstyled>
      <MenuUnstyled
        actions={menuActions}
        open={isOpen}
        onOpenChange={(open) => {
          setOpen(open);
        }}
        anchorEl={buttonElement}
        slots={{ root: PopperUnstyled }}
        slotProps={{
          root: { placement: 'top', className: 'z-[1000]' },
          listbox: {
            id: 'simple-menu',
            className:
              'mx-0 my-[8px] p-[4px] flex flex-col rounded-[8px] 
              border border-solid border-[--muidocs-palette-grey-200] 
              bg-[--muidocs-palette-background-paper] 
              shadow-[0px_4px_40px_rgba(62,80,96,0.1)] 
              dark:border-[--muidocs-palette-primaryDark-700] 
              dark:shadow-[0px_4px_40px_rgba(11,13,14,0.5)]',
          },
        }}
      >
        <MenuItemUnstyled
          className="hover:color-[--muidocs-palette-text-primary] 
          flex min-h-[24px] items-center gap-[4px] rounded-[4px] 
          border border-solid border-transparent px-[12px] 
          py-[6px] hover:cursor-default 
          hover:border-[--muidocs-palette-grey-100] 
          hover:bg-[--muidocs-palette-grey-50] 
          ui-focus-visible:cursor-default 
          ui-focus-visible:border-[--muidocs-palette-grey-100] 
          ui-focus-visible:bg-[--muidocs-palette-grey-50] 
          ui-focus-visible:outline-none"
          onClick={createHandleMenuClick()}
        >
          Profile
        </MenuItemUnstyled>
        <MenuItemUnstyled
          className="hover:color-[--muidocs-palette-text-primary] 
          flex min-h-[24px] items-center gap-[4px] rounded-[4px] 
          border border-solid border-transparent px-[12px] 
          py-[6px] hover:cursor-default 
          hover:border-[--muidocs-palette-grey-100] 
          hover:bg-[--muidocs-palette-grey-50] 
          ui-focus-visible:cursor-default 
          ui-focus-visible:border-[--muidocs-palette-grey-100] 
          ui-focus-visible:bg-[--muidocs-palette-grey-50] 
          ui-focus-visible:outline-none"
          onClick={createHandleMenuClick()}
        >
          Language settings
        </MenuItemUnstyled>
        <MenuItemUnstyled
          className="hover:color-[--muidocs-palette-text-primary] 
          flex min-h-[24px] items-center gap-[4px] rounded-[4px] 
          border border-solid border-transparent px-[12px] 
          py-[6px] hover:cursor-default 
          hover:border-[--muidocs-palette-grey-100] 
          hover:bg-[--muidocs-palette-grey-50] 
          ui-focus-visible:cursor-default 
          ui-focus-visible:border-[--muidocs-palette-grey-100] 
          ui-focus-visible:bg-[--muidocs-palette-grey-50] 
          ui-focus-visible:outline-none"
          onClick={createHandleMenuClick()}
        >
          Log out
        </MenuItemUnstyled>
      </MenuUnstyled>
    </>
  )
}
`;
  }
  return ``;
};
