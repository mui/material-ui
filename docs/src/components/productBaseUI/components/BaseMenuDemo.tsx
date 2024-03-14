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
  background: var(--muidocs-palette-background-default);
  box-shadow: var(--outlined-btn-shadow);
  border: 1px solid;
  border-color: var(--muidocs-palette-grey-200);
  color: var(--muidocs-palette-text-primary);
  transition: all 120ms ease;
  outline-color: transparent;
  user-select: none;

  & svg {
    color: var(--primary);
  }

  &:hover {
    background: var(--muidocs-palette-grey-50);
    border-color: var(--muidocs-palette-grey-300);
    box-shadow: none;
  }

  &:focus-visible {
    outline: 4px solid var(--focus-ring);
    border-color: var(--primary);
  }

  :where([data-mui-color-scheme='dark']) & {
    border-color: var(--muidocs-palette-primaryDark-700);

    &:hover {
      background: var(--muidocs-palette-primaryDark-800);
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
  background: var(--muidocs-palette-background-default);
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.2);

  :where([data-mui-color-scheme='dark']) & {
    border-color: var(--muidocs-palette-primaryDark-700);
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.8);
  }
`;
const StyledListbox = styled('ul')(listboxStyles);

const menuItemStyles = `
  display: flex;
  align-items: center;
  padding: 6px 8px;
  min-height: 24px;
  font-weight: 500;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 6px;
  border: 1px solid transparent;
  gap: 4px;
  
  &:hover,
  &.base--focusVisible {
    cursor: default;
    outline: none;
    color: var(--muidocs-palette-text-primary);
    background: var(--muidocs-palette-grey-50);
    border-color: var(--muidocs-palette-grey-100);
  }

  :where([data-mui-color-scheme='dark']) & {
    color: var(--muidocs-palette-grey-300);
    &:hover,
    &.base--focusVisible {
      color: var(--muidocs-palette-text-primary);
      background: var(--muidocs-palette-primaryDark-700);
      border-color: var(--muidocs-palette-primaryDark-500);
    }
  }
`;
const StyledMenuItem = styled('li')(menuItemStyles);

const CSS = `.Mui-base.base-MenuButton-root {${buttonStyles}}

.Mui-base.base-Menu-root {${popperStyles}}

.Mui-base.base-Menu-listbox {${listboxStyles}}

