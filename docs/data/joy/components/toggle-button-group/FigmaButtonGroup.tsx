import * as React from 'react';
import ToggleButtonGroup from '@mui/joy/ToggleButtonGroup';
import IconButton from '@mui/joy/IconButton';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';

export default function FigmaButtonGroup() {
  const [index, setIndex] = React.useState<string | null>('0');
  return (
    <ToggleButtonGroup
      variant="plain"
      value={index}
      onChange={(event, newIndex) => {
        setIndex(newIndex);
      }}
      aria-label="figma button group"
      sx={{
        '--ButtonGroup-radius': '3px',
        '--ButtonGroup-separatorSize': '0px',
        '--ButtonGroup-connected': '0',
        '&:hover': {
          boxShadow: 'inset 0px 0px 0px 1px var(--joy-palette-neutral-softBg)',
          '--ButtonGroup-connected': '1',
        },
      }}
    >
      <IconButton value={0}>
        <FormatAlignLeftIcon />
      </IconButton>
      <IconButton value={1}>
        <FormatAlignCenterIcon />
      </IconButton>
      <IconButton value={2}>
        <FormatAlignRightIcon />
      </IconButton>
      <IconButton value={3}>
        <FormatAlignJustifyIcon />
      </IconButton>
    </ToggleButtonGroup>
  );
}
