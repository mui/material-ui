import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import IconButton from '@mui/joy/IconButton';
import Slider from '@mui/joy/Slider';
import Settings from '@mui/icons-material/Settings';

export default function SeparatorButtonGroup() {
  const [hue, setHue] = React.useState(0);
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Slider
        value={hue}
        min={0}
        max={360}
        valueLabelDisplay="on"
        valueLabelFormat={(value) => `hsl(${value} 100% 50%)`}
        onChange={(event, newValue) => setHue(newValue)}
      />
      <ButtonGroup
        variant="plain"
        aria-label="button group"
        sx={{ '--ButtonGroup-separatorColor': `hsl(${hue} 100% 50%) !important` }}
      >
        <Button>One</Button>
        <Button>Two</Button>
        <Button>Three</Button>
        <IconButton>
          <Settings />
        </IconButton>
      </ButtonGroup>
    </Box>
  );
}
