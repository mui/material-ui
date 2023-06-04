import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import Textarea from '@mui/joy/Textarea';

export default function MessageInput({ ref }: any) {
  // const [italic, setItalic] = React.useState(false);
  // const [fontWeight, setFontWeight] = React.useState('normal');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  return (
    <Box
      sx={{
        // backgroundColor: 'green',
        px: 3.25,
        pb: 3,
        minHeight: 128,
      }}
      // ref={ref}
    >
      <FormControl>
        <Textarea
          placeholder="Type something here…"
          aria-label="Message"
          minRows={2}
          maxRows={2}
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
    </Box>
  );
}
