import * as React from 'react';
import Menu from '@mui/joy/Menu';
import MenuItem, { menuItemClasses } from '@mui/joy/MenuItem';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListDivider from '@mui/joy/ListDivider';
import Typography, { typographyClasses } from '@mui/joy/Typography';

const MenuButton = React.forwardRef(
  ({ children, menu, open, onOpen, onKeyDown, ...props }, ref) => {
    const buttonRef = React.useRef(null);
    const menuActions = React.useRef(null);
    const combinedRef = React.useMemo(() => {
      return (instance) => {
        if (instance) {
          ref(instance);
          buttonRef.current = instance;
        }
      };
    }, [buttonRef, ref]);

    const handleButtonKeyDown = (event) => {
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        onOpen(event);
        if (event.key === 'ArrowUp') {
          menuActions.current?.highlightLastItem();
        }
      }
      onKeyDown(event);
    };

    return (
      <React.Fragment>
        <ListItemButton
          {...props}
          ref={combinedRef}
          role="menuitem"
          variant={open ? 'soft' : 'plain'}
          color="neutral"
          aria-haspopup="menu"
          aria-expanded={open ? 'true' : undefined}
          aria-controls={open ? `toolbar-example-menu-${children}` : undefined}
          onClick={onOpen}
          onKeyDown={handleButtonKeyDown}
        >
          {children}
        </ListItemButton>
        {React.cloneElement(menu, {
          open,
          actions: menuActions,
          anchorEl: buttonRef.current,
          slotProps: {
            listbox: {
              id: `toolbar-example-menu-${children}`,
              'aria-label': children,
            },
          },
          placement: 'bottom-start',
          disablePortal: false,
          variant: 'soft',
          sx: (theme) => ({
            width: 288,
            boxShadow: '0 2px 8px 0px rgba(0 0 0 / 0.38)',
            '--List-padding': 'var(--ListDivider-gap)',
            '--ListItem-minHeight': '32px',
            [`& .${menuItemClasses.root}`]: {
              transition: 'none',
              '&:hover': {
                ...theme.variants.solid.primary,
                [`& .${typographyClasses.root}`]: {
                  color: 'inherit',
                },
              },
            },
          }),
        })}
      </React.Fragment>
    );
  },
);

