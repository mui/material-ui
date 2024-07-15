import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import SvgIcon from '@mui/joy/SvgIcon';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';

export default function ToggleGroupToolbar() {
  const [alignment, setAlignment] = React.useState('left');
  const [formats, setFormats] = React.useState(() => ['italic']);
  const [color, setColor] = React.useState('#ff5252');
  return (
    <Sheet
      variant="outlined"
      sx={{ borderRadius: 'md', display: 'flex', gap: 2, p: 0.5 }}
    >
      <ToggleButtonGroup
        variant="plain"
        spacing={0.5}
        value={alignment}
        onChange={(event, newAlignment) => {
          setAlignment(newAlignment);
        }}
        aria-label="text alignment"
      >
        <IconButton value="left" aria-label="left aligned">
          <FormatAlignLeftIcon />
        </IconButton>
        <IconButton value="center" aria-label="centered">
          <FormatAlignCenterIcon />
        </IconButton>
        <IconButton value="right" aria-label="right aligned">
          <FormatAlignRightIcon />
        </IconButton>
        <IconButton value="justify" aria-label="justified" disabled>
          <FormatAlignJustifyIcon />
        </IconButton>
      </ToggleButtonGroup>
      <Divider orientation="vertical" sx={{ height: '60%', alignSelf: 'center' }} />
      <ToggleButtonGroup
        variant="plain"
        spacing={0.5}
        value={formats}
        onChange={(event, newFormats) => {
          setFormats(newFormats);
        }}
        aria-label="text formatting"
      >
        <IconButton value="bold" aria-label="bold">
          <FormatBoldIcon />
        </IconButton>
        <IconButton value="italic" aria-label="italic">
          <FormatItalicIcon />
        </IconButton>
        <IconButton value="underlined" aria-label="underlined">
          <FormatUnderlinedIcon />
        </IconButton>
      </ToggleButtonGroup>
      <Divider orientation="vertical" sx={{ height: '60%', alignSelf: 'center' }} />
      <Button
        component="label"
        tabIndex={-1}
        role={undefined}
        aria-label="fill color"
        variant="outlined"
        color="neutral"
        endDecorator={
          <SvgIcon fontSize="md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 8.25l-7.5 7.5-7.5-7.5"
              />
            </svg>
          </SvgIcon>
        }
        sx={{ pl: 1 }}
      >
        <AspectRatio
          variant="plain"
          ratio="1"
          sx={{ borderRadius: '50%', width: '1.5em', bgcolor: color }}
        >
          <div />
        </AspectRatio>
        <Box
          component="input"
          type="color"
          value={color}
          onChange={(event) => setColor(event.target.value)}
          sx={{
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            height: '1px',
            overflow: 'hidden',
            position: 'absolute',
            bottom: 0,
            left: 0,
            whiteSpace: 'nowrap',
            width: '1px',
          }}
        />
      </Button>
    </Sheet>
  );
}
