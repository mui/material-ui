import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Textarea from '@mui/joy/Textarea';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import FormatBold from '@mui/icons-material/FormatBold';
import FormatItalic from '@mui/icons-material/FormatItalic';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Check from '@mui/icons-material/Check';

export default function MessageInput() {
  // const [italic, setItalic] = React.useState(false);
  // const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  return (
    <FormControl>
      <Textarea
        placeholder="Type something here…"
        aria-label="Message"
        minRows={2}
        endDecorator={
          <Box
            sx={
              {
                // display: 'flex',
                // gap: 'var(--Textarea-paddingBlock)',
                // pt: 'var(--Textarea-paddingBlock)',
                // flex: 'auto',
              }
            }
          >
            {/* <IconButton
              variant="plain"
              color="neutral"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              kabob
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              // size="sm"
              // placement="bottom-start"
              // sx={{ '--ListItemDecorator-size': '24px' }}
            >
              {['200', 'normal', 'bold'].map((weight) => (
                <MenuItem
                  key={weight}
                  // selected={fontWeight === weight}
                  onClick={() => {
                    // setFontWeight(weight);
                    setAnchorEl(null);
                  }}
                  // sx={{ fontWeight: weight }}
                >
                  {weight === '200' ? 'lighter' : weight}
                </MenuItem>
              ))}
            </Menu> */}
            {/* <IconButton>emoji</IconButton> */}
            <Button>Send</Button>
          </Box>
        }
      />
    </FormControl>
  );
}
