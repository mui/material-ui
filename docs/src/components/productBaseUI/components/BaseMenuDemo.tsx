import * as React from 'react';
import Box from '@mui/material/Box';
import { Dropdown } from '@mui/base/Dropdown';
import { Menu } from '@mui/base/Menu';
import { MenuButton } from '@mui/base/MenuButton';
import { MenuItem } from '@mui/base/MenuItem';
import { styled, GlobalStyles } from '@mui/system';
import Person from '@mui/icons-material/Person';

const buttonStyles = `
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  box-sizing: border-box;
  border-radius: 8px;
  padding: 8px 12px 8px 6px;
  line-height: 1.5;
  background: var(--muidocs-palette-background-paper);
  box-shadow: var(--shadow);
  border: 1px solid;
  border-color: var(--muidocs-palette-grey-200);
  color: var(--muidocs-palette-text-primary);
  transition: all 120ms ease;
  outline-color: transparent;

  & svg {
    color: var(--palette-primary);
  }

  &:hover {
    background: var(--muidocs-palette-grey-50);
    border-color: var(--muidocs-palette-grey-300);
  }

  &:focus-visible {
    outline: 4px solid var(--focus-ring);
    border-color: var(--muidocs-palette-primary-500);
  }

  :where([data-mui-color-scheme='dark']) & {
    border-color: var(--muidocs-palette-primaryDark-700);

    &:hover {
      background: var(--muidocs-palette-primaryDark-700);
      border-color: var(--muidocs-palette-primaryDark-500);
    }
  }
`;

const StyledMenuButton = styled('button')(buttonStyles);

const popperStyles = `
  z-index: 1000;
`;
const StyledPopup = styled('div')(popperStyles);

const listboxStyles = `
  margin: 8px 0;
  padding: 4px;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  border: 1px solid;
  border-color: var(--muidocs-palette-grey-200);
  background: var(--muidocs-palette-background-paper);
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.2);

  :where([data-mui-color-scheme='dark']) & {
    background: var(--muidocs-palette-primaryDark-800);
    border-color: var(--muidocs-palette-primaryDark-700);
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.8);
  }
`;
const StyledListbox = styled('ul')(listboxStyles);

const menuItemStyles = `
  display: flex;
  align-items: center;
  padding: 6px 12px;
  min-height: 24px;
  border-radius: 6px;
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
const StyledMenuItem = styled('li')(menuItemStyles);

const CSS = `.Mui-base.MuiMenuButton-root {${buttonStyles}}

.Mui-base.MuiMenu-root {${popperStyles}}

.Mui-base.MuiMenu-listbox {${listboxStyles}}

.Mui-base.MuiMenuItem-root {${menuItemStyles}}`;

export default function BaseMenuDemo({ styling }: { styling?: 'system' | 'tailwindcss' | 'css' }) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 144,
        gap: 2,
        py: 3,
      }}
    >
      {styling === 'css' && <GlobalStyles styles={CSS} />}
      {styling === 'tailwindcss' && (
        <Dropdown>
          <MenuButton
            className="min-h-[calc(1.5em + 22px)] inline-flex items-center gap-[0.5rem] rounded-[8px] border border-solid border-[--muidocs-palette-grey-200] bg-[--muidocs-palette-background-paper] p-[8px_12px_8px_6px] text-[0.875rem] leading-[1.5] transition-all [box-shadow:var(--shadow)] font-['IBM_Plex_Sans'] hover:bg-[--muidocs-palette-grey-50] ui-focus-visible:[outline:4px_solid_var(--focus-ring)] 
            dark:border-[--muidocs-palette-primaryDark-700] dark:hover:bg-[--muidocs-palette-primaryDark-800]"
          >
            <Person className="text-[--palette-primary]" />
            My account
          </MenuButton>
          <Menu
            slotProps={{
              root: { placement: 'bottom', className: 'z-[1000]' },
              listbox: {
                id: 'simple-menu',
                className:
                  'mx-0 my-[8px] p-[4px] flex flex-col rounded-[12px] border border-solid border-[--muidocs-palette-grey-200] bg-[--muidocs-palette-background-paper] shadow-[0px_4px_40px_rgba(62,80,96,0.1)] dark:border-[--muidocs-palette-primaryDark-700] dark:shadow-[0px_4px_40px_rgba(11,13,14,0.5)]',
              },
            }}
          >
            <MenuItem className="hover:color-[--muidocs-palette-text-primary] flex min-h-[24px] items-center gap-[4px] rounded-[6px] border border-solid border-transparent px-[12px] py-[6px] hover:cursor-default hover:border-[--muidocs-palette-grey-100] hover:bg-[--muidocs-palette-grey-50] ui-focus-visible:cursor-default ui-focus-visible:border-[--muidocs-palette-grey-100] ui-focus-visible:bg-[--muidocs-palette-grey-50] ui-focus-visible:outline-none">
              Profile
            </MenuItem>
            <MenuItem className="hover:color-[--muidocs-palette-text-primary] flex min-h-[24px] items-center gap-[4px] rounded-[6px] border border-solid border-transparent px-[12px] py-[6px] hover:cursor-default hover:border-[--muidocs-palette-grey-100] hover:bg-[--muidocs-palette-grey-50] ui-focus-visible:cursor-default ui-focus-visible:border-[--muidocs-palette-grey-100] ui-focus-visible:bg-[--muidocs-palette-grey-50] ui-focus-visible:outline-none">
              Language settings
            </MenuItem>
            <MenuItem className="hover:color-[--muidocs-palette-text-primary] flex min-h-[24px] items-center gap-[4px] rounded-[6px] border border-solid border-transparent px-[12px] py-[6px] hover:cursor-default hover:border-[--muidocs-palette-grey-100] hover:bg-[--muidocs-palette-grey-50] ui-focus-visible:cursor-default ui-focus-visible:border-[--muidocs-palette-grey-100] ui-focus-visible:bg-[--muidocs-palette-grey-50] ui-focus-visible:outline-none">
              Log out
            </MenuItem>
          </Menu>
        </Dropdown>
      )}
      {(styling === 'css' || styling === 'system') && (
        <Dropdown>
          <MenuButton
            className="Mui-base"
            slots={{ root: styling !== 'system' ? undefined : StyledMenuButton }}
          >
            <Person />
            My account
          </MenuButton>
          <Menu
            slots={{
              root: styling !== 'system' ? undefined : StyledPopup,
              listbox: styling !== 'system' ? undefined : StyledListbox,
            }}
            slotProps={{
              root: { placement: 'bottom', className: 'Mui-base' },
              listbox: { id: 'simple-menu', className: 'Mui-base' },
            }}
          >
            <MenuItem
              className="Mui-base"
              slots={{ root: styling !== 'system' ? undefined : StyledMenuItem }}
            >
              Profile
            </MenuItem>
            <MenuItem
              className="Mui-base"
              slots={{ root: styling !== 'system' ? undefined : StyledMenuItem }}
            >
              Language settings
            </MenuItem>
            <MenuItem
              className="Mui-base"
              slots={{ root: styling !== 'system' ? undefined : StyledMenuItem }}
            >
              Log out
            </MenuItem>
          </Menu>
        </Dropdown>
      )}
    </Box>
  );
}

BaseMenuDemo.getCode = (styling?: 'system' | 'tailwindcss' | 'css') => {
  if (styling === 'system') {
    return `import * as React from 'react';
