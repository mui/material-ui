import * as React from 'react';
import Menu from '@mui/base/Menu';
import MenuItem from '@mui/base/MenuItem';
import Button from '@mui/base/Button';
import { useTheme } from '@mui/system';
import { ListActionTypes } from '@mui/base/useList';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function UnstyledMenuSimple() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

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
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <Button
        type="button"
        className="text-sm box-border rounded-xl py-2.5 px-3.5 leading-normal bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 transition-all hover:bg-slate-50 hover:dark:bg-slate-800 hover:border-slate-300 hover:dark:border-slate-600  focus-visible:border-purple-400 focus-visible:outline-0 focus-visible:shadow-outline-purple"
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
        actions={menuActions}
        open={isOpen}
        onOpenChange={(open) => {
          setOpen(open);
        }}
        anchorEl={buttonElement}
        slotProps={{
          root: { className: `${isDarkMode ? 'dark' : ''} z-10` },
          listbox: {
            id: 'simple-menu',
            className:
              'text-sm box-border p-1.5 my-3 mx-0 rounded-xl overflow-auto outline-0 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 shadow-md min-w-listbox',
          },
        }}
      >
        <MenuItem
          className="list-none p-2 rounded-lg cursor-default select-none last-of-type:border-b-0 focus-visible:shadow-outline-purple focus-visible:outline-0 focus-visible:bg-slate-100 focus-visible:dark:bg-slate-800 focus-visible-text-slate-900 focus-visible:dark:text-slate-300 disabled:text-slate-400 disabled:dark:text-slate-700 disabled:hover:text-slate-400 disabled:hover:dark:text-slate-700 hover:bg-slate-100 hover:dark:bg-slate-800 hover:text-slate-900 hover:dark:text-slate-300"
          onClick={createHandleMenuClick('Profile')}
        >
          Profile
        </MenuItem>
        <MenuItem
          className="list-none p-2 rounded-lg cursor-default select-none last-of-type:border-b-0 focus-visible:shadow-outline-purple focus-visible:outline-0 focus-visible:bg-slate-100 focus-visible:dark:bg-slate-800 focus-visible-text-slate-900 focus-visible:dark:text-slate-300 disabled:text-slate-400 disabled:dark:text-slate-700 disabled:hover:text-slate-400 disabled:hover:dark:text-slate-700 hover:bg-slate-100 hover:dark:bg-slate-800 hover:text-slate-900 hover:dark:text-slate-300"
          onClick={createHandleMenuClick('My account')}
        >
          My account
        </MenuItem>
        <MenuItem
          className="list-none p-2 rounded-lg cursor-default select-none last-of-type:border-b-0 focus-visible:shadow-outline-purple focus-visible:outline-0 focus-visible:bg-slate-100 focus-visible:dark:bg-slate-800 focus-visible-text-slate-900 focus-visible:dark:text-slate-300 disabled:text-slate-400 disabled:dark:text-slate-700 disabled:hover:text-slate-400 disabled:hover:dark:text-slate-700 hover:bg-slate-100 hover:dark:bg-slate-800 hover:text-slate-900 hover:dark:text-slate-300"
          onClick={createHandleMenuClick('Log out')}
        >
          Log out
        </MenuItem>
      </Menu>
    </div>
  );
}
