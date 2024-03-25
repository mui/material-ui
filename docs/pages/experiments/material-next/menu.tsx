import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useDropdown, DropdownContext } from '@mui/base/useDropdown';
import Menu, { MenuProps } from '@mui/material-next/Menu';
import MenuItem from '@mui/material-next/MenuItem';
import StableMenu from '@mui/material/Menu';
import StableMenuItem from '@mui/material/MenuItem';
import StableList from '@mui/material/List';
import StableListItem from '@mui/material/ListItem';
import StableListItemText from '@mui/material/ListItemText';
import { useMenuButton } from '@mui/base/useMenuButton';

const theme = createTheme();

const MenuButton = React.forwardRef<HTMLButtonElement, React.PropsWithChildren<{ id?: string }>>(
  function MenuButton(
    props: React.PropsWithChildren<{}>,
    forwardedRef: React.ForwardedRef<HTMLButtonElement>,
  ) {
    const { getRootProps: getButtonProps } = useMenuButton({ rootRef: forwardedRef });

    return <Button type="button" {...props} {...getButtonProps()} />;
  },
);

function DropdownUsage(props: MenuProps) {
  const { contextValue: dropdownContextValue } = useDropdown();

  return (
    <DropdownContext.Provider value={dropdownContextValue}>
      <MenuButton
        id="basic-button"
        // aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
      >
        Dropdown
      </MenuButton>
      <Menu
        id="basic-menu"
        {...props}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
          ...props.MenuListProps,
        }}
      >
        <MenuItem /* onClick={handleClose} */>Profile</MenuItem>
        <MenuItem /* onClick={handleClose} */>My account</MenuItem>
        <MenuItem /* onClick={handleClose} */ disabled>Subscription</MenuItem>
        <Divider />
        <MenuItem /* onClick={handleClose} */>Logout</MenuItem>
      </Menu>
    </DropdownContext.Provider>
  );
}

function LegacyUsage(props: MenuProps) {
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
        Legacy
      </Button>
      <Menu
        id="basic-menu-legacy"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        {...props}
        MenuListProps={{
          'aria-labelledby': 'basic-button-legacy',
          ...props.MenuListProps,
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem disabled>Subscription</MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </div>
  );
}

function StableComponentUsage(props: {
  MenuListProps?: { disabledItemsFocusable?: boolean };
  autoFocus?: boolean;
}) {
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
        id="basic-button-legacy-1"
        aria-controls={open ? 'basic-menu-legacy-1' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        Stable
      </Button>
      <StableMenu
        id="basic-menu-legacy-1"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        {...props}
        MenuListProps={{
          'aria-labelledby': 'basic-button-legacy-1',
          ...props.MenuListProps,
        }}
      >
        <StableMenuItem onClick={handleClose}>Profile</StableMenuItem>
        <StableMenuItem onClick={handleClose}>My account</StableMenuItem>
        <StableMenuItem disabled>Subscription</StableMenuItem>
        <Divider />
        <StableMenuItem onClick={handleClose}>Logout</StableMenuItem>
      </StableMenu>
    </div>
  );
}

const selectedMenuOptions = [
  'Show some love to MUI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

function SelectedMenuLegacy() {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StableList component="nav" aria-label="Device settings" sx={{ bgcolor: 'background.paper' }}>
        <StableListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <StableListItemText
            primary="When device is locked"
            secondary={selectedMenuOptions[selectedIndex]}
          />
        </StableListItem>
      </StableList>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {selectedMenuOptions.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

function SelectedMenuDropdown() {
  const { contextValue: dropdownContextValue } = useDropdown();

  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const handleMenuItemClick = (event: React.MouseEvent, index: number) => {
    setSelectedIndex(index);
  };

  return (
    <DropdownContext.Provider value={dropdownContextValue}>
      <MenuButton
        id="basic-button"
        // aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        // aria-expanded={open ? 'true' : undefined}
        aria-label="Device settings"
      >
        {selectedMenuOptions[selectedIndex]}
      </MenuButton>
      <Menu
        id="lock-menu"
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {selectedMenuOptions.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </DropdownContext.Provider>
  );
}

function SelectedMenuStable() {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <StableList component="nav" aria-label="Device settings" sx={{ bgcolor: 'background.paper' }}>
        <StableListItem
          button
          id="lock-button"
          aria-haspopup="listbox"
          aria-controls="lock-menu"
          aria-label="when device is locked"
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickListItem}
        >
          <StableListItemText
            primary="When device is locked"
            secondary={selectedMenuOptions[selectedIndex]}
          />
        </StableListItem>
      </StableList>
      <StableMenu
        id="lock-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'lock-button',
          role: 'listbox',
        }}
      >
        {selectedMenuOptions.map((option, index) => (
          <StableMenuItem
            key={option}
            disabled={index === 0}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </StableMenuItem>
        ))}
      </StableMenu>
    </div>
  );
}

export default function BasicMenu() {
  return (
    <ThemeProvider theme={theme}>
      <LegacyUsage />
      <DropdownUsage />
      <StableComponentUsage />
      <h4>Disabled item focusable</h4>
      <LegacyUsage MenuListProps={{ disabledItemsFocusable: true }} />
      <DropdownUsage MenuListProps={{ disabledItemsFocusable: true }} />
      <StableComponentUsage MenuListProps={{ disabledItemsFocusable: true }} />
      {/* This is not working at this point */}
      <h4>Auto focus false</h4>
      <LegacyUsage autoFocus={false} />
      <DropdownUsage autoFocus={false} />
      <StableComponentUsage autoFocus={false} />
      {/* This is not working at this point */}
      <h4>Varaiant selectedMenu</h4>
      <div>Legacy</div>
      <SelectedMenuLegacy />
      <div>Dropdown</div>
      <SelectedMenuDropdown />
      <div>Stable</div>
      <SelectedMenuStable />
    </ThemeProvider>
  );
}