export default function MenuToolbarExample() {
  const menus = React.useRef([]);
  const [menuIndex, setMenuIndex] = React.useState(null);

  const renderShortcut = (text) => (
    <Typography level="body2" textColor="text.tertiary" ml="auto">
      {text}
    </Typography>
  );

  const openNextMenu = () => {
    if (typeof menuIndex === 'number') {
      if (menuIndex === menus.current.length - 1) {
        setMenuIndex(0);
      } else {
        setMenuIndex(menuIndex + 1);
      }
    }
  };

  const openPreviousMenu = () => {
    if (typeof menuIndex === 'number') {
      if (menuIndex === 0) {
        setMenuIndex(menus.current.length - 1);
      } else {
        setMenuIndex(menuIndex - 1);
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowRight') {
      openNextMenu();
    }
    if (event.key === 'ArrowLeft') {
      openPreviousMenu();
    }
  };

  const createHandleButtonKeyDown = (index) => (event) => {
    if (event.key === 'ArrowRight') {
      if (index === menus.current.length - 1) {
        menus.current[0]?.focus();
      } else {
        menus.current[index + 1]?.focus();
      }
    }
    if (event.key === 'ArrowLeft') {
      if (index === 0) {
        menus.current[menus.current.length]?.focus();
      } else {
        menus.current[index - 1]?.focus();
      }
    }
  };

  const itemProps = {
    onClick: () => setMenuIndex(null),
    onKeyDown: handleKeyDown,
  };

  return (
    <List
      orientation="horizontal"
      aria-label="Example application menu bar"
      role="menubar"
      data-joy-color-scheme="dark"
      sx={{
        bgcolor: 'background.body',
        px: 2,
        borderRadius: '4px',
        maxWidth: 'fit-content',
        '--ListItem-radius': '8px',
      }}
    >
      <ListItem>
        <MenuButton
          open={menuIndex === 0}
          onOpen={() => setMenuIndex(0)}
          onKeyDown={createHandleButtonKeyDown(0)}
          onMouseEnter={() => {
            if (typeof menuIndex === 'number') {
              setMenuIndex(0);
            }
          }}
          ref={(instance) => {
            menus.current[0] = instance;
          }}
          menu={
            <Menu
              onClose={() => {
                menus.current[0]?.focus();
                setMenuIndex(null);
              }}
            >
              <ListItem nested>
                <List aria-label="New">
                  <MenuItem {...itemProps}>New File</MenuItem>
                  <MenuItem {...itemProps}>
                    New Text File... {renderShortcut('⌥ ⌘ N')}
                  </MenuItem>
                  <MenuItem {...itemProps}>
                    New Window {renderShortcut('⇧ ⌘ N')}
                  </MenuItem>
                </List>
              </ListItem>
              <ListDivider />
              <ListItem nested>
                <List aria-label="Open">
                  <MenuItem {...itemProps}>Open {renderShortcut('⌘ O')}</MenuItem>
                  <MenuItem {...itemProps}>Open Folder</MenuItem>
                </List>
              </ListItem>
            </Menu>
          }
        >
          File
        </MenuButton>
      </ListItem>
      <ListItem>
        <MenuButton
          open={menuIndex === 1}
          onOpen={() => setMenuIndex(1)}
          onKeyDown={createHandleButtonKeyDown(1)}
          onMouseEnter={() => {
            if (typeof menuIndex === 'number') {
              setMenuIndex(1);
            }
          }}
          ref={(instance) => {
            menus.current[1] = instance;
          }}
          menu={
            <Menu
              onClose={() => {
                menus.current[1]?.focus();
                setMenuIndex(null);
              }}
            >
              <ListItem nested>
                <List aria-label="Time travel">
                  <MenuItem {...itemProps}>Undo {renderShortcut('⌘ Z')}</MenuItem>
                  <MenuItem {...itemProps}>Redo {renderShortcut('⇧ ⌘ Z')}</MenuItem>
                </List>
              </ListItem>
              <ListDivider />
              <ListItem nested>
                <List aria-label="Tool">
                  <MenuItem {...itemProps}>Cut {renderShortcut('⌘ X')}</MenuItem>
                  <MenuItem {...itemProps}>Copy {renderShortcut('⌘ Z')}</MenuItem>
                  <MenuItem {...itemProps}>Paste {renderShortcut('⌘ V')}</MenuItem>
                </List>
              </ListItem>
            </Menu>
          }
        >
          Edit
        </MenuButton>
      </ListItem>
      <ListItem>
        <MenuButton
          open={menuIndex === 2}
          onOpen={() => setMenuIndex(2)}
          onKeyDown={createHandleButtonKeyDown(2)}
          onMouseEnter={() => {
            if (typeof menuIndex === 'number') {
              setMenuIndex(2);
            }
          }}
          ref={(instance) => {
            menus.current[2] = instance;
          }}
          menu={
            <Menu
              onClose={() => {
                menus.current[2]?.focus();
                setMenuIndex(null);
              }}
            >
              <MenuItem {...itemProps}>Select All {renderShortcut('⌘ A')}</MenuItem>
              <MenuItem {...itemProps}>
                Expand Selection {renderShortcut('^ ⇧ ⌘ →')}
              </MenuItem>
              <MenuItem {...itemProps}>
                Shrink Selection {renderShortcut('^ ⇧ ⌘ ←')}
              </MenuItem>
            </Menu>
          }
        >
          Selection
        </MenuButton>
      </ListItem>
    </List>
  );
}
