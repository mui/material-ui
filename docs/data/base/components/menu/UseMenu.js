import * as React from 'react';
import PropTypes from 'prop-types';
import { useMenu, MenuUnstyledContext } from '@mui/base/MenuUnstyled';
import { useMenuItem } from '@mui/base/MenuItemUnstyled';
import { GlobalStyles } from '@mui/system';
import clsx from 'clsx';

const blue = {
  100: '#DAECFF',
  200: '#99CCF3',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  900: '#003A75',
};

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
    margin: 10px 0;
    min-width: 200px;
    background: #fff;
    border: 1px solid ${grey[300]};
    border-radius: 0.75em;
    color: ${grey[900]};
    overflow: auto;
    outline: 0px;
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
  }

  .menu-item:last-of-type {
    border-bottom: none;
  }

  .menu-item.highlighted {
    background-color: ${grey[100]};
    color: ${grey[900]};
  }

  .mode-dark .menu-item.highlighted {
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
    background-color: ${grey[100]};
    color: ${grey[900]};
  }
`;

const Menu = React.forwardRef(function Menu(props, ref) {
  const { children, ...other } = props;

  const { registerItem, unregisterItem, getRootProps, getItemProps, getItemState } =
    useMenu({
      listboxRef: ref,
    });

  const contextValue = {
    registerItem,
    unregisterItem,
    getItemState,
    getItemProps,
  };

  return (
    <ul className="menu-root" {...other} {...getRootProps()}>
      <MenuUnstyledContext.Provider value={contextValue}>
        {children}
      </MenuUnstyledContext.Provider>
    </ul>
  );
});

Menu.propTypes = {
  children: PropTypes.node,
};

const MenuItem = React.forwardRef(function MenuItem(props, ref) {
  const { children, ...other } = props;

  const { getRootProps, itemState } = useMenuItem({
    component: 'li',
    ref,
  });

  const classes = {
    'menu-item': true,
    highlighted: itemState?.highlighted,
    disabled: itemState?.disabled,
  };

  return (
    <li className={clsx(classes)} {...other} {...getRootProps()}>
      {children}
    </li>
  );
});

MenuItem.propTypes = {
  children: PropTypes.node,
};

export default function UseMenu() {
  return (
    <React.Fragment>
      <GlobalStyles styles={styles} />
      <Menu>
        <MenuItem>Cut</MenuItem>
        <MenuItem>Copy</MenuItem>
        <MenuItem>Paste</MenuItem>
      </Menu>
    </React.Fragment>
  );
}
