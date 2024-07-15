import * as React from 'react';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];

export default function SplitButton() {
  const [open, setOpen] = React.useState(false);
  const actionRef = React.useRef<() => void | null>(null);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`);
  };

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup
        ref={anchorRef}
        variant="solid"
        color="success"
        aria-label="split button"
      >
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <IconButton
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onMouseDown={() => {
            // @ts-ignore
            actionRef.current = () => setOpen(!open);
          }}
          onKeyDown={() => {
            // @ts-ignore
            actionRef.current = () => setOpen(!open);
          }}
          onClick={() => {
            actionRef.current?.();
          }}
        >
          <ArrowDropDownIcon />
        </IconButton>
      </ButtonGroup>
      <Menu open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
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
