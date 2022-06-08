import * as React from 'react';

import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Typography from '@mui/joy/Typography';

export default function ButtonColors() {
  const [variant, setVariant] = React.useState('solid');
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        overflow: 'auto',
        width: '100%',
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <Button variant={variant} color="primary">
          Primary
        </Button>
        <Button variant={variant} color="neutral">
          Neutral
        </Button>
        <Button variant={variant} color="danger">
          Danger
        </Button>
        <Button variant={variant} color="info">
          Info
        </Button>
        <Button variant={variant} color="success">
          Success
        </Button>
        <Button variant={variant} color="warning">
          Warning
        </Button>
      </Box>
      <Sheet
        variant="outlined"
        sx={{
          p: 2,
          borderRadius: 'sm',
        }}
      >
        <Typography
          level="body2"
          fontWeight="xl"
          id="variant-label"
          textColor="text.primary"
          mb={2}
        >
          Variant:
        </Typography>
        <RadioGroup
          size="sm"
          aria-labelledby="variant-label"
          name="variant"
          row
          value={variant}
          onChange={(event) => setVariant(event.target.value)}
        >
          <Radio label="Solid" value="solid" />
          <Radio label="Soft" value="soft" />
          <Radio label="Outlined" value="outlined" />
          <Radio label="Plain" value="plain" />
        </RadioGroup>
      </Sheet>
    </Box>
  );
}
