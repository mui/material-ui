import * as React from 'react';
import clsx from 'clsx';
import { useMenu, MenuProvider } from '@mui/base/useMenu';
import { useMenuItem } from '@mui/base/useMenuItem';
import { Popper } from '@mui/base/Popper';
import { GlobalStyles } from '@mui/system';
import { useDropdown, DropdownContext } from '@mui/base/useDropdown';
import { useMenuButton } from '@mui/base/useMenuButton';

const Menu = React.forwardRef(function Menu(
  props: React.ComponentPropsWithoutRef<'ul'>,
  ref: React.Ref<HTMLUListElement>,
) {
  const { children, ...other } = props;

  const { open, triggerElement, contextValue, getListboxProps } = useMenu({
    listboxRef: ref,
  });

  return (
    <Popper open={open} anchorEl={triggerElement}>
      <ul className="menu-root" {...other} {...getListboxProps()}>
        <MenuProvider value={contextValue}>{children}</MenuProvider>
      </ul>
    </Popper>
  );
});

const MenuItem = React.forwardRef(function MenuItem(
  props: React.ComponentPropsWithoutRef<'li'>,
  ref: React.Ref<any>,
) {
  const { children, onClick, ...other } = props;

  const { getRootProps, disabled, focusVisible } = useMenuItem({ rootRef: ref });

  const classes = {
    'focus-visible': focusVisible,
    'menu-item': true,
    disabled,
  };

  return (
    <li
      {...other}
      {...getRootProps({ onClick: onClick ?? (() => {}) })}
      className={clsx(classes)}
    >
      {children}
    </li>
  );
});

const MenuButton = React.forwardRef(function MenuButton(
  props: React.PropsWithChildren<{}>,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>,
) {
  const { getRootProps: getButtonProps } = useMenuButton({ rootRef: forwardedRef });

  return (
    <button type="button" {...props} {...getButtonProps()} className="button" />
  );
});

export default function UseMenu() {
  const { contextValue: dropdownContextValue } = useDropdown();

  const createHandleMenuClick = (menuItem: string) => {
    return () => {
      console.log(`Clicked on ${menuItem}`);
    };
  };

  return (
    <React.Fragment>
      <GlobalStyles styles={styles} />
      <DropdownContext.Provider value={dropdownContextValue}>
        <MenuButton>Theme</MenuButton>
        <Menu id="hooks-menu">
          <MenuItem onClick={createHandleMenuClick('OS Default')}>
            OS default
          </MenuItem>
          <MenuItem onClick={createHandleMenuClick('Light')}>Light</MenuItem>
          <MenuItem onClick={createHandleMenuClick('Dark')}>Dark</MenuItem>
        </Menu>
      </DropdownContext.Provider>
    </React.Fragment>
  );
}

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

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

const styles = `
  .menu-root {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 5px;
    margin: 10px 0;
    min-width: 200px;
    background: #fff;
    border: 1px solid ${grey[200]};
    border-radius: 0.75em;
    color: ${grey[900]};
    overflow: auto;
    outline: 0px;
    box-shadow: 0px 2px 16px ${grey[200]};
  }

  .mode-dark .menu-root {
    background: ${grey[900]};
    border-color: ${grey[700]};
    color: ${grey[300]};
    box-shadow: 0px 2px 16px ${grey[900]};
  }

  .menu-item {
    list-style: none;
    padding: 8px;
    border-radius: 0.45em;
    cursor: default;
    user-select: none;
  }

  .menu-item:last-of-type {
    border-bottom: none;
  }

  .menu-item.focus-visible {
    background-color: ${grey[100]};
    color: ${grey[900]};
    outline: 0;
  }

  .mode-dark .menu-item.focus-visible {
    background-color: ${grey[800]};
    color: ${grey[300]};
  }

  .menu-item.disabled {
    color: ${grey[400]};
  }

  .mode-dark .menu-item.disabled {
    color: ${grey[700]};
  }

  .menu-item:hover:not(.disabled) {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }

  .mode-dark .menu-item:hover:not(.disabled){
    background-color: ${grey[800]};
    color: ${grey[300]};
  }

  .button {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    border-radius: 12px;
    padding: 8px 14px;
    line-height: 1.5;
    background: #fff;
    border: 1px solid ${grey[200]};
    color: ${grey[900]};
    cursor: pointer;
  
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 120ms;
  
    &:hover {
      background: ${grey[50]};
      border-color: ${grey[300]};
    }
  
    &:focus-visible {
      border-color: ${blue[400]};
      outline: 3px solid ${blue[200]};
    }
  }

  .mode-dark .button {
    background: ${grey[900]};
    border: 1px solid ${grey[700]};
    color: ${grey[300]};

    &:hover {
      background: ${grey[800]};
      border-color: ${grey[600]};
    }

    &:focus {
      outline: 3px solid ${blue[500]}
    }
  }
`;
