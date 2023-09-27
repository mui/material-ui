import * as React from 'react';
import { Menu } from '@mui/base/Menu';
import { MenuItem, menuItemClasses } from '@mui/base/MenuItem';
import { MenuButton } from '@mui/base/MenuButton';
import { Dropdown } from '@mui/base/Dropdown';
import { useTheme } from '@mui/system';

export default function MenuIntroduction() {
  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (
    <Dropdown>
      <MenuButton className="TriggerButtonIntroduction">My account</MenuButton>

      <Menu
        className="CustomMenuIntroduction"
        slotProps={{
          listbox: { className: 'CustomMenuIntroduction--listbox' },
        }}
      >
        <MenuItem
          className="CustomMenuIntroduction--item"
          onClick={createHandleMenuClick('Profile')}
        >
          Profile
        </MenuItem>
        <MenuItem
          className="CustomMenuIntroduction--item"
          onClick={createHandleMenuClick('Language settings')}
        >
          Language settings
        </MenuItem>
        <MenuItem
          className="CustomMenuIntroduction--item"
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
    .CustomMenuIntroduction--listbox {
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
      box-shadow: 0px 4px 30px ${isDarkMode ? grey[900] : grey[200]};
    }

    .CustomMenuIntroduction--item {
      list-style: none;
      padding: 8px;
      border-radius: 8px;
      cursor: default;
      user-select: none;
    }

    .CustomMenuIntroduction--item:last-of-type {
      border-bottom: none;
    }

    .CustomMenuIntroduction--item.${menuItemClasses.focusVisible} {
      outline: 3px solid ${isDarkMode ? cyan[600] : cyan[200]};
      background-color: ${isDarkMode ? grey[800] : grey[100]};
      color: ${isDarkMode ? grey[300] : grey[900]};
    }

    .CustomMenuIntroduction--item.${menuItemClasses.disabled} {
      color: ${isDarkMode ? grey[700] : grey[400]};
    }

    .CustomMenuIntroduction--item:hover:not(.${menuItemClasses.disabled}) {
      background-color: ${isDarkMode ? cyan[800] : cyan[50]};
      color: ${isDarkMode ? grey[300] : grey[900]};
    }

    .TriggerButtonIntroduction {
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      font-weight: 600;
      box-sizing: border-box;
      min-height: calc(1.5em + 22px);
      border-radius: 12px;
      padding: 8px 14px;
      line-height: 1.5;
      background: ${isDarkMode ? grey[900] : '#fff'};
      cursor: pointer;
      border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
      color: ${isDarkMode ? grey[300] : grey[900]};
    
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 120ms;
    }

    .TriggerButtonIntroduction:hover {
      background: ${isDarkMode ? grey[800] : grey[50]};
      border-color: ${isDarkMode ? grey[600] : grey[300]};
    }
  
    .TriggerButtonIntroduction:focus-visible {
      border-color: ${cyan[400]};
      outline: 3px solid ${isDarkMode ? cyan[500] : cyan[200]};
    }

    .CustomMenuIntroduction {
      z-index: 1;
    }
    `}</style>
  );
}
