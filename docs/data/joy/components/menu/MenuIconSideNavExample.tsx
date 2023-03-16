import * as React from 'react';
import Menu, { menuClasses } from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Sheet from '@mui/joy/Sheet';
import Apps from '@mui/icons-material/Apps';
import Settings from '@mui/icons-material/Settings';
import Person from '@mui/icons-material/Person';

// The Menu is built on top of Popper v2, so it accepts `modifiers` prop that will be passed to the Popper.
// https://popper.js.org/docs/v2/modifiers/offset/
interface MenuButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  menu: React.ReactElement;
  open: boolean;
  onOpen: (
    event?:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => void;
  onLeaveMenu: (callback: () => boolean) => void;
  label: string;
}

const modifiers = [
  {
    name: 'offset',
    options: {
      offset: ({ placement }: any) => {
        if (placement.includes('end')) {
          return [8, 20];
        }
        return [-8, 20];
      },
    },
  },
];

function MenuButton({
  children,
  menu,
  open,
  onOpen,
  onLeaveMenu,
  label,
  ...props
}: MenuButtonProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const isOnButton = React.useRef(false);
  const menuActions = React.useRef<any>(null);
  const internalOpen = React.useRef(open);

  const handleButtonKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    internalOpen.current = open;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      onOpen(event);
      if (event.key === 'ArrowUp') {
        menuActions.current?.highlightLastItem();
      }
    }
  };

  return (
    <React.Fragment>
      <IconButton
        {...props}
        ref={buttonRef}
        variant="plain"
        color="neutral"
        aria-haspopup="menu"
        aria-expanded={open ? 'true' : undefined}
        aria-controls={open ? `nav-example-menu-${label}` : undefined}
        onMouseDown={() => {
          internalOpen.current = open;
        }}
        onClick={() => {
          if (!internalOpen.current) {
            onOpen();
          }
        }}
        onMouseEnter={() => {
          onOpen();
          isOnButton.current = true;
        }}
        onMouseLeave={() => {
          isOnButton.current = false;
        }}
        onKeyDown={handleButtonKeyDown}
        sx={{
          bgcolor: open ? 'neutral.plainHoverBg' : undefined,
          '&.Joy-focusVisible': {
            bgcolor: 'neutral.plainHoverBg',
          },
        }}
      >
        {children}
      </IconButton>
      {React.cloneElement(menu, {
        open,
        onClose: () => {
          menu.props.onClose?.();
          buttonRef.current?.focus();
        },
        onMouseLeave: () => {
          onLeaveMenu(() => isOnButton.current);
        },
        actions: menuActions,
        anchorEl: buttonRef.current,
        modifiers,
        slotProps: {
          listbox: {
            id: `nav-example-menu-${label}`,
            'aria-label': label,
          },
        },
        placement: 'right-start',
        sx: {
          width: 288,
          [`& .${menuClasses.listbox}`]: {
            '--List-padding': 'var(--ListDivider-gap)',
          },
        },
      })}
    </React.Fragment>
  );
}

export default function MenuIconSideNavExample() {
  const [menuIndex, setMenuIndex] = React.useState<null | number>(null);
  const itemProps = {
    onClick: () => setMenuIndex(null),
  };
  const createHandleLeaveMenu =
    (index: number) => (getIsOnButton: () => boolean) => {
      setTimeout(() => {
        const isOnButton = getIsOnButton();
        if (!isOnButton) {
          setMenuIndex((latestIndex: null | number) => {
            if (index === latestIndex) {
              return null;
            }
            return latestIndex;
          });
        }
      }, 200);
    };
  return (
    <Sheet sx={{ borderRadius: 'sm', py: 1, mr: 20, bgcolor: 'background.body' }}>
      <List>
        <ListItem>
          <MenuButton
            label="Apps"
            open={menuIndex === 0}
            onOpen={() => setMenuIndex(0)}
            onLeaveMenu={createHandleLeaveMenu(0)}
            menu={
              <Menu onClose={() => setMenuIndex(null)}>
                <MenuItem {...itemProps}>Application 1</MenuItem>
                <MenuItem {...itemProps}>Application 2</MenuItem>
                <MenuItem {...itemProps}>Application 3</MenuItem>
              </Menu>
            }
          >
            <Apps />
          </MenuButton>
        </ListItem>
        <ListItem>
          <MenuButton
            label="Settings"
            open={menuIndex === 1}
            onOpen={() => setMenuIndex(1)}
            onLeaveMenu={createHandleLeaveMenu(1)}
            menu={
              <Menu onClose={() => setMenuIndex(null)}>
                <MenuItem {...itemProps}>Setting 1</MenuItem>
                <MenuItem {...itemProps}>Setting 2</MenuItem>
                <MenuItem {...itemProps}>Setting 3</MenuItem>
              </Menu>
            }
          >
            <Settings />
          </MenuButton>
        </ListItem>
        <ListItem>
          <MenuButton
            label="Personal"
            open={menuIndex === 2}
            onOpen={() => setMenuIndex(2)}
            onLeaveMenu={createHandleLeaveMenu(2)}
            menu={
              <Menu onClose={() => setMenuIndex(null)}>
                <MenuItem {...itemProps}>Personal 1</MenuItem>
                <MenuItem {...itemProps}>Personal 2</MenuItem>
                <MenuItem {...itemProps}>Personal 3</MenuItem>
              </Menu>
            }
          >
            <Person />
          </MenuButton>
        </ListItem>
      </List>
    </Sheet>
  );
}
