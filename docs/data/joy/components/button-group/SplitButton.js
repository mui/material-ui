import * as React from 'react';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

export default function SplitButton() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Dropdown>
      <ButtonGroup variant="solid" color="success" aria-label="split button">
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <MenuButton slots={{ root: IconButton }} aria-label="select merge strategy">
          <ArrowDropDownIcon />
        </MenuButton>
      </ButtonGroup>
      <Menu>
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
    </Dropdown>
  );
}
