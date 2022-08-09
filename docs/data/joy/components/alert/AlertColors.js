import Alert from '@mui/joy/Alert';
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';

import Typography from '@mui/joy/Typography';
import * as React from 'react';

export default function AlertColors() {
  const [variant, setVariant] = React.useState('solid');
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(150px, 1fr))',
          gap: 1,
        }}
      >
        <Alert variant={variant} color="primary">
          Primary
        </Alert>
        <Alert variant={variant} color="neutral">
          Neutral
        </Alert>
        <Alert variant={variant} color="danger">
          Danger
        </Alert>
        <Alert variant={variant} color="info">
          Info
        </Alert>
        <Alert variant={variant} color="success">
          Success
        </Alert>
        <Alert variant={variant} color="warning">
          Warning
        </Alert>
      </Box>
      <Sheet
        sx={{
          background: 'transparent',
          pl: 4,
          borderLeft: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Typography
          level="body2"
          fontWeight="xl"
          id="variant-label"
          textColor="text.primary"
          mb={1}
        >
          Variant:
        </Typography>
        <RadioGroup
          size="sm"
          aria-labelledby="variant-label"
          name="variant"
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