import styled from '@mui/system/styled';
import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';

const StyledMenuButton = styled('button')\`${buttonStyles}\`;
const StyledListbox = styled('ul')\`${listboxStyles}\`;
const StyledMenuItem = styled('li')\`${menuItemStyles}\`;

function Demo() {
 return (
    <Dropdown>
      <MenuButton slots={{ root: StyledMenuButton }}>My account</MenuButton>
      <Menu
        slots={{
          listbox: StyledListbox,
        }}
      >
        <MenuItem slots={{ root: StyledMenuItem }}>Profile</MenuItem>
        <MenuItem slots={{ root: StyledMenuItem }}>Language settings</MenuItem>
        <MenuItem slots={{ root: StyledMenuItem }}>Log out</MenuItem>
      </Menu>
    </Dropdown>
  );
}
`;
  }
  if (styling === 'css') {
    return `import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';
import './styles.css';

function Demo() {
  const [buttonElement, setButtonElement] = React.useState(null);
  const updateAnchor = React.useCallback((node) => {
    setButtonElement(node);
  }, []);
  return (
    <Dropdown>
      <MenuButton>My account</MenuButton>
      <Menu>
        <MenuItem>Profile</MenuItem>
        <MenuItem>Language settings</MenuItem>
        <MenuItem>Log out</MenuItem>
      </Menu>
    </Dropdown>
  )
}

/* styles.css */
${CSS}
`;
  }
  if (styling === 'tailwindcss') {
    return `import { Dropdown } from '@mui/base/Dropdown';
import { MenuButton } from '@mui/base/MenuButton';
import { Menu } from '@mui/base/Menu';
import { MenuItem } from '@mui/base/MenuItem';

function Demo() {
  return (
    <Dropdown>
      <MenuButton
        className="min-h-[calc(1.5em + 22px)] inline-flex
          items-center gap-[0.5rem] rounded-[8px] border
          border-solid border-[--muidocs-palette-grey-200]
          bg-[--muidocs-palette-background-paper]
          p-[8px_12px_8px_6px] text-[0.875rem]
          leading-[1.5] transition-all font-['IBM_Plex_Sans']
          [box-shadow:var(--shadow)]
          hover:bg-[--muidocs-palette-grey-50]
          ui-focus-visible:[outline:3px_solid_var(--focus-ring)]
          dark:border-[--muidocs-palette-primaryDark-700]
          dark:hover:bg-[--muidocs-palette-primaryDark-800]"
      >
        <Person className="text-[--palette-primary]" />
        My account
      </ButtonUnstyled>
      <Menu
        slotProps={{
          root: { placement: 'top', className: 'z-[1000]' },
          listbox: {
            id: 'simple-menu',
            className: \`mx-0 my-[8px] p-[4px] flex flex-col rounded-[8px]
              border border-solid border-[--muidocs-palette-grey-200]
              bg-[--muidocs-palette-background-paper]
              shadow-[0px_4px_40px_rgba(62,80,96,0.1)]
              dark:border-[--muidocs-palette-primaryDark-700]
              dark:shadow-[0px_4px_40px_rgba(11,13,14,0.5)]\`,
          },
        }}
      >
        <MenuItem
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
        >
          Profile
        </MenuItem>
        <MenuItem
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
        >
          Language settings
        </MenuItem>
        <MenuItem
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
        >
          Log out
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}
`;
  }
  return ``;
};
