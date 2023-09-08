import * as React from 'react';
import { ColorPaletteProp } from '@mui/joy/styles';
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
  const [color, setColor] = React.useState<ColorPaletteProp>('danger');
  const [menuButton, setMenuButton] = React.useState<HTMLElement | null>(null);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, py: 4 }}>
      <Button
        startDecorator={<PaletteIcon />}
        variant="outlined"
        onClick={() => {
          const colors: ColorPaletteProp[] = [
            'primary',
            'neutral',
            'danger',
            'success',
            'warning',
          ];
          const nextColor = colors.indexOf(color);
          setColor(colors[nextColor + 1] ?? colors[0]);
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
          gap: 4,
          minHeight: 240,
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexGrow: 1,
          zIndex: 0,
          borderRadius: 'sm',
          p: 4,
        }}
      >
        <Autocomplete
          placeholder="Combobox"
          options={films}
          sx={{ width: 240 }}
          open
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
          title="Bookmark"
          disablePortal
          modifiers={modifiers}
          open
          variant="solid"
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
