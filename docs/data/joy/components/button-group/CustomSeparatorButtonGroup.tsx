import * as React from 'react';
import Button from '@mui/joy/Button';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import Settings from '@mui/icons-material/Settings';

export default function CustomSeparatorButtonGroup() {
  return (
    <ButtonGroup
      variant="solid"
      color="success"
      aria-label="button group"
      sx={{
        '--ButtonGroup-separatorColor': 'none !important',
        '& > span': {
          zIndex: 3,
          background:
            'linear-gradient(to top, transparent, rgba(255 255 255 / 0.6), transparent)',
        },
      }}
    >
      <Button>One</Button>
      <Divider />
      <Button>Two</Button>
      <Divider />
      <Button>Three</Button>
      <Divider />
      <IconButton>
        <Settings />
      </IconButton>
    </ButtonGroup>
  );
}
