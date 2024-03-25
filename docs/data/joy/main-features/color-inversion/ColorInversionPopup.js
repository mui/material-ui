import * as React from 'react';

import Autocomplete from '@mui/joy/Autocomplete';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListDivider from '@mui/joy/ListDivider';
import Tooltip from '@mui/joy/Tooltip';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PaletteIcon from '@mui/icons-material/Palette';

// disable flip for this demo
// https://popper.js.org/docs/v2/modifiers/flip/
const modifiers = [
  {
    name: 'flip',
    options: {
      fallbackPlacements: ['bottom'],
    },
  },
];

export default function ColorInversionPopup() {
  const [color, setColor] = React.useState('danger');
  const [menuButton, setMenuButton] = React.useState(null);
  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Button
        variant="outlined"
        startDecorator={<PaletteIcon />}
        onClick={() => {
          const colors = ['primary', 'neutral', 'danger', 'success', 'warning'];

          const nextColorIndex = colors.indexOf(color) + 1;
          setColor(colors[nextColorIndex] ?? colors[0]);
        }}
      >
        Change the color
      </Button>
      <Card
        orientation="horizontal"
        variant="solid"
        color={color}
        invertedColors
        sx={{
          minHeight: 240,
          zIndex: 0,
          p: 4,
          width: '100%',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexGrow: 1,
          gap: 6,
          borderRadius: 'sm',
        }}
      >
        <Autocomplete
          open
          placeholder="Combobox"
          options={films}
          sx={{ width: { xs: '100%', sm: 240 } }}
          slotProps={{
            listbox: { disablePortal: true, modifiers, sx: { maxHeight: 140 } },
          }}
        />
        <Button
          variant="soft"
          endDecorator={<KeyboardArrowDownIcon />}
          onClick={(event) => setMenuButton(event.currentTarget)}
        >
          Actions
        </Button>
        <Menu
          disablePortal
          modifiers={modifiers}
          anchorEl={menuButton}
          open={!!menuButton}
          onClose={() => setMenuButton(null)}
        >
          <MenuItem>New tab</MenuItem>
          <MenuItem>New window</MenuItem>
          <ListDivider />
          <MenuItem>Delete</MenuItem>
        </Menu>
        <Tooltip
          open
          variant="solid"
          title="Bookmark"
          disablePortal
          modifiers={modifiers}
        >
          <IconButton>
            <BookmarkOutlinedIcon />
          </IconButton>
        </Tooltip>
      </Card>
    </Box>
  );
}

const films = [
  { label: 'The Shawshank Redemption', year: 1994 },
  { label: 'The Godfather', year: 1972 },
  { label: 'The Godfather: Part II', year: 1974 },
  { label: 'The Dark Knight', year: 2008 },
  { label: '12 Angry Men', year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: 'Pulp Fiction', year: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', year: 1966 },
  { label: 'Fight Club', year: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
];
