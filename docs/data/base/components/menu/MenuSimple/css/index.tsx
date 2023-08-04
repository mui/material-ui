import * as React from 'react';
import { Menu } from '@mui/base/Menu';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { MenuButton } from '@mui/base/MenuButton';
import { Dropdown } from '@mui/base/Dropdown';
import { useTheme } from '@mui/system';

export default function MenuSimple() {
  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (
    <Dropdown>
      <MenuButton className="TriggerButton">Dashboard</MenuButton>

      <Menu
        className="CustomMenu"
        slotProps={{
          listbox: { className: 'CustomMenu--listbox' },
        }}
      >
        <MenuItem
          className="CustomMenu--item"
          onClick={createHandleMenuClick('Profile')}
        >
          Profile
        </MenuItem>
        <MenuItem
          className="CustomMenu--item"
          onClick={createHandleMenuClick('My account')}
        >
          My account
        </MenuItem>
        <MenuItem
          className="CustomMenu--item"
          onClick={createHandleMenuClick('Log out')}
        >
          Log out
        </MenuItem>
      </Menu>
      <Styles />
    </Dropdown>
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
  50: '#f6f8fa',
  100: '#eaeef2',
  200: '#d0d7de',
  300: '#afb8c1',
  400: '#8c959f',
  500: '#6e7781',
  600: '#57606a',
  700: '#424a53',
  800: '#32383f',
  900: '#24292f',
};

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

function Styles() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  return (
    <style>{`
    .CustomMenu--listbox {
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      box-sizing: border-box;
      padding: 6px;
      margin: 12px 0;
      min-width: 200px;
      border-radius: 12px;
      overflow: auto;
      outline: 0px;
      background: ${isDarkMode ? grey[900] : '#fff'};
      border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
      color: ${isDarkMode ? grey[300] : grey[900]};
      box-shadow: 0px 4px 6px ${
        isDarkMode ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
      };
    }

    .CustomMenu--item {
      list-style: none;
      padding: 8px;
      border-radius: 8px;
      cursor: default;
      user-select: none;s
    }

    .CustomMenu--item:last-of-type {
      border-bottom: none;
    }

    .CustomMenu--item.${menuItemClasses.focusVisible} {
      outline: 3px solid ${isDarkMode ? cyan[600] : cyan[200]};
      background-color: ${isDarkMode ? grey[800] : grey[100]};
      color: ${isDarkMode ? grey[300] : grey[900]};
    }

    .CustomMenu--item.${menuItemClasses.disabled} {
      color: ${isDarkMode ? grey[700] : grey[400]};
    }

    .CustomMenu--item:hover:not(.${menuItemClasses.disabled}) {
      background-color: ${isDarkMode ? cyan[700] : cyan[50]};
      color: ${isDarkMode ? grey[300] : grey[900]};
    }

    .TriggerButton {
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      box-sizing: border-box;
      border-radius: 8px;
      padding: 8px 16px;
      line-height: 1.5;
      background: transparent;
      cursor: pointer;
      border: 1px solid ${isDarkMode ? grey[800] : grey[200]};
      color: ${isDarkMode ? cyan[300] : cyan[400]};
    
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 120ms;
    }

    .TriggerButton:hover {
      background: ${isDarkMode ? grey[800] : grey[50]};
      border-color: ${isDarkMode ? grey[600] : grey[300]};
    }
  
    .TriggerButton:focus-visible {
      border-color: ${cyan[400]};
      outline: 3px solid ${isDarkMode ? cyan[500] : cyan[200]};
    }

    .CustomMenu {
      z-index: 1;
    }
    `}</style>
  );
}
