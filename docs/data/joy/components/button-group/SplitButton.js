import * as React from 'react';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import ButtonGroup from '@mui/joy/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

export default function SplitButton() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" aria-label="split button">
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <IconButton
          ref={anchorRef}
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </IconButton>
      </ButtonGroup>
      <Menu open={open} anchorEl={anchorRef.current}>
        {options.map((option, index) => (
          <MenuItem
            key={option}
            disabled={index === 2}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
