import * as React from 'react';
import clsx from 'clsx';
import { Menu as BaseMenu, MenuProps } from '@mui/base/Menu';
import { MenuButton as BaseMenuButton, MenuButtonProps } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, MenuItemProps } from '@mui/base/MenuItem';
import { Dropdown } from '@mui/base/Dropdown';
import { useTheme } from '@mui/system';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function MenuSimple() {
  // Replace this with your app logic for determining dark mode
  const isDarkMode = useIsDarkMode();

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (
    <div className={`${isDarkMode ? 'dark' : ''}`}>
      <Dropdown>
        <MenuButton>Dashboard</MenuButton>
        <Menu>
          <MenuItem onClick={createHandleMenuClick('Profile')}>Profile</MenuItem>
          <MenuItem onClick={createHandleMenuClick('My account')}>
            My account
          </MenuItem>
          <MenuItem onClick={createHandleMenuClick('Log out')}>Log out</MenuItem>
        </Menu>
      </Dropdown>
    </div>
  );
}

const resolveSlotProps = (fn: any, args: any) =>
  typeof fn === 'function' ? fn(args) : fn;

const Menu = React.forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
  // Replace this with your app logic for determining dark modes
  const isDarkMode = useIsDarkMode();

  return (
    <BaseMenu
      ref={ref}
      {...props}
      slotProps={{
        ...props.slotProps,
        root: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.root,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              `${isDarkMode ? 'dark' : ''} z-10`,
              resolvedSlotProps?.className,
            ),
          };
        },
        listbox: (ownerState) => {
          const resolvedSlotProps = resolveSlotProps(
            props.slotProps?.listbox,
            ownerState,
          );
          return {
            ...resolvedSlotProps,
            className: clsx(
              'text-sm box-border font-sans p-1.5 my-3 mx-0 rounded-xl overflow-auto outline-0 bg-white dark:bg-slate-900 border border-solid border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-300 min-w-listbox shadow-md dark:shadow-slate-900',
              resolvedSlotProps?.className,
            ),
          };
        },
      }}
    />
  );
});

const MenuButton = React.forwardRef<HTMLButtonElement, MenuButtonProps>(
  (props, ref) => {
    const { className, ...other } = props;
    return (
      <BaseMenuButton
        ref={ref}
        className={clsx(
          'cursor-pointer text-sm font-sans box-border rounded-lg font-semibold px-4 py-2 leading-normal bg-transparent border border-solid border-slate-300 dark:border-slate-700 text-purple-600 dark:text-purple-300 hover:bg-slate-50 hover:dark:bg-slate-800 hover:border-slate-400 dark:hover:border-slate-600 focus-visible:border-purple-500 focus-visible:hover:border-purple-500 focus-visible:dark:hover:border-purple-500 focus-visible:outline-0 focus-visible:shadow-outline-purple',
          className,
        )}
        {...other}
      />
    );
  },
);

const MenuItem = React.forwardRef<HTMLLIElement, MenuItemProps>((props, ref) => {
  const { className, ...other } = props;
  return (
    <BaseMenuItem
      ref={ref}
      className={clsx(
        'list-none p-2 rounded-lg cursor-default select-none last-of-type:border-b-0 focus-visible:shadow-outline-purple focus-visible:outline-0 focus-visible:bg-slate-100 focus-visible:dark:bg-slate-800 focus-visible-text-slate-900 focus-visible:dark:text-slate-300 disabled:text-slate-400 disabled:dark:text-slate-700 disabled:hover:text-slate-400 disabled:hover:dark:text-slate-700 hover:bg-purple-50 hover:dark:bg-purple-950 hover:text-slate-900 hover:dark:text-slate-300',
        className,
      )}
      {...other}
    />
  );
});
