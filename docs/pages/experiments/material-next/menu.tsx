import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useDropdown, DropdownContext } from '@mui/base/useDropdown';
import Menu from '@mui/material-next/Menu';
import MenuItem from '@mui/material-next/MenuItem';
import { useMenuButton } from '@mui/base/useMenuButton';

const theme = createTheme();

const MenuButton = React.forwardRef(function MenuButton(
  props: React.PropsWithChildren<{}>,
  forwardedRef: React.ForwardedRef<HTMLButtonElement>,
) {
  const { getRootProps: getButtonProps } = useMenuButton({ rootRef: forwardedRef });

  return <Button type="button" {...props} {...getButtonProps()} />;
});

export default function BasicMenu() {
  // const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };
  const { contextValue: dropdownContextValue } = useDropdown();

  return (
    <ThemeProvider theme={theme}>
      <DropdownContext.Provider value={dropdownContextValue}>
        <MenuButton
          id="basic-button"
          // aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup="true"
          // aria-expanded={open ? 'true' : undefined}
          // onClick={handleClick}
        >
          Dashboard
        </MenuButton>
        <Menu
          id="basic-menu"
          // anchorEl={anchorEl}
          // open={open}
          // onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem /* onClick={handleClose} */>Profile</MenuItem>
          <MenuItem /* onClick={handleClose} */>My account</MenuItem>
          <MenuItem /* onClick={handleClose} */>Logout</MenuItem>
        </Menu>
      </DropdownContext.Provider>
    </ThemeProvider>
  );
}
