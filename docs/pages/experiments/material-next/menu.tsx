import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useDropdown, DropdownContext } from '@mui/base/useDropdown';
import Menu from '@mui/material-next/Menu';
import MenuItem from '@mui/material-next/MenuItem';
import { useMenuButton } from '@mui/base/useMenuButton';

const theme = createTheme();

const MenuButton = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<{ id?: string }>>(function MenuButton(
  props: React.PropsWithChildren<{}>,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>,
) {
  const { getRootProps: getButtonProps } = useMenuButton({ rootRef: forwardedRef });

  return <Button type="button" {...props} {...getButtonProps()} />;
});

function DropdownUsage() {
  const { contextValue: dropdownContextValue } = useDropdown();

  return (
    <DropdownContext.Provider value={dropdownContextValue}>
      <MenuButton
        id="basic-button"
        // aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
      >
        Dashboard
      </MenuButton>
      <Menu
        id="basic-menu"
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem /* onClick={handleClose} */>Profile</MenuItem>
        <MenuItem /* onClick={handleClose} */>My account</MenuItem>
        <MenuItem /* onClick={handleClose} */>Logout</MenuItem>
      </Menu>
    </DropdownContext.Provider>
  );
}

function LegacyUsage() {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button-legacy"
        aria-controls={open ? 'basic-menu-legacy' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Dashboard
      </Button>
      <Menu
        id="basic-menu-legacy"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button-legacy',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

// TODO add menus with dividers and disabled elements
export default function BasicMenu() {
  return (
    <ThemeProvider theme={theme}>
      <LegacyUsage />
      <DropdownUsage />
    </ThemeProvider>
  );
}