.Mui-base.base-MenuItem-root {${menuItemStyles}}`;

const menuItemStylesTailwind = `flex min-h-[24px] items-center gap-[4px] rounded-[6px] border border-solid border-transparent px-[8px] py-[6px] font-medium text-sm leading-[1.5] hover:cursor-default hover:border-[--muidocs-palette-grey-100] hover:color-[--muidocs-palette-text-primary]  hover:bg-[--muidocs-palette-grey-50] dark:hover:bg-[--muidocs-palette-primaryDark-700] dark:hover:border-[--muidocs-palette-primaryDark-500] ui-focus-visible:cursor-default ui-focus-visible:border-[--muidocs-palette-grey-100] ui-focus-visible:bg-[--muidocs-palette-grey-50] ui-focus-visible:outline-none`;

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
            className="min-h-[calc(1.5em + 22px)] inline-flex items-center gap-[0.5rem] rounded-[8px] font-medium border border-solid border-[--muidocs-palette-grey-200] bg-[--muidocs-palette-background-default] p-[8px_12px_8px_6px] text-[0.875rem] leading-[1.5] transition-all [box-shadow:var(--outlined-btn-shadow)] font-['IBM_Plex_Sans'] hover:bg-[--muidocs-palette-grey-50] hover:border-[--muidocs-palette-grey-300] 
            ui-focus-visible:[outline:4px_solid_var(--focus-ring)] ui-focus-visible:border-[--primary] 
            dark:border-[--muidocs-palette-primaryDark-700] dark:hover:bg-[--muidocs-palette-primaryDark-800] 
            dark:hover:border-[--muidocs-palette-primaryDark-600] select-none"
          >
            <Person className="text-[--primary]" />
            My account
          </MenuButton>
          <Menu
            slotProps={{
              root: { placement: 'bottom', className: 'z-[1000]' },
              listbox: {
                id: 'simple-menu',
                className:
                  'mx-0 my-[8px] p-[4px] flex flex-col rounded-[12px] border border-solid border-[--muidocs-palette-grey-200] bg-[--muidocs-palette-background-default] shadow-[0px_4px_40px_rgba(62,80,96,0.1)] dark:border-[--muidocs-palette-primaryDark-700] dark:shadow-[0px_4px_40px_rgba(11,13,14,0.5)]',
              },
            }}
          >
            <MenuItem className={menuItemStylesTailwind}>Profile</MenuItem>
            <MenuItem className={menuItemStylesTailwind}>Language settings</MenuItem>
            <MenuItem className={menuItemStylesTailwind}>Log out</MenuItem>
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
        className="min-h-[calc(1.5em + 22px)] inline-flex items-center gap-[0.5rem] rounded-[8px] font-medium border border-solid border-[--muidocs-palette-grey-200] bg-[--muidocs-palette-background-default] p-[8px_12px_8px_6px] text-[0.875rem] leading-[1.5] transition-all [box-shadow:var(--outlined-btn-shadow)] font-['IBM_Plex_Sans'] 
        hover:bg-[--muidocs-palette-grey-50] hover:border-[--muidocs-palette-grey-300] 
        ui-focus-visible:[outline:4px_solid_var(--focus-ring)] ui-focus-visible:border-[--primary] 
        dark:border-[--muidocs-palette-primaryDark-700] dark:hover:bg-[--muidocs-palette-primaryDark-800] 
        dark:hover:border-[--muidocs-palette-primaryDark-600] select-none"
      >
        <Person className="text-[--primary]" />
        My account
      </ButtonUnstyled>
      <Menu
        slotProps={{
          root: { placement: 'top', className: 'z-[1000]' },
          listbox: {
            id: 'simple-menu',
            className: \`mx-0 my-[8px] p-[4px] flex flex-col rounded-[8px]
              border border-solid border-[--muidocs-palette-grey-200]
              bg-[--muidocs-palette-background-default]
              shadow-[0px_4px_40px_rgba(62,80,96,0.1)]
              dark:border-[--muidocs-palette-primaryDark-700]
              dark:shadow-[0px_4px_40px_rgba(11,13,14,0.5)]\`,
          },
        }}
      >
        <MenuItem
          className="flex min-h-[24px] items-center gap-[4px] rounded-[6px] 
          border border-solid border-transparent px-[8px] py-[6px] font-medium text-sm leading-[1.5]
          hover:color-[--muidocs-palette-text-primary] hover:cursor-default hover:border-[--muidocs-palette-grey-100] 
          hover:bg-[--muidocs-palette-grey-50] dark:hover:bg-[--muidocs-palette-primaryDark-700] 
          dark:hover:border-[--muidocs-palette-primaryDark-500] ui-focus-visible:cursor-default 
          ui-focus-visible:border-[--muidocs-palette-grey-100] 
          ui-focus-visible:bg-[--muidocs-palette-grey-50] ui-focus-visible:outline-none"
        >
          Profile
        </MenuItem>
        <MenuItem
          className="flex min-h-[24px] items-center gap-[4px] rounded-[6px] 
          border border-solid border-transparent px-[8px] py-[6px] font-medium text-sm leading-[1.5]
          hover:color-[--muidocs-palette-text-primary] hover:cursor-default hover:border-[--muidocs-palette-grey-100] 
          hover:bg-[--muidocs-palette-grey-50] dark:hover:bg-[--muidocs-palette-primaryDark-700] 
          dark:hover:border-[--muidocs-palette-primaryDark-500] ui-focus-visible:cursor-default 
          ui-focus-visible:border-[--muidocs-palette-grey-100] 
          ui-focus-visible:bg-[--muidocs-palette-grey-50] ui-focus-visible:outline-none"
        >
          Language settings
        </MenuItem>
        <MenuItem
          className="flex min-h-[24px] items-center gap-[4px] rounded-[6px] 
          border border-solid border-transparent px-[8px] py-[6px] font-medium text-sm leading-[1.5]
          hover:color-[--muidocs-palette-text-primary] hover:cursor-default hover:border-[--muidocs-palette-grey-100] 
          hover:bg-[--muidocs-palette-grey-50] dark:hover:bg-[--muidocs-palette-primaryDark-700] 
          dark:hover:border-[--muidocs-palette-primaryDark-500] ui-focus-visible:cursor-default 
          ui-focus-visible:border-[--muidocs-palette-grey-100] 
          ui-focus-visible:bg-[--muidocs-palette-grey-50] ui-focus-visible:outline-none"
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
