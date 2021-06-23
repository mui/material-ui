import * as React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

type ColorPalette =
  | 'primary'
  | 'secondary'
  | 'error'
  | 'info'
  | 'success'
  | 'warning';

const ColorSelector = ({
  color,
  setColor,
}: {
  color: ColorPalette;
  setColor: React.Dispatch<React.SetStateAction<ColorPalette>>;
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  return (
    <span>
      <Tooltip title="Change color">
        <IconButton
          onClick={(event) => setAnchorEl(event.currentTarget)}
          id="color-button"
          aria-controls="color-menu"
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{ lineHeight: 1 }}
          color="inherit"
        >
          🎨
        </IconButton>
      </Tooltip>
      <Menu
        id="color-menu"
        variant="selectedMenu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          'aria-labelledby': 'color-button',
        }}
      >
        {(
          ['primary', 'secondary', 'error', 'info', 'success', 'warning'] as const
        ).map((item) => (
          <MenuItem
            key={item}
            selected={item === color}
            onClick={() => {
              setColor(item);
              setAnchorEl(null);
            }}
          >
            {item}
          </MenuItem>
        ))}
      </Menu>
    </span>
  );
};

export default function ColorButtons() {
  const [color, setColor] = React.useState<ColorPalette>('secondary');
  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Button color="secondary">Secondary</Button>
      <Button variant="contained" color="success">
        Success
      </Button>
      <Button variant="outlined" color="error">
        Error
      </Button>
      <ColorSelector color={color} setColor={setColor} />
    </Box>
  );
}
