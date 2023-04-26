import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useMenu, { MenuProvider } from '@mui/base/useMenu';
import useMenuItem from '@mui/base/useMenuItem';
import Popper from '@mui/base/Popper';
import { GlobalStyles } from '@mui/system';

const Menu = React.forwardRef(function Menu(props, ref) {
  const { children, onOpenChange, open, ...other } = props;

  const { contextValue, getListboxProps } = useMenu({
    listboxRef: ref,
    onOpenChange,
    open,
  });

  return (
    <ul className="menu-root" {...other} {...getListboxProps()}>
      <MenuProvider value={contextValue}>{children}</MenuProvider>
    </ul>
  );
});

Menu.propTypes = {
  children: PropTypes.node,
  onOpenChange: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

const MenuItem = React.forwardRef(function MenuItem(props, ref) {
  const { children, onClick, ...other } = props;

  const { getRootProps, disabled, focusVisible } = useMenuItem({ ref });

  const classes = {
    'focus-visible': focusVisible,
    'menu-item': true,
    disabled,
  };

  return (
    <li
      className={clsx(classes)}
      {...other}
      {...getRootProps({ onClick: onClick ?? (() => {}) })}
    >
      {children}
    </li>
  );
});

MenuItem.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
};

export default function UseMenu() {
  const [buttonElement, setButtonElement] = React.useState(null);

  const [isOpen, setOpen] = React.useState(false);
  const preventReopen = React.useRef(false);

  const updateAnchor = React.useCallback((node) => {
    setButtonElement(node);
  }, []);

  const handleOnClick = (event) => {
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
    <React.Fragment>
      <GlobalStyles styles={styles} />
      <button
        type="button"
        className="button"
        onClick={handleOnClick}
        onMouseDown={handleButtonMouseDown}
        onKeyDown={handleButtonKeyDown}
        ref={updateAnchor}
        aria-controls="hooks-menu"
        aria-expanded={isOpen || undefined}
        aria-haspopup="menu"
      >
        Commands
      </button>
      <Popper open={isOpen} anchorEl={buttonElement}>
        <Menu
          onOpenChange={(open) => {
            setOpen(open);
          }}
          open={isOpen}
          id="hooks-menu"
        >
          <MenuItem onClick={createHandleMenuClick('Cut')}>Cut</MenuItem>
          <MenuItem onClick={createHandleMenuClick('Copy')}>Copy</MenuItem>
          <MenuItem onClick={createHandleMenuClick('Paste')}>Paste</MenuItem>
        </Menu>
      </Popper>
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
    border: 1px solid ${grey[300]};
    border-radius: 0.75em;
    color: ${grey[900]};
    overflow: auto;
    outline: 0px;
  }

  .mode-dark .menu-root {
    background: ${grey[900]};
    border-color: ${grey[700]};
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

  .button {
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    box-sizing: border-box;
    min-height: calc(1.5em + 22px);
    border-radius: 12px;
    padding: 12px 16px;
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
  
    &:focus {
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
