import * as React from 'react';
import Menu from '@mui/base/Menu';
import MenuItem, { menuItemClasses } from '@mui/base/MenuItem';
import Button, { buttonClasses } from '@mui/base/Button';
import { useTheme } from '@mui/system';
import { ListActionTypes } from '@mui/base/useList';

export default function UnstyledMenuSimple() {
  const [buttonElement, setButtonElement] = React.useState(null);
  const [isOpen, setOpen] = React.useState(false);
  const menuActions = React.useRef(null);
  const preventReopen = React.useRef(false);

  const updateAnchor = React.useCallback((node) => {
    setButtonElement(node);
  }, []);

  const handleButtonClick = (event) => {
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

  const handleButtonKeyDown = (event) => {
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

  const createHandleMenuClick = (menuItem) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
      setOpen(false);
      buttonElement?.focus();
    };
  };

  return (
    <div>
      <Button
        className="TriggerButton"
        type="button"
        onClick={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
        onMouseDown={handleButtonMouseDown}
        ref={updateAnchor}
        aria-controls={isOpen ? 'simple-menu' : undefined}
        aria-expanded={isOpen || undefined}
        aria-haspopup="menu"
      >
        Dashboard
      </Button>

      <Menu
        className="CustomMenu"
        actions={menuActions}
        open={isOpen}
        onOpenChange={(open) => {
          setOpen(open);
        }}
        anchorEl={buttonElement}
        slotProps={{
          listbox: { id: 'simple-menu', className: 'CustomMenu--listbox' },
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
    </div>
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
      box-shadow: 0px 2px 16px ${isDarkMode ? grey[900] : grey[200]}; 
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
      background-color: ${isDarkMode ? grey[800] : grey[100]};
      color: ${isDarkMode ? grey[300] : grey[900]};
    }

    .TriggerButton {
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      box-sizing: border-box;
      min-height: calc(1.5em + 22px);
      border-radius: 12px;
      padding: 8px 14px;
      line-height: 1.5;
      background: ${isDarkMode ? grey[900] : '#fff'};
      border: 1px solid ${isDarkMode ? grey[700] : grey[200]};
      color: ${isDarkMode ? grey[300] : grey[900]};
    
      transition-property: all;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 120ms;
    }

    .TriggerButton:hover {
      background: ${isDarkMode ? grey[800] : grey[50]};
      border-color: ${isDarkMode ? grey[600] : grey[300]};
    }
  
    .TriggerButton.${buttonClasses.focusVisible} {
      border-color: ${cyan[400]};
      outline: 3px solid ${isDarkMode ? cyan[500] : cyan[200]};
    }

    .CustomMenu {
      z-index: 1;
    }
    `}</style>
  );
}
