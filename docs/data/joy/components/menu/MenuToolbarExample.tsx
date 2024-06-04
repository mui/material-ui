import * as React from 'react';
import Menu from '@mui/joy/Menu';
import MenuItem, { menuItemClasses } from '@mui/joy/MenuItem';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton from '@mui/joy/ListItemButton';
import ListDivider from '@mui/joy/ListDivider';
import Typography, { typographyClasses } from '@mui/joy/Typography';
import Dropdown, { DropdownProps } from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';
import { Theme } from '@mui/joy';

type MenuBarButtonProps = Pick<DropdownProps, 'children' | 'open'> & {
  onOpen: DropdownProps['onOpenChange'];
  onKeyDown: React.KeyboardEventHandler;
  menu: React.JSX.Element;
  onMouseEnter: React.MouseEventHandler;
};

const MenuBarButton = React.forwardRef(
  (
    { children, menu, open, onOpen, onKeyDown, ...props }: MenuBarButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    return (
      <Dropdown open={open} onOpenChange={onOpen}>
        <MenuButton
          {...props}
          slots={{ root: ListItemButton }}
          ref={ref}
          role="menuitem"
          variant={open ? 'soft' : 'plain'}
        >
          {children}
        </MenuButton>
        {React.cloneElement(menu, {
          slotProps: {
            listbox: {
              id: `toolbar-example-menu-${children}`,
              'aria-label': children,
            },
          },
          placement: 'bottom-start',
          disablePortal: false,
          variant: 'soft',
          sx: (theme: Theme) => ({
            width: 288,
            boxShadow: '0 2px 8px 0px rgba(0 0 0 / 0.38)',
            '--List-padding': 'var(--ListDivider-gap)',
            '--ListItem-minHeight': '32px',
            [`&& .${menuItemClasses.root}`]: {
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
      </Dropdown>
    );
  },
);

export default function MenuToolbarExample() {
  const menus = React.useRef<Array<HTMLButtonElement>>([]);
  const [menuIndex, setMenuIndex] = React.useState<null | number>(null);

  const renderShortcut = (text: string) => (
    <Typography level="body-sm" textColor="text.tertiary" sx={{ ml: 'auto' }}>
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

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      openNextMenu();
    }
    if (event.key === 'ArrowLeft') {
      openPreviousMenu();
    }
  };

  const createHandleButtonKeyDown =
    (index: number) => (event: React.KeyboardEvent) => {
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
        borderRadius: '4px',
        maxWidth: 'fit-content',
      }}
    >
      <ListItem>
        <MenuBarButton
          open={menuIndex === 0}
          onOpen={() => {
            setMenuIndex((prevMenuIndex) => (prevMenuIndex === null ? 0 : null));
          }}
          onKeyDown={createHandleButtonKeyDown(0)}
          onMouseEnter={() => {
            if (typeof menuIndex === 'number') {
              setMenuIndex(0);
            }
          }}
          ref={(instance) => {
            menus.current[0] = instance!;
          }}
          menu={
            <Menu
              onClose={() => {
                menus.current[0]?.focus();
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
        </MenuBarButton>
      </ListItem>
      <ListItem>
        <MenuBarButton
          open={menuIndex === 1}
          onOpen={() => {
            setMenuIndex((prevMenuIndex) => (prevMenuIndex === null ? 1 : null));
          }}
          onKeyDown={createHandleButtonKeyDown(1)}
          onMouseEnter={() => {
            if (typeof menuIndex === 'number') {
              setMenuIndex(1);
            }
          }}
          ref={(instance) => {
            menus.current[1] = instance!;
          }}
          menu={
            <Menu
              onClose={() => {
                menus.current[1]?.focus();
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
        </MenuBarButton>
      </ListItem>
      <ListItem>
        <MenuBarButton
          open={menuIndex === 2}
          onOpen={() => {
            setMenuIndex((prevMenuIndex) => (prevMenuIndex === null ? 2 : null));
          }}
          onKeyDown={createHandleButtonKeyDown(2)}
          onMouseEnter={() => {
            if (typeof menuIndex === 'number') {
              setMenuIndex(2);
            }
          }}
          ref={(instance) => {
            menus.current[2] = instance!;
          }}
          menu={
            <Menu
              onClose={() => {
                menus.current[2]?.focus();
              }}
            >
              <MenuItem {...itemProps}>Select All {renderShortcut('⌘ A')}</MenuItem>
              <MenuItem {...itemProps}>
                Expand Selection {renderShortcut('⌃ ⇧ ⌘ →')}
              </MenuItem>
              <MenuItem {...itemProps}>
                Shrink Selection {renderShortcut('⌃ ⇧ ⌘ ←')}
              </MenuItem>
            </Menu>
          }
        >
          Selection
        </MenuBarButton>
      </ListItem>
    </List>
  );
}
