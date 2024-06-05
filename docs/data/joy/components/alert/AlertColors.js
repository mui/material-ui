import * as React from 'react';
import Alert from '@mui/joy/Alert';
import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';

import Typography from '@mui/joy/Typography';

export default function AlertColors() {
  const [variant, setVariant] = React.useState('solid');
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Stack spacing={1} sx={{ width: '100%', maxWidth: 400 }}>
        <Alert variant={variant} color="primary">
          Primary
        </Alert>
        <Alert variant={variant} color="neutral">
          Neutral
        </Alert>
        <Alert variant={variant} color="danger">
          Danger
        </Alert>
        <Alert variant={variant} color="success">
          Success
        </Alert>
        <Alert variant={variant} color="warning">
          Warning
        </Alert>
      </Stack>
      <Sheet sx={{ pl: 4, ml: 3, borderLeft: '1px solid', borderColor: 'divider' }}>
        <Typography
          level="body-sm"
          id="variant-label"
          textColor="text.primary"
          sx={{ fontWeight: 'xl', mb: 1 }}
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
