import { useMenuItem } from '@mui/base/MenuItemUnstyled';
import {
  MenuUnstyledContext,
  MenuUnstyledContextType,
  useMenu,
} from '@mui/base/MenuUnstyled';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import { GlobalStyles } from '@mui/system';
import clsx from 'clsx';
import * as React from 'react';

const grey = {
  100: '#E7EBF0',
  200: '#E0E3E7',
  300: '#CDD2D7',
  400: '#B2BAC2',
  500: '#A0AAB4',
  600: '#6F7E8C',
  700: '#3E5060',
  800: '#2D3843',
  900: '#1A2027',
};

const styles = `
    .menu-root {
      font-family: IBM Plex Sans, sans-serif;
      font-size: 0.875rem;
      box-sizing: border-box;
      padding: 5px;
      margin: 60px 100px 60px 0px;
      min-width: 150px;
      background: #fff;
      border: 1px solid ${grey[300]};
      border-radius: 0.75em;
      color: ${grey[900]};
      overflow: auto;
      outline: 0px;
      position: absolute;
    }
  
    .mode-dark .menu-root {
      background: ${grey[900]};
      border-color: ${grey[800]};
      color: ${grey[300]};
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
  `;

const Menu = React.forwardRef(function Menu(
  props: React.ComponentPropsWithoutRef<'ul'>,
  ref: React.Ref<HTMLUListElement>,
) {
  const { children, ...other } = props;

  const {
    registerItem,
    unregisterItem,
    getListboxProps,
    getItemProps,
    getItemState,
  } = useMenu({
    listboxRef: ref,
  });

  const contextValue: MenuUnstyledContextType = {
    registerItem,
    unregisterItem,
    getItemState,
    getItemProps,
    open: true,
  };

  return (
    <ul className="menu-root" {...other} {...getListboxProps()}>
      <MenuUnstyledContext.Provider value={contextValue}>
        {children}
      </MenuUnstyledContext.Provider>
    </ul>
  );
});

const MenuItem = React.forwardRef(function MenuItem(
  props: React.ComponentPropsWithoutRef<'li'>,
  ref: React.Ref<any>,
) {
  const { children, ...other } = props;

  const { getRootProps, disabled, focusVisible } = useMenuItem({ ref });

  const classes = {
    'focus-visible': focusVisible,
    'menu-item': true,
    disabled,
  };

  return (
    <li className={clsx(classes)} {...other} {...getRootProps()}>
      {children}
    </li>
  );
});

export default function BreadcrumbsWithMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <GlobalStyles styles={styles} />
      {isMenuOpen ? (
        <Menu>
          <MenuItem>Breadcrumb 2</MenuItem>
          <MenuItem>Breadcrumb 3</MenuItem>
          <MenuItem>Breadcrumb 4</MenuItem>
        </Menu>
      ) : null}
      <Breadcrumbs>
        <Link underline="hover" color="primary" href="/" fontSize="inherit">
          Breadcrumb 1
        </Link>
        <Button
          size="sm"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          variant="plain"
          color="primary"
        >
          •••
        </Button>
        <Link underline="hover" color="primary" href="/" fontSize="inherit">
          Breadcrumb 5
        </Link>
        <Link underline="hover" color="primary" href="/" fontSize="inherit">
          Breadcrumb 6
        </Link>
      </Breadcrumbs>
    </React.Fragment>
  );
}
