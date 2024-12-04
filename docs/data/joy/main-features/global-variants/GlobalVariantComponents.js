import * as React from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Chip from '@mui/joy/Chip';
import Checkbox from '@mui/joy/Checkbox';
import Typography from '@mui/joy/Typography';

export default function GlobalVariantComponents() {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, minmax(0, 1fr))',
          sm: 'auto repeat(4, minmax(0, 1fr))',
        },
        gap: 3,
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      <Typography level="body-sm" sx={{ justifySelf: 'flex-end' }}>
        Button:
      </Typography>
      <Button variant="solid" color="primary">
        Solid
      </Button>
      <Button variant="soft" color="primary">
        Soft
      </Button>
      <Button variant="outlined" color="primary">
        Outlined
      </Button>
      <Button variant="plain" color="primary">
        Plain
      </Button>
      <Typography level="body-sm" sx={{ justifySelf: 'flex-end' }}>
        Chip:
      </Typography>
      <Chip variant="solid" size="sm" color="primary">
        Solid
      </Chip>
      <Chip variant="soft" size="sm" color="primary">
        Soft
      </Chip>
      <Chip variant="outlined" size="sm" color="primary">
        Outlined
      </Chip>
      <Chip variant="plain" size="sm" color="primary">
        Plain
      </Chip>
      <Typography level="body-sm" sx={{ justifySelf: 'flex-end' }}>
        Checkbox:
      </Typography>
      <Checkbox variant="solid" defaultChecked label="Solid" />
      <Checkbox variant="soft" defaultChecked label="Soft" />
      <Checkbox variant="outlined" defaultChecked label="Outlined" />
      <Checkbox variant="plain" defaultChecked label="Plain" />
    </Box>
  );
}
